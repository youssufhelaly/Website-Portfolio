// Every number and replay comes from window.PAYMENT_LENS (recorded eval runs).
(function () {
  "use strict";

  const DATA = window.PAYMENT_LENS || { models: [] };
  const SITE = window.SITE || {};
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

  if (best) {
    const s = best.summary;
    const tiles = [
      [`${frac(s)} cases passed`, `by ${label(best.model)} across diagnoses, refusals, scope checks, and prompt injection`],
      [`${frac(s.byCheck.citations_verified)} fully verified`, "answers where every cited field matched what Stripe returned"],
      [`${frac(s.byPhrasing.paraphrase)} reworded`, "questions phrased like real support tickets, not just \"why did X fail?\""],
    ];
    $("tiles").replaceChildren(...tiles.map(([v, sub]) =>
      el("div", { class: "tile" }, el("span", { class: "value" }, v), el("span", { class: "title" }, sub))));
    $("scoreline").textContent = "Same eval, different models: " + models
      .map((m) => `${label(m.model)} ${frac(m.summary)}, ${m.medianSeconds}s median`)
      .join(" · ") + ".";
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

  $("who").textContent = SITE.name || "";
  const links = [["Code", SITE.repo, true], ["Résumé", SITE.resume], ["Email", SITE.email && "mailto:" + SITE.email], ["LinkedIn", SITE.linkedin]];
  $("contact-links").replaceChildren(...links.filter((l) => l[1]).map(([t, h, primary]) =>
    el("a", { class: primary ? "btn primary" : "btn", href: h }, t)));
})();
