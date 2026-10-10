import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/usePollingResource.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  fileName: "usePollingResource.ts",
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

const paid = { status: "EN_ENVIO", totals: { pendingAmount: 0 }, shippingInfo: { shippingKey: "TEST-KEY" } };
const response = (data = paid) => ({ ok: true, status: 200, json: async () => data });
const sameDeps = (a, b) => a && b && a.length === b.length && a.every((value, i) => value === b[i]);

// Minimal deterministic hooks lifecycle harness. All requests are stubbed;
// no browser, production API or customer records are involved.
function harness({ protectedResource = true, initial = response() } = {}) {
  const slots = [];
  const effects = [];
  const intervals = new Map();
  const requests = [];
  const queue = [initial];
  let cursor = 0;
  let dirty = false;
  let result;
  const react = {
    useState(initialValue) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = initialValue;
      return [slots[index], (value) => {
        const next = typeof value === "function" ? value(slots[index]) : value;
        if (!Object.is(next, slots[index])) dirty = true;
        slots[index] = next;
      }];
    },
    useRef(initialValue) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initialValue };
      return slots[index];
    },
    useCallback(callback, deps) {
      const index = cursor++;
      if (!slots[index] || !sameDeps(slots[index].deps, deps)) slots[index] = { callback, deps };
      return slots[index].callback;
    },
    useEffect(effect, deps) {
      const index = cursor++;
      const previous = slots[index];
      if (!previous || !sameDeps(previous.deps, deps)) {
        slots[index] = { deps, cleanup: previous?.cleanup };
        effects.push(() => {
          slots[index].cleanup?.();
          slots[index].cleanup = effect();
        });
      }
    },
  };
  const exports = {};
  const context = vm.createContext({
    exports,
    require: (name) => {
      assert.equal(name, "react");
      return react;
    },
    fetch: async (...args) => {
      requests.push(args);
      assert.ok(queue.length, "unexpected unplanned fetch");
      const next = queue.shift();
      if (next instanceof Error) throw next;
      return next;
    },
    setInterval: (callback) => {
      const id = intervals.size + 1;
      intervals.set(id, callback);
      return id;
    },
    clearInterval: (id) => intervals.delete(id),
  });
  vm.runInContext(compiled, context);
  const options = {
    url: "http://unit.test/tracking/TEST-ORDER",
    intervalMs: 30000,
    notFoundMessage: "NOT_FOUND",
    genericErrorMessage: "REFRESH_FAILED",
    ...(protectedResource ? { cache: "no-store", discardDataOnError: true } : {}),
  };
  function render() {
    dirty = false;
    cursor = 0;
    result = exports.usePollingResource(options);
    for (const effect of effects.splice(0)) effect();
  }
  async function flush() {
    for (let i = 0; i < 4; i++) {
      await new Promise((resolve) => setImmediate(resolve));
      if (dirty) render();
    }
    return result;
  }
  render();
  return {
    requests,
    queue,
    flush,
    get result() { return result; },
    refetch(next) {
      queue.push(next);
      result.refetch();
      return flush();
    },
    poll(next) {
      queue.push(next);
      for (const callback of intervals.values()) callback();
      return flush();
    },
  };
}

test("secret-bearing tracking requests bypass the browser HTTP cache", async () => {
  const h = harness();
  await h.flush();
  assert.equal(h.result.data, paid);
  assert.equal(h.requests[0][1].cache, "no-store");
});

for (const status of [404, 500, 503]) {
  test(`background refresh ${status} clears formerly paid data and fails closed`, async () => {
    const h = harness();
    await h.flush();
    await h.poll({ ok: false, status });
    assert.equal(h.result.data, null);
    assert.equal(h.result.error, status === 404 ? "NOT_FOUND" : "REFRESH_FAILED");
  });
}

test("network failure clears a formerly visible code", async () => {
  const h = harness();
  await h.flush();
  await h.poll(new Error("synthetic network failure"));
  assert.equal(h.result.data, null);
  assert.equal(h.result.error, "REFRESH_FAILED");
});

test("invalid JSON cannot preserve a formerly visible code", async () => {
  const h = harness();
  await h.flush();
  await h.poll({ ok: true, status: 200, json: async () => { throw new Error("invalid JSON"); } });
  assert.equal(h.result.data, null);
  assert.equal(h.result.error, "REFRESH_FAILED");
});

test("a later successful refresh recovers after a failed poll", async () => {
  const h = harness();
  await h.flush();
  await h.poll({ ok: false, status: 503 });
  await h.poll(response());
  assert.equal(h.result.data, paid);
  assert.equal(h.result.error, null);
});

test("older paid response cannot reveal a code after a newer failed refresh", async () => {
  const h = harness();
  await h.flush();
  let resolveOlder;
  const older = new Promise((resolve) => { resolveOlder = resolve; });
  h.queue.push(older);
  h.result.refetch();
  await h.refetch({ ok: false, status: 503 });
  resolveOlder(response());
  await h.flush();
  assert.equal(h.result.data, null);
  assert.equal(h.result.error, "REFRESH_FAILED");
});

test("existing unprotected callers retain their background refresh behavior", async () => {
  const h = harness({ protectedResource: false });
  await h.flush();
  await h.poll({ ok: false, status: 503 });
  assert.equal(h.result.data, paid);
  assert.equal(h.result.error, null);
  assert.equal(h.requests[0][1], undefined);
});
