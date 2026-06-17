function isRecord(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
var p = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, l = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 }, d = { 0: String.fromCodePoint(l[0]), 1: String.fromCodePoint(l[1]), 2: String.fromCodePoint(l[2]), 3: String.fromCodePoint(l[3]) }, u = new Array(4).fill(String.fromCodePoint(l[0])).join("");
function A(e) {
  let r = JSON.stringify(e), t = new TextEncoder().encode(r), i = "";
  for (let c = 0; c < t.length; c++) {
    let n = t[c];
    i += d[n >> 6 & 3] + d[n >> 4 & 3] + d[n >> 2 & 3] + d[n & 3];
  }
  return u + i;
}
function I(e) {
  return !Number.isNaN(Number(e)) || /[a-z]/i.test(e) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(e) ? !1 : !!Date.parse(e);
}
function S(e) {
  try {
    new URL(e, e.startsWith("/") ? "https://acme.com" : void 0);
  } catch {
    return !1;
  }
  return !0;
}
function y(e, r, t = "auto") {
  return t === !0 || t === "auto" && (I(e) || S(e)) ? e : `${e}${A(r)}`;
}
Object.fromEntries(Object.entries(d).map((e) => [e[1], +e[0]]));
Object.fromEntries(Object.entries(p).map((e) => e.reverse()));
var h = `${Object.values(p).map((e) => `\\u{${e.toString(16)}}`).join("")}`, x = new RegExp(`[${h}]{4,}`, "gu");
function P(e) {
  var r;
  return { cleaned: e.replace(x, ""), encoded: ((r = e.match(x)) == null ? void 0 : r[0]) || "" };
}
function w(e) {
  return e && JSON.parse(P(JSON.stringify(e)).cleaned);
}
function stegaClean(result) {
  return w(result);
}
const vercelStegaCleanAll = stegaClean;
export {
  isRecord,
  stegaClean,
  vercelStegaCleanAll,
  y
};
//# sourceMappingURL=stegaClean.js.map
