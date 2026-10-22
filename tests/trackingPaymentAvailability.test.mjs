import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(filename, dependencies, globals = {}) {
  const source = readFileSync(new URL(filename, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => name in dependencies ? dependencies[name] : require(name),
    process: { env: { NEXT_PUBLIC_API_VENTAS: "https://api.example.invalid" } },
    ...globals,
  });
  return exports;
}

const state = load("../src/components/rastreo/clientState.ts", {});
const codes = load("../src/components/rastreo/deliveryCode.ts", {});
const emptyComponent = () => null;

function fixture(overrides = {}) {
  return {
    orderNumber: "TEST-ORDER",
    status: "PENDIENTE",
    deliveryType: "PROVINCIAS",
    customer: { fullName: "Synthetic Test Fixture" },
    businessName: "Synthetic Store",
    businessPhone: "+51 999 123 456",
    items: [],
    timeline: [],
    totals: { grandTotal: 130, totalPaid: 0, pendingAmount: 130 },
    ...overrides,
  };
}

function textOf(node) {
  if (node == null || typeof node === "boolean") return "";
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node !== "object") return String(node);
  return textOf(node.props?.children);
}

function findNode(node, predicate) {
  if (node == null || typeof node !== "object") return undefined;
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findNode(child, predicate);
      if (found) return found;
    }
    return undefined;
  }
  if (predicate(node)) return node;
  return findNode(node.props?.children, predicate);
}

// Deterministic state/render harness, following trackingPageRender.test.mjs.
// Every fetch is intercepted; location is a plain object and cannot navigate.
function harness(data) {
  const slots = [];
  const effects = [];
  const requests = [];
  const responses = [];
  const signals = [];
  const location = { href: "https://store.example.invalid/rastreo/TEST-ORDER" };
  let orderNumber = data.orderNumber;
  let cursor = 0;
  let dirty = false;
  let tree;
  let resource = { data, loading: false, error: null, refetch: () => {} };
  const page = load("../src/app/rastreo/[orderNumber]/page.tsx", {
    react: {
      ...React,
      useState(initial) {
        const index = cursor++;
        if (!(index in slots)) slots[index] = initial;
        return [slots[index], (next) => {
          const value = typeof next === "function" ? next(slots[index]) : next;
          if (!Object.is(value, slots[index])) dirty = true;
          slots[index] = value;
        }];
      },
      useRef(initial) {
        const index = cursor++;
        if (!(index in slots)) slots[index] = { current: initial };
        return slots[index];
      },
      useEffect(effect, deps) {
        const index = cursor++;
        const previous = slots[index];
        if (!previous || !deps.every((value, i) => Object.is(value, previous.deps[i]))) {
          const next = { deps, cleanup: undefined };
          slots[index] = next;
          effects.push(() => {
            previous?.cleanup?.();
            next.cleanup = effect();
          });
        }
      },
      useCallback: (callback) => callback,
    },
    "next/navigation": { useParams: () => ({ orderNumber }) },
    "@/components/rastreo/clientState": state,
    "@/components/rastreo/deliveryCode": codes,
    "@/components/rastreo/AgencyPicker": { default: emptyComponent, __esModule: true },
    "@/components/rastreo/YapePanel": { default: emptyComponent, __esModule: true },
    "@/components/rastreo/UpsellList": { default: emptyComponent, __esModule: true },
    "@/components/rastreo/RecompraFlow": { default: emptyComponent, __esModule: true },
    "@/lib/usePollingResource": { usePollingResource: () => resource },
  }, {
    window: { location },
    AbortController,
    fetch: async (url, options) => {
      // The unrelated upsell effect is also intercepted and returns no offers.
      if (url.endsWith("/upsell")) return { status: 404, ok: false };
      requests.push({ url, method: options?.method });
      signals.push(options?.signal);
      assert.ok(responses.length, "unexpected checkout request");
      const next = responses.shift();
      if (next instanceof Error) throw next;
      return await next;
    },
  }).default;

  function render(nextData = resource.data) {
    resource = { ...resource, data: nextData };
    for (let pass = 0; pass < 5; pass++) {
      dirty = false;
      cursor = 0;
      tree = page();
      for (const effect of effects.splice(0)) effect();
      if (!dirty) break;
      assert.ok(pass < 4, "render/effect lifecycle did not settle");
    }
    return renderToStaticMarkup(tree);
  }

  return {
    requests,
    responses,
    signals,
    location,
    render,
    navigate(nextOrderNumber, nextData) {
      orderNumber = nextOrderNumber;
      location.href = `https://store.example.invalid/rastreo/${nextOrderNumber}`;
      return render(nextData);
    },
    paymentButton: () => findNode(tree, (node) =>
      node.type === "button" && /mercadopago|mercado pago/i.test(textOf(node))),
    contactLink: () => findNode(tree, (node) =>
      node.type === "a" && textOf(node) === "Contactar a la tienda"),
  };
}

