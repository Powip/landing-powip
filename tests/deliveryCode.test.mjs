import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

// Compile the pure helper in memory, so the tests do not require Node's
// experimental TypeScript loader or a new test framework/dependency.
const source = readFileSync(new URL("../src/components/rastreo/deliveryCode.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  fileName: "deliveryCode.ts",
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText;
const { getVisibleDeliveryCode, shouldStopTrackingPolling } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

const deliverySecret = "TEST-DELIVERY-CODE";
const shippingSecret = "TEST-SHIPPING-KEY";

function tracking(overrides = {}) {
  return {
    status: "EN_ENVIO",
    totals: { grandTotal: 65, totalPaid: 25, pendingAmount: 40 },
    shippingInfo: { shippingKey: shippingSecret },
    ...overrides,
  };
}

for (const status of ["PENDIENTE", "PREPARADO", "EN_ENVIO", "ENTREGADO"]) {
  test(`65 total, 25 paid, 40 owed never releases shipping key in ${status}`, () => {
    assert.equal(getVisibleDeliveryCode(tracking({ status })), null);
  });

  test(`unpaid deliveryCode never bypasses the balance gate in ${status}`, () => {
    assert.equal(getVisibleDeliveryCode(tracking({
      status,
      deliveryCode: { code: deliverySecret, status: "activo" },
    })), null);
  });

  test(`valid fully paid balance releases shipping key in ${status}`, () => {
    assert.equal(getVisibleDeliveryCode(tracking({
      status,
      totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
    })), shippingSecret);
  });
}

test("deliveryCode is preferred only after payment is confirmed", () => {
  assert.equal(getVisibleDeliveryCode(tracking({
    totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
    deliveryCode: { code: deliverySecret, status: "activo" },
  })), deliverySecret);
});

test("paid alternative deliveryCode works without a shipping key", () => {
  assert.equal(getVisibleDeliveryCode(tracking({
    totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
    shippingInfo: null,
    deliveryCode: { code: deliverySecret, status: "activo" },
  })), deliverySecret);
});

test("a cancelled order never releases either code even with zero balance", () => {
  assert.equal(getVisibleDeliveryCode(tracking({
    status: "ANULADO",
    totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
    deliveryCode: { code: deliverySecret, status: "activo" },
  })), null);
});

for (const pendingAmount of [undefined, null, "0", "", false, NaN, Infinity, -Infinity, -5]) {
  test(`invalid pending balance ${String(pendingAmount)} fails closed for both code sources`, () => {
    assert.equal(getVisibleDeliveryCode(tracking({
      totals: { grandTotal: 65, totalPaid: 65, pendingAmount },
      deliveryCode: { code: deliverySecret, status: "activo" },
    })), null);
  });
}

test("missing totals fails closed", () => {
  assert.equal(getVisibleDeliveryCode(tracking({ totals: undefined })), null);
});

test("null totals fails closed", () => {
  assert.equal(getVisibleDeliveryCode(tracking({ totals: null })), null);
});

test("delivered with pending debt keeps polling for payment confirmation", () => {
  assert.equal(shouldStopTrackingPolling(tracking({ status: "ENTREGADO" })), false);
});

test("delivered with missing balance keeps polling", () => {
  assert.equal(shouldStopTrackingPolling(tracking({ status: "ENTREGADO", totals: undefined })), false);
});

test("fully paid delivered order is terminal", () => {
  assert.equal(shouldStopTrackingPolling(tracking({
    status: "ENTREGADO", totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
  })), true);
});

test("cancelled order is terminal even without payment facts", () => {
  assert.equal(shouldStopTrackingPolling(tracking({ status: "ANULADO", totals: undefined })), true);
});

test("absence of both code sources does not invent a code", () => {
  assert.equal(getVisibleDeliveryCode(tracking({
    totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
    shippingInfo: null,
    deliveryCode: null,
  })), null);
});

test("empty alternative code falls back to the paid shipping key", () => {
  assert.equal(getVisibleDeliveryCode(tracking({
    totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
    deliveryCode: { code: "   ", status: "activo" },
  })), shippingSecret);
});

test("the rendered page consumes the gated value, never a raw code", () => {
  const page = readFileSync(new URL("../src/app/rastreo/[orderNumber]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /const deliveryCode = getVisibleDeliveryCode\(data\);/);
  assert.match(page, /deliveryCode && \(/);
  assert.match(page, /\{deliveryCode\}/);
  assert.match(page, /cache: "no-store"/);
  assert.match(page, /discardDataOnError: true/);
  assert.match(page, /shouldStopPolling: shouldStopTrackingPolling/);
  assert.doesNotMatch(page, /\{data\.(?:deliveryCode\?*\.code|shippingInfo\?*\.shippingKey)\}/);
});
