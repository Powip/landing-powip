import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(filename, dependencies) {
  const source = readFileSync(new URL(filename, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => name in dependencies ? dependencies[name] : require(name),
    process: { env: { NEXT_PUBLIC_API_VENTAS: "http://unit.test" } },
  });
  return exports;
}

const state = load("../src/components/rastreo/clientState.ts", {});
const codes = load("../src/components/rastreo/deliveryCode.ts", {});
let resource;
let pollingOptions;
const emptyComponent = () => null;
const page = load("../src/app/rastreo/[orderNumber]/page.tsx", {
  react: {
    ...React,
    useState: (initial) => [initial, () => {}],
    useEffect: () => {},
    useCallback: (callback) => callback,
  },
  "next/navigation": { useParams: () => ({ orderNumber: "TEST-ORDER" }) },
  "@/components/rastreo/clientState": state,
  "@/components/rastreo/deliveryCode": codes,
  "@/components/rastreo/AgencyPicker": { default: emptyComponent, __esModule: true },
  "@/components/rastreo/YapePanel": { default: emptyComponent, __esModule: true },
  "@/components/rastreo/UpsellList": { default: emptyComponent, __esModule: true },
  "@/components/rastreo/RecompraFlow": { default: emptyComponent, __esModule: true },
  "@/lib/usePollingResource": { usePollingResource: (options) => {
    pollingOptions = options;
    return resource;
  } },
}).default;

function fixture(overrides = {}) {
  return {
    orderNumber: "TEST-ORDER",
    status: "EN_ENVIO",
    deliveryType: "PROVINCIAS",
    customer: { fullName: "Synthetic Test Fixture" },
    items: [],
    timeline: [],
    totals: { grandTotal: 65, totalPaid: 25, pendingAmount: 40 },
    shippingInfo: { shippingKey: "TEST-SHIPPING-SECRET" },
    ...overrides,
  };
}

function render(data, error = null) {
  resource = { data, loading: false, error, refetch: () => {} };
  return renderToStaticMarkup(React.createElement(page));
}

for (const status of ["EN_ENVIO", "ENTREGADO"]) {
  for (const codeSource of ["shipping", "delivery", "both"]) {
    test(`rendered ${status} with 65/25/40 hides ${codeSource} secrets`, () => {
      const html = render(fixture({
        status,
        ...(codeSource === "delivery" ? { shippingInfo: null } : {}),
        ...(codeSource !== "shipping" ? { deliveryCode: { code: "TEST-DELIVERY-SECRET", status: "activo" } } : {}),
      }));
      assert.doesNotMatch(html, /TEST-SHIPPING-SECRET|TEST-DELIVERY-SECRET|Código de entrega activo/);
      assert.match(html, /Código de entrega bloqueado/);
      assert.match(html, /40\.00/);
    });
  }

  test(`rendered fully paid ${status} preserves the usable shipping code`, () => {
    const html = render(fixture({ status, totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 } }));
    assert.match(html, /TEST-SHIPPING-SECRET/);
    assert.match(html, /Código de entrega activo/);
    assert.doesNotMatch(html, /Código de entrega bloqueado/);
  });
}

test("paid render prefers the alternate delivery code without leaking the fallback key", () => {
  const html = render(fixture({
    totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
    deliveryCode: { code: "TEST-DELIVERY-SECRET", status: "activo" },
  }));
  assert.match(html, /TEST-DELIVERY-SECRET/);
  assert.doesNotMatch(html, /TEST-SHIPPING-SECRET/);
});

test("backend-redacted key still explains the payment lock to an unpaid shipped customer", () => {
  const html = render(fixture({ shippingInfo: { shippingKey: null } }));
  assert.match(html, /Código de entrega bloqueado/);
  assert.doesNotMatch(html, /TEST-SHIPPING-SECRET|Código de entrega activo/);
});

test("cancelled paid render never includes either secret", () => {
  const html = render(fixture({
    status: "ANULADO",
    totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 },
    deliveryCode: { code: "TEST-DELIVERY-SECRET", status: "activo" },
  }));
  assert.doesNotMatch(html, /TEST-SHIPPING-SECRET|TEST-DELIVERY-SECRET|Código de entrega activo/);
});

for (const pendingAmount of [undefined, null, "0", NaN, Infinity, -5]) {
  test(`rendered invalid balance ${String(pendingAmount)} never includes a secret`, () => {
    const html = render(fixture({ totals: { grandTotal: 65, totalPaid: 65, pendingAmount } }));
    assert.doesNotMatch(html, /TEST-SHIPPING-SECRET|Código de entrega activo/);
  });
}

test("an errored refresh hides even a stale fully paid resource", () => {
  const html = render(fixture({ totals: { grandTotal: 65, totalPaid: 65, pendingAmount: 0 } }), "refresh failed");
  assert.doesNotMatch(html, /TEST-SHIPPING-SECRET|Código de entrega activo/);
});

test("rastreo opts into no-store and fail-closed polling", () => {
  render(fixture());
  assert.equal(pollingOptions.cache, "no-store");
  assert.equal(pollingOptions.discardDataOnError, true);
  assert.equal(pollingOptions.shouldStopPolling(fixture({ status: "ENTREGADO" })), false);
});