const unavailable = /Pago en línea no disponible/;
const unearnedPromise = /procesado por Mercado Pago|Pagas en línea con tarjeta|tu código se activa al instante/;

for (const [label, capability] of [
  ["missing", undefined],
  ["null", null],
  ["empty object", {}],
  ["false", { mercadoPago: false }],
  ["null provider", { mercadoPago: null }],
  ["string provider", { mercadoPago: "true" }],
  ["numeric provider", { mercadoPago: 1 }],
  ["malformed boolean", true],
  ["malformed string", "true"],
  ["malformed array", []],
]) {
  test(`${label} payment capability offers store contact instead of checkout`, () => {
    const h = harness(fixture({ paymentCapabilities: capability }));
    const html = h.render();
    assert.match(html, unavailable);
    assert.match(html, /Contacta a Synthetic Store para coordinar el pago/);
    assert.match(html, /130\.00/);
    assert.doesNotMatch(html, unearnedPromise);
    assert.equal(h.paymentButton(), undefined);
    assert.equal(h.contactLink()?.props.href, "tel:+51999123456");
    assert.equal(h.requests.length, 0);
  });
}

for (const phone of [undefined, null, "", "123", "not a phone", "1234567890123456"]) {
  test(`unavailable payment with invalid phone ${String(phone)} keeps contact guidance without a dial link`, () => {
    const h = harness(fixture({ businessPhone: phone }));
    const html = h.render();
    assert.match(html, unavailable);
    assert.match(html, /Contacta a Synthetic Store/);
    assert.equal(h.contactLink(), undefined);
    assert.doesNotMatch(html, /href="tel:/);
  });
}

test("only explicit provider support offers checkout and redirects using the stubbed preference", async () => {
  const h = harness(fixture({ paymentCapabilities: { mercadoPago: true } }));
  const html = h.render();
  assert.doesNotMatch(html, unavailable);
  assert.match(html, /Pagar S\/ 130\.00 con/);
  assert.equal(h.requests.length, 0);
  h.responses.push({
    status: 200,
    ok: true,
    json: async () => ({ initPoint: "https://payments.example.invalid/redirect" }),
  });
  await h.paymentButton().props.onClick();
  assert.deepEqual(h.requests, [{
    url: "https://api.example.invalid/tracking/TEST-ORDER/mp/preferencia",
    method: "POST",
  }]);
  assert.equal(h.location.href, "https://payments.example.invalid/redirect");
});

for (const status of [404, 405, 501]) {
  test(`unsupported preference status ${status} replaces checkout with contact and prevents another attempt`, async () => {
    const h = harness(fixture({ paymentCapabilities: { mercadoPago: true } }));
    h.render();
    h.responses.push({ status, ok: false });
    await h.paymentButton().props.onClick();
    const html = h.render();
    assert.match(html, unavailable);
    assert.doesNotMatch(html, unearnedPromise);
    assert.doesNotMatch(html, /No pudimos iniciar el pago/);
    assert.equal(h.paymentButton(), undefined);
    assert.equal(h.contactLink()?.props.href, "tel:+51999123456");
    assert.equal(h.requests.length, 1);
    assert.equal(h.location.href, "https://store.example.invalid/rastreo/TEST-ORDER");
    // A normal tracking poll must not resurrect the unavailable checkout.
    h.render(fixture({ paymentCapabilities: { mercadoPago: true } }));
    assert.equal(h.paymentButton(), undefined);
    assert.equal(h.requests.length, 1);
  });
}

test("an in-flight checkout disables its button and rejects another click", async () => {
  const h = harness(fixture({ paymentCapabilities: { mercadoPago: true } }));
  h.render();
  let finish;
  h.responses.push(new Promise((resolve) => { finish = resolve; }));
  const pending = h.paymentButton().props.onClick();
  h.render();
  assert.equal(h.paymentButton().props.disabled, true);
  await h.paymentButton().props.onClick();
  assert.equal(h.requests.length, 1);
  finish({ status: 200, ok: true, json: async () => ({ initPoint: "https://payments.example.invalid/redirect" }) });
  await pending;
});

test("an ordinary provider failure permits retry without redirecting or claiming the service is unavailable", async () => {
  const h = harness(fixture({ paymentCapabilities: { mercadoPago: true } }));
  h.render();
  h.responses.push({ status: 500, ok: false });
  await h.paymentButton().props.onClick();
  const html = h.render();
  assert.match(html, /No pudimos iniciar el pago/);
  assert.doesNotMatch(html, unavailable);
  assert.equal(h.paymentButton().props.disabled, false);
  assert.equal(h.location.href, "https://store.example.invalid/rastreo/TEST-ORDER");
});

test("a successful response without a checkout URL never navigates", async () => {
  const h = harness(fixture({ paymentCapabilities: { mercadoPago: true } }));
  h.render();
  h.responses.push({ status: 200, ok: true, json: async () => ({}) });
  await h.paymentButton().props.onClick();
  assert.match(h.render(), /No pudimos iniciar el pago/);
  assert.equal(h.location.href, "https://store.example.invalid/rastreo/TEST-ORDER");
});

for (const status of ["ANULADO", "EN_ENVIO", "ENTREGADO"]) {
  test(`explicit capability does not offer checkout for ${status}`, () => {
    const h = harness(fixture({ status, paymentCapabilities: { mercadoPago: true } }));
    h.render();
    assert.equal(h.paymentButton(), undefined);
    assert.equal(h.requests.length, 0);
  });
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

const supportedOrder = (orderNumber) => fixture({
  orderNumber,
  paymentCapabilities: { mercadoPago: true },
});

for (const response of [
  { status: 404, ok: false },
  { status: 200, ok: true, json: async () => ({ initPoint: "https://payments.example.invalid/old-order" }) },
]) {
  test(`navigation ignores an old order's delayed ${response.status} preference response`, async () => {
    const h = harness(supportedOrder("ORDER-A"));
    h.render();
    const oldResponse = deferred();
    h.responses.push(oldResponse.promise);
    const oldPayment = h.paymentButton().props.onClick();
    assert.match(h.requests[0].url, /ORDER-A\/mp\/preferencia$/);

    h.navigate("ORDER-B", supportedOrder("ORDER-B"));
    assert.equal(h.signals[0].aborted, true);
    assert.equal(h.paymentButton().props.disabled, false);
    const newResponse = deferred();
    h.responses.push(newResponse.promise);
    const newPayment = h.paymentButton().props.onClick();
    h.render();
    assert.match(h.requests[1].url, /ORDER-B\/mp\/preferencia$/);
    assert.equal(h.paymentButton().props.disabled, true);

    oldResponse.resolve(response);
    await oldPayment;
    const html = h.render();
    assert.equal(h.location.href, "https://store.example.invalid/rastreo/ORDER-B");
    assert.doesNotMatch(html, unavailable);
    assert.doesNotMatch(html, /No pudimos iniciar el pago|Error de conexión al iniciar el pago/);
    assert.equal(h.paymentButton().props.disabled, true, "old finally must not clear B's loading state");
    assert.equal(h.signals[1].aborted, false);

    newResponse.resolve({ status: 200, ok: true, json: async () => ({ initPoint: "https://payments.example.invalid/new-order" }) });
    await newPayment;
    assert.equal(h.location.href, "https://payments.example.invalid/new-order");
  });
}

test("navigation during delayed preference JSON parsing cannot redirect from the old order", async () => {
  const h = harness(supportedOrder("ORDER-A"));
  h.render();
  const oldJson = deferred();
  const parsing = deferred();
  h.responses.push({ status: 200, ok: true, json: () => {
    parsing.resolve();
    return oldJson.promise;
  } });
  const oldPayment = h.paymentButton().props.onClick();
  await parsing.promise;
  h.navigate("ORDER-B", supportedOrder("ORDER-B"));
  assert.equal(h.signals[0].aborted, true);
  oldJson.resolve({ initPoint: "https://payments.example.invalid/old-order" });
  await oldPayment;
  const html = h.render();
  assert.equal(h.location.href, "https://store.example.invalid/rastreo/ORDER-B");
  assert.doesNotMatch(html, unavailable);
  assert.doesNotMatch(html, /No pudimos iniciar el pago|Error de conexión al iniciar el pago/);
  assert.equal(h.paymentButton().props.disabled, false);
});

test("an aborted old request rejection never adds a payment error to the new order", async () => {
  const h = harness(supportedOrder("ORDER-A"));
  h.render();
  const oldResponse = deferred();
  h.responses.push(oldResponse.promise);
  const oldPayment = h.paymentButton().props.onClick();
  h.navigate("ORDER-B", supportedOrder("ORDER-B"));
  assert.equal(h.signals[0].aborted, true);
  const aborted = new Error("Synthetic aborted request");
  aborted.name = "AbortError";
  oldResponse.reject(aborted);
  await oldPayment;
  const html = h.render();
  assert.doesNotMatch(html, /No pudimos iniciar el pago|Error de conexión al iniciar el pago/);
  assert.doesNotMatch(html, unavailable);
  assert.equal(h.paymentButton().props.disabled, false);
  assert.equal(h.location.href, "https://store.example.invalid/rastreo/ORDER-B");
});
