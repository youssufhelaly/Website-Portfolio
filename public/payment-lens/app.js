// Every number and replay comes from window.PAYMENT_LENS (recorded eval runs).
(function () {
  "use strict";

  const DATA = window.PAYMENT_LENS || { models: [] };
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) n.setAttribute(k, v);
    for (const kid of kids.flat()) if (kid != null) n.append(kid);
    return n;
  }

  const label = (model) => (model.startsWith("cursor/") ? `${model.slice(7)} (Cursor SDK)` : `${model} (local)`);
  const rate = (t) => (t && t.total ? t.passed / t.total : 0);
  const frac = (t) => (t ? `${t.passed}/${t.total}` : "n/a");

  const models = DATA.models.slice().sort((a, b) => rate(b.summary) - rate(a.summary));
  const best = models[0];

  // The HTML ships with the same numbers so the page reads without JavaScript; the data wins when present.
  if (models.length) {
    const rows = [
      ["Correct root cause", (m) => frac(m.summary.byCheck.correct_root_cause)],
      ["Every cited field matched Stripe's response", (m) => frac(m.summary.byCheck.citations_verified)],
      ["Reworded support-ticket questions", (m) => frac(m.summary.byPhrasing.paraphrase)],
      ["Refunds and card-number requests refused", (m) => frac(m.summary.byCategory.refusal)],
      ["Another customer's payment kept out of scope", (m) => frac(m.summary.byCategory.scope)],
      ["Prompt injection in payment data ignored", (m) => frac(m.summary.byCategory.injection)],
      ["Median seconds per investigation", (m) => String(m.medianSeconds)],
    ];
    $("results-head").replaceChildren(el("th", {}, "What was measured"), ...models.map((m) => el("th", {}, label(m.model))));
    $("results-body").replaceChildren(...rows.map(([name, value]) =>
      el("tr", {}, el("td", {}, name), ...models.map((m) => el("td", {}, value(m))))));
  }

  // Replay
  let model = best;
  let caseId = best && best.replays[0] && best.replays[0].id;
  let timer = null;

  const CASE_NAMES = {
    fraud_card_blocked_by_radar: "Radar block",
    prompt_injection: "Prompt injection",
    "succeeded~reworded": "Wrong premise",
    out_of_scope_payment: "Other customer",
    "refund_request~reworded": "Refund request",
  };

  function picker(container, items, current, onPick) {
    container.replaceChildren(...items.map(([value, text]) => {
      const b = el("button", { type: "button", role: "radio", "aria-checked": String(value === current) }, text);
      b.addEventListener("click", () => onPick(value));
      return b;
    }));
  }

  function line(cls, ...parts) {
    return el("div", { class: `ln ${cls}` }, ...parts);
  }

  function linesFor(r) {
    const out = [line("cmd", `npm run ask -- "${r.question}"`)];
    if (r.triage) {
      out.push(line("dim", `triage: ${r.triage.action}. ${r.triage.reason}`));
    }
    for (const t of r.tools) {
      const arg = Object.values(t.args || {}).join(", ");
      const status = t.status === "ok" ? el("span", { class: "st good" }, "ok") : el("span", { class: "st critical" }, t.status);
      out.push(line("tool", el("b", {}, t.ref), ` ${t.tool}(${arg}) `, status));
      if (t.error) out.push(line("err", t.error));
      for (const [field, value] of Object.entries(t.fields || {})) {
        if (field.endsWith("_untrusted")) {
          out.push(line("warn", `${field} = "${value}"`, el("span", { class: "tag" }, " untrusted text, treated as data")));
        } else {
          out.push(line("field", `${field} = ${value}`));
        }
      }
    }
    if (r.report) {
      out.push(line("final", el("b", {}, `${r.report.root_cause} (${r.report.certainty})`), el("br"), r.report.answer));
      for (const c of r.citations) {
        out.push(line("cite", el("span", { class: c.ok ? "st good" : "st critical" }, c.ok ? "✓ " : "✗ "), `${c.ref} ${c.field} = ${c.value}`));
      }
      for (const u of r.report.unknowns) out.push(line("dim", `unknown: ${u}`));
      for (const n of r.report.next_steps) out.push(line("dim", `next: ${n}`));
    } else {
      out.push(line("err", "No valid report."));
    }
    out.push(line("dim", `${r.passed ? "eval: pass" : "eval: FAIL"} · ${r.seconds}s`));
    return out;
  }

  function render() {
    if (!model) return;
    picker($("model-picker"), models.map((m) => [m.model, label(m.model)]), model.model, (v) => {
      model = models.find((m) => m.model === v);
      if (!model.replays.some((r) => r.id === caseId)) caseId = model.replays[0] && model.replays[0].id;
      render();
    });
    picker($("case-picker"), model.replays.map((r) => [r.id, CASE_NAMES[r.id] || r.id]), caseId, (v) => {
      caseId = v;
      render();
    });
    const r = model.replays.find((x) => x.id === caseId);
    const body = $("term-body");
    clearInterval(timer);
    body.replaceChildren();
    if (!r) return;
    $("term-title").textContent = `${label(model.model)} · ${r.phrasing} phrasing`;
    const lines = linesFor(r);
    if (reduceMotion) {
      body.append(...lines);
      return;
    }
    let i = 0;
    timer = setInterval(() => {
      body.append(lines[i++]);
      body.scrollTop = body.scrollHeight;
      if (i >= lines.length) clearInterval(timer);
    }, 90);
  }
  render();
})();
