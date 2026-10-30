// Renders the page from window.REMARKABLE (generated from runs/*.json).
// Every string that came from a trace goes into the DOM via textContent.
(function () {
  "use strict";

  const DATA = window.REMARKABLE || { workloads: {}, runs: [] };
  const SITE = window.SITE || {};
  const POLICIES = [
    { id: "agent", label: "Agent", color: "var(--series-agent)" },
    { id: "flag-search", label: "Flag search", color: "var(--series-flags)" },
  ];
  const STATUS = {
    adopted: { label: "adopted", icon: "✓", cls: "good", color: "var(--status-good)" },
    rejected_incorrect: { label: "rejected: incorrect", icon: "✕", cls: "critical", color: "var(--status-critical)" },
    not_adopted: { label: "not adopted", icon: "–", cls: "neutral", color: "var(--status-neutral)" },
    compile_error: { label: "compile error", icon: "!", cls: "critical", color: "var(--status-critical)" },
    runtime_error: { label: "runtime error", icon: "!", cls: "critical", color: "var(--status-critical)" },
    rejected_by_policy: { label: "rejected by guard", icon: "⊘", cls: "neutral", color: "var(--status-neutral)" },
  };
  const WL_ORDER = ["quantize", "curve", "matmul", "kahan_sum"];

  // ---------------------------------------------------------------- helpers

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "style") n.setAttribute("style", v);
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      n.appendChild(typeof kid === "string" || typeof kid === "number" ? document.createTextNode(String(kid)) : kid);
    }
    return n;
  }
  const SVG = "http://www.w3.org/2000/svg";
  function sv(tag, attrs, ...kids) {
    const n = document.createElementNS(SVG, tag);
    for (const [k, v] of Object.entries(attrs || {})) if (v != null) n.setAttribute(k, v);
    for (const kid of kids.flat()) {
      if (kid == null) continue;
      n.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    }
    return n;
  }
  const $ = (id) => document.getElementById(id);
  const x = (v) => (v >= 9.95 ? v.toFixed(1) : v.toFixed(2)) + "×";
  const sci = (v) => (v === 0 ? "0" : v < 1e-3 ? v.toExponential(1) : v.toPrecision(2));

  const runs = DATA.runs.filter((r) => POLICIES.some((p) => p.id === r.meta.policy));
  const workloads = WL_ORDER.filter((w) => DATA.workloads[w]).concat(
    Object.keys(DATA.workloads).filter((w) => !WL_ORDER.includes(w))
  );
  const runFor = (wl, policy) => runs.find((r) => r.meta.workload === wl && r.meta.policy === policy);
  const evs = (run, type) => (run ? run.events.filter((e) => e.type === type) : []);
  const one = (run, type) => evs(run, type)[0];
  const policyOf = (id) => POLICIES.find((p) => p.id === id);
  const hasAgent = runs.some((r) => r.meta.policy === "agent");
  // Label the agent by the model that drove it, e.g. "Agent (gemini-2.5-pro)".
  const agentModel = (runs.find((r) => r.meta.policy === "agent") || { meta: {} }).meta.model;
  if (agentModel) policyOf("agent").label = `Agent (${agentModel})`;

  // ---------------------------------------------------------------- tooltip

  const tip = $("tooltip");
  function showTip(evt, lines) {
    tip.replaceChildren(...lines.map((l, i) => el("div", { class: i === 0 ? "tv" : "tr" }, l)));
    tip.hidden = false;
    let px, py;
    if (evt.clientX != null && evt.type.startsWith("pointer")) {
      px = evt.clientX; py = evt.clientY;
    } else {
      const r = evt.currentTarget.getBoundingClientRect();
      px = r.left + r.width / 2; py = r.top;
    }
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.min(window.innerWidth - w - 8, Math.max(8, px + 14)) + "px";
    tip.style.top = Math.max(8, py - h - 12) + "px";
  }
  const hideTip = () => (tip.hidden = true);

  // ---------------------------------------------------------------- dot-whisker chart (log x)

  function logTicks(lo, hi) {
    const all = [0.125, 0.25, 0.5, 1, 2, 4, 8, 16, 32, 64, 128];
    return all.filter((t) => t >= lo * 0.999 && t <= hi * 1.001);
  }

  // rows: [{label, sub, marks: [{value, lo, hi, color, tip: [..], text}]}]
  function dotWhisker(container, rows, opts) {
    // Draw at the container's real width so text renders at its CSS size.
    const W = Math.max(320, container.clientWidth || 720), padL = opts.padL || 150, padR = 64, rowH = opts.rowH || 40, top = 8, axisH = 28;
    const vals = rows.flatMap((r) => r.marks.flatMap((m) => (m.value ? [m.lo || m.value, m.hi || m.value, m.value] : [])));
    let lo = Math.min(0.5, ...vals) / 1.15, hi = Math.max(2, ...vals) * 1.25;
    lo = Math.max(lo, 0.1);
    const H = top + rows.length * rowH + axisH;
    const sx = (v) => padL + ((Math.log(v) - Math.log(lo)) / (Math.log(hi) - Math.log(lo))) * (W - padL - padR);
    const svg = sv("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": opts.aria });
    const ticks = logTicks(lo, hi);
    for (const t of ticks) {
      svg.appendChild(sv("line", { class: t === 1 ? "one" : "grid", x1: sx(t), x2: sx(t), y1: top, y2: H - axisH + 4 }));
      svg.appendChild(sv("text", { class: "tick", x: sx(t), y: H - 8, "text-anchor": "middle" }, t < 1 ? t + "×" : t + "×"));
    }
    rows.forEach((r, i) => {
      const cy = top + i * rowH + rowH / 2;
      svg.appendChild(sv("text", { class: opts.strongLabels ? "ylabel-strong" : "ylabel", x: 0, y: r.sub ? cy - 2 : cy + 4 }, r.label));
      if (r.sub) svg.appendChild(sv("text", { x: 0, y: cy + 13, "font-size": "11" }, r.sub.length > 24 ? r.sub.slice(0, 23) + "…" : r.sub));
      const n = r.marks.length;
      r.marks.forEach((m, j) => {
        const y = n === 1 ? cy : cy + (j - (n - 1) / 2) * 12;
        const g = sv("g", { class: "mark", tabindex: "0", role: "img", "aria-label": m.tip.join(". ") });
        if (m.value) {
          if (m.lo && m.hi) g.appendChild(sv("line", { class: "whisker", x1: sx(m.lo), x2: sx(m.hi), y1: y, y2: y, stroke: m.color }));
          g.appendChild(sv("circle", { class: "dot", cx: sx(m.value), cy: y, r: 5, fill: m.color }));
          if (m.text) g.appendChild(sv("text", { class: "vlabel", x: sx(m.hi || m.value) + 8, y: y + 4 }, m.text));
          g.appendChild(sv("rect", { class: "hit", x: Math.min(sx(m.lo || m.value), sx(m.value)) - 12, y: y - 12, width: Math.max(24, sx(m.hi || m.value) - sx(m.lo || m.value) + 24), height: 24 }));
        } else {
          g.appendChild(sv("text", { class: "vlabel", x: sx(1) + 8, y: y + 4 }, m.text || "no timing"));
          g.appendChild(sv("rect", { class: "hit", x: sx(1), y: y - 12, width: 160, height: 24 }));
        }
        g.addEventListener("pointermove", (e) => showTip(e, m.tip));
        g.addEventListener("pointerleave", hideTip);
        g.addEventListener("focus", (e) => showTip(e, m.tip));
        g.addEventListener("blur", hideTip);
        svg.appendChild(g);
      });
    });
    container.replaceChildren(svg);
    container._redraw = () => dotWhisker(container, rows, opts);
  }

  // ---------------------------------------------------------------- results

  function confirmMark(run, policy) {
    const c = one(run, "confirm");
    if (!c) return null;
    const p = policyOf(policy);
    if (c.best === "baseline") {
      return { value: 1, color: p.color, text: "no change", tip: [`${p.label}: no change`, "Nothing beat -O3 within budget"] };
    }
    return {
      value: c.speedup, lo: c.ci_low, hi: c.ci_high, color: p.color, text: x(c.speedup),
      tip: [`${p.label}: ${x(c.speedup)}`, `95% CI ${x(c.ci_low)} to ${x(c.ci_high)}`, `${c.best}: ${c.best_flags.join(" ")}${c.source_changed ? " + source change" : ""}`, `${c.baseline_ms.toFixed(2)} ms → ${c.candidate_ms.toFixed(2)} ms`],
    };
  }

  // What the winning change was, from lab data only (never from model prose).
  function describeFix(run, c) {
    if (!c || c.best === "baseline") return "Nothing passed the gates.";
    const s = one(run, "start");
    const rank = (r) => (r.pass_name === "loop-vectorize" ? 0 : 1);
    const gone = s ? remarkDiff(s.remarks, c.best_remarks).resolved.filter((r) => r.kind !== "passed").sort((p, q) => rank(p) - rank(q)) : [];
    const change = [c.source_changed ? "source edit" : null, ...c.best_flags.filter((f) => f !== "-O3")].filter(Boolean).join(" + ");
    return `${change || c.best_flags.join(" ")}${gone.length ? `. Gone: "${gone[0].message}"` : ""}`;
  }

  function verdict(a, f) {
    if (!a || !f) return null;
    const lo = (c) => (c.best === "baseline" ? 1 : c.ci_low), hi = (c) => (c.best === "baseline" ? 1 : c.ci_high);
    if (lo(a) > hi(f) && !(a.best === "baseline" && f.best === "baseline")) return "win";
    if (lo(f) > hi(a)) return "loss";
    return "tie";
  }

  function renderScorecard() {
    const rows = workloads.map((wl) => {
      const a = one(runFor(wl, "agent"), "confirm"), f = one(runFor(wl, "flag-search"), "confirm");
      return { wl, a, f, v: verdict(a, f) };
    }).filter((r) => r.v);
    const n = (v) => rows.filter((r) => r.v === v).length;
    const v = (c) => (c.best === "baseline" ? "1.00×" : x(c.speedup));
    const label = { win: "agent wins", loss: "agent loses", tie: "tie" };
    $("scorecard").replaceChildren(
      el("div", { class: "score-head" }, rows.length ? `${n("win")} win · ${n("loss")} loss · ${n("tie")} tie` : "No agent runs yet"),
      ...rows.map((r) => el("div", { class: "score-row" }, el("b", {}, r.wl), el("span", {}, label[r.v]), el("span", {}, `agent ${v(r.a)} vs flag search ${v(r.f)}`)))
    );
    const caught = [];
    for (const run of runs) for (const e of evs(run, "experiment")) if (e.status === "rejected_incorrect") caught.push({ run, e });
    caught.sort((p, q) => (q.e.timing ? q.e.timing.speedup : 0) - (p.e.timing ? p.e.timing.speedup : 0));
    $("caught").replaceChildren(...(caught.length ? caught.map(({ run, e }) => el("div", { class: "caught-row" },
      el("span", { class: "st critical" }, "✕ "),
      el("span", { class: "what" }, `${run.meta.workload} ${e.id} · ${policyOf(run.meta.policy).label} · ${e.source_changed ? "source edit + " : ""}${e.flags.join(" ")}${e.timing ? ` · ${x(e.timing.speedup)} faster` : ""}`),
      el("span", { class: "why" }, e.reason))) : [el("div", { class: "caught-row" }, "None yet.")]));

    // Earlier sessions (traces in runs/), excluding the ones listed above.
    const shown = new Set(runs.map((r) => r.meta.file));
    const earlier = (DATA.caught_all_sessions || []).filter((c) => !shown.has(c.file) && c.policy === "agent");
    if (earlier.length) {
      $("caught").appendChild(el("div", { class: "caught-sub" }, `Earlier agent sessions (${earlier.length})`));
      for (const c of earlier) {
        $("caught").appendChild(el("div", { class: "caught-row" },
          el("span", { class: "st critical" }, "✕ "),
          el("span", { class: "what" }, `${c.workload} ${c.id} · ${c.source_changed ? "source edit + " : ""}${c.flags.join(" ")}${c.speedup ? ` · ${x(c.speedup)} faster` : ""}`),
          el("span", { class: "why" }, c.reason)));
      }
    }
  }

  function renderResults() {
    if (!hasAgent) {
      const note = $("status-note");
      note.hidden = false;
      note.textContent = "Agent runs have not been recorded yet. This page currently shows the flag-search baseline only. Run `python -m remarkable agent` and then `python -m remarkable export`.";
    }
    $("tiles").replaceChildren(
      ...workloads.map((wl) => {
        const w = DATA.workloads[wl];
        const a = one(runFor(wl, "agent"), "confirm");
        const f = one(runFor(wl, "flag-search"), "confirm");
        const main = a || f;
        const best = a || f;
        const v = (c) => (!c ? "–" : c.best === "baseline" ? "1.00×" : x(c.speedup));
        return el("div", { class: "tile" },
          el("span", { class: "label" }, wl),
          el("span", { class: "title" }, w.title),
          el("span", { class: "vs" }, el("i", { class: "key", style: `background:${a ? "var(--series-agent)" : "var(--series-flags)"}` }), a ? policyOf("agent").label : "Flag search"),
          el("span", { class: "value" }, v(main)),
          el("span", { class: "ci" }, main && main.best !== "baseline" ? `95% CI ${x(main.ci_low)}–${x(main.ci_high)}` : "no change over -O3"),
          a && el("span", { class: "vs" }, el("i", { class: "key", style: "background:var(--series-flags)" }), `Flag search: ${v(f)}`),
          el("span", { class: "how" }, describeFix(runFor(wl, a ? "agent" : "flag-search"), best))
        );
      })
    );
    const present = POLICIES.filter((p) => runs.some((r) => r.meta.policy === p.id));
    $("policy-legend").replaceChildren(...present.map((p) => el("span", {}, el("i", { class: "key", style: `background:${p.color}` }), p.label)));
    dotWhisker($("policy-chart"),
      workloads.map((wl) => ({ label: wl, marks: present.map((p) => confirmMark(runFor(wl, p.id), p.id)).filter(Boolean) })),
      { aria: "Confirmed speedup over -O3 per workload and policy", padL: 100, rowH: 48, strongLabels: true });
  }

  // ---------------------------------------------------------------- diff

  function lineDiff(a, b) {
    const A = a.replace(/\s+$/, "").split("\n"), B = b.replace(/\s+$/, "").split("\n");
    const n = A.length, m = B.length;
    const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const out = [];
    let i = 0, j = 0;
    while (i < n && j < m) {
      if (A[i] === B[j]) { out.push(["ctx", A[i]]); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) out.push(["del", A[i++]]);
      else out.push(["add", B[j++]]);
    }
    while (i < n) out.push(["del", A[i++]]);
    while (j < m) out.push(["add", B[j++]]);
    return out;
  }
  const diffStat = (a, b) => {
    const d = lineDiff(a, b);
    return { add: d.filter((l) => l[0] === "add").length, del: d.filter((l) => l[0] === "del").length };
  };

  function remarkKey(r) { return [r.kind, r.pass_name, r.message, r.source].join("|"); }
  function remarkDiff(before, after) {
    const a = new Set(after.map(remarkKey)), b = new Set(before.map(remarkKey));
    return { resolved: before.filter((r) => !a.has(remarkKey(r))), added: after.filter((r) => !b.has(remarkKey(r))) };
  }
  function remarkItem(r) {
    return el("li", {}, el("span", { class: "rk" }, `[${r.kind} ${r.pass_name}] `), r.message, el("span", { class: "src" }, `${r.file}:${r.line}  ${r.source.length > 80 ? r.source.slice(0, 79) + "…" : r.source}`));
  }

  function renderDiff(run) {
    const s = one(run, "start"), c = one(run, "confirm");
    if (!s || !c) return;
    const d = lineDiff(s.source, c.best_source);
    $("diff").replaceChildren(...d.map(([k, t]) => el("span", { class: k }, t || " ")));
    $("diff-title").textContent = c.best === "baseline" ? "Baseline (unchanged)" : `Baseline → ${c.best}`;
    $("diff-sub").textContent = c.source_changed ? "Source change adopted by the lab." : "No source change: the win, if any, came from flags.";
    const rd = remarkDiff(s.remarks, c.best_remarks);
    const box = $("remark-changes");
    box.replaceChildren(
      el("div", { class: "flagline" }, `flags: ${s.flags.join(" ")} → ${c.best_flags.join(" ")}`),
      el("h3", {}, `Remarks that went away (${rd.resolved.length})`),
      el("ul", {}, rd.resolved.length ? rd.resolved.slice(0, 8).map(remarkItem) : el("li", {}, "None")),
      el("h3", {}, `Remarks that appeared (${rd.added.length})`),
      el("ul", {}, rd.added.length ? rd.added.slice(0, 8).map(remarkItem) : el("li", {}, "None"))
    );
  }

  // ---------------------------------------------------------------- experiments chart + table

  function renderExperiments(run) {
    const exps = evs(run, "experiment");
    const used = [...new Set(exps.map((e) => e.status))];
    $("status-legend").replaceChildren(...used.map((s) => {
      const st = STATUS[s] || STATUS.not_adopted;
      return el("span", {}, el("i", { class: "key", style: `background:${st.color};border-radius:50%` }), `${st.icon} ${st.label}`);
    }));
    dotWhisker($("exp-chart"), exps.map((e) => {
      const st = STATUS[e.status] || STATUS.not_adopted;
      const t = e.timing;
      const tipL = [
        t ? `${e.id}: ${x(t.speedup)} vs ${e.compared_against}` : `${e.id}: ${st.label}`,
        `${st.icon} ${st.label}`,
        e.flags.join(" ") + (e.source_changed ? " + source change" : ""),
        t ? `95% CI ${x(t.ci_low)} to ${x(t.ci_high)}` : null,
        e.correctness ? (e.correctness.ok ? "correct" : `max rel error ${sci(e.correctness.max_rel_err)}`) : null,
      ].filter(Boolean);
      return {
        label: `${e.id} ${st.icon}`,
        sub: [e.source_changed ? "source edit" : null, ...e.flags.filter((f) => f !== "-O3")].filter(Boolean).join(" + ") || e.flags.join(" "),
        marks: [t ? { value: t.speedup, lo: t.ci_low, hi: t.ci_high, color: st.color, text: x(t.speedup), tip: tipL } : { color: st.color, text: st.label, tip: tipL }],
      };
    }), { aria: "Speedup of each experiment against the best configuration at the time", padL: 150, rowH: 38 });

    const head = el("tr", {}, ["ID", "Status", "Change", "Speedup", "95% CI", "Max rel err"].map((h) => el("th", {}, h)));
    const body = exps.map((e) => {
      const st = STATUS[e.status] || STATUS.not_adopted;
      const t = e.timing;
      return el("tr", {},
        el("td", {}, e.id),
        el("td", {}, el("span", { class: `st ${st.cls}` }, st.icon), " ", st.label),
        el("td", {}, (e.source_changed ? "source + " : "") + e.flags.join(" ")),
        el("td", { class: "num" }, t ? x(t.speedup) : "–"),
        el("td", { class: "num" }, t ? `${x(t.ci_low)}–${x(t.ci_high)}` : "–"),
        el("td", { class: "num" }, e.correctness ? sci(e.correctness.max_rel_err) : "–"));
    });
    $("exp-table").replaceChildren(el("table", {}, el("thead", {}, head), el("tbody", {}, body)));
  }

  // ---------------------------------------------------------------- terminal replay

  function line(cls, ...kids) { return el("div", { class: "ln " + cls }, ...kids); }
  function verdictLine(e) {
    const st = STATUS[e.status] || STATUS.not_adopted;
    const t = e.timing;
    const parts = [el("span", { class: `st ${st.cls}` }, `${st.icon} ${e.id} ${st.label}`)];
    if (t) parts.push(`  ${x(t.speedup)} [${x(t.ci_low)}, ${x(t.ci_high)}] vs ${e.compared_against}`);
    if (e.correctness) parts.push(e.correctness.ok ? "  · output correct" : `  · max rel error ${sci(e.correctness.max_rel_err)}`);
    return line("verdict", ...parts);
  }
  function remarkLines(remarks, max) {
    return remarks.filter((r) => r.kind !== "passed").slice(0, max).map((r) =>
      line("remark", el("span", { class: "rk" }, `${r.file}:${r.line} [${r.kind} ${r.pass_name}] `), r.message));
  }

  function steps(run) {
    const out = [];
    const s = one(run, "start");
    const policy = run.meta.policy;
    let lastSource = s ? s.source : "";
    for (const e of run.events) {
      if (e.type === "start") {
        out.push([
          line("cmd", `python -m remarkable ${policy === "agent" ? "agent" : "baseline"} ${e.workload}`),
          line("dim", `${run.meta.compiler} · ${run.meta.machine}${run.meta.model ? " · " + run.meta.model : ""}`),
          line("dim", `baseline ${e.flags.join(" ")}: ${e.per_rep_ms} ms per call`),
          line("dim", "clang says, at -O3:"),
          ...remarkLines(e.remarks, 6),
        ]);
      } else if (e.type === "agent_turn") {
        const g = [];
        for (const th of e.thinking || []) g.push(line("think", th.length > 1200 ? th.slice(0, 1200) + "…" : th));
        for (const tx of e.text || []) g.push(line("say", tx));
        for (const c of e.tool_calls || []) {
          if (c.name === "finish") continue;
          const src = c.input.source;
          let edit = "current source";
          if (src) { const d = diffStat(lastSource, src); edit = d.add + d.del ? `source edited +${d.add} −${d.del}` : "same source"; }
          g.push(line("tool", "→ ", el("b", {}, c.name), `  ${(c.input.flags || []).join(" ")}  (${edit})`));
          if (c.input.hypothesis) g.push(line("hyp", c.input.hypothesis));
        }
        if (g.length) out.push(g);
      } else if (e.type === "inspect") {
        if (e.rejected) { out.push([line("err", `← inspect rejected: ${e.rejected}`)]); continue; }
        const r = e.result;
        const g = [line("dim", `← inspect: ${r.ok ? "built" : "compile error"} in ${r.compile_ms} ms, ${r.remarks.length} remarks`)];
        if (!r.ok) g.push(line("err", r.errors.split("\n").slice(0, 4).join("\n")));
        const res = r.remark_changes_vs_best.resolved.filter((x) => x.kind !== "passed");
        if (res.length) g.push(line("remark", el("span", { class: "rk" }, "gone vs best: "), res.map((x) => x.message).slice(0, 3).join(" · ")));
        g.push(...remarkLines(r.remarks, 4));
        out.push(g);
      } else if (e.type === "experiment") {
        const g = [];
        if (policy !== "agent") g.push(line("tool", "→ ", el("b", {}, "run_experiment"), `  ${e.flags.join(" ")}`), line("hyp", e.hypothesis));
        g.push(verdictLine(e));
        if (e.status !== "adopted" && e.reason) g.push(line("reason", e.reason));
        const res = (e.remark_changes_vs_best ? e.remark_changes_vs_best.resolved : []).filter((r) => r.kind !== "passed");
        if (res.length) g.push(line("remark", el("span", { class: "rk" }, "resolved: "), res.map((r) => r.message).slice(0, 2).join(" · ")));
        if (e.status === "adopted") lastSource = e.source;
        out.push(g);
      } else if (e.type === "tool_error") {
        out.push([line("err", `← ${e.tool} error: ${e.error}`)]);
      } else if (e.type === "finish") {
        out.push([line("final", el("b", {}, `finish → ${e.recommended}`), el("span", { class: "rk" }, "  (the agent's own words; the lab's numbers are above)\n"), e.summary, e.rejected_ideas ? "\n\nRejected: " + e.rejected_ideas : "", e.caveats ? "\n\nCaveats: " + e.caveats : "")]);
      } else if (e.type === "confirm") {
        out.push([line("final", e.best === "baseline" ? "confirmation: nothing beat -O3" :
          `confirmation run: ${e.best} is ${x(e.speedup)} the -O3 baseline (95% CI ${x(e.ci_low)}–${x(e.ci_high)}, ${e.rounds} interleaved rounds)`)]);
      } else if (e.type === "aborted") {
        out.push([line("err", `aborted: ${e.error}`)]);
      }
    }
    return out;
  }

  let timer = null;
  function renderTerminal(run, animate) {
    clearTimeout(timer);
    const term = $("term");
    term.replaceChildren();
    const all = steps(run);
    const cost = run.meta.cost_usd != null ? ` · $${run.meta.cost_usd.toFixed(2)}` : "";
    $("term-title").textContent = `${run.meta.file || ""} · ${run.meta.duration_s || "?"} s${cost}`;
    if (!animate) { all.forEach((g) => g.forEach((n) => term.appendChild(n))); term.scrollTop = 0; return; }
    let i = 0;
    const tick = () => {
      if (i >= all.length) return;
      all[i].forEach((n) => term.appendChild(n));
      term.scrollTop = term.scrollHeight;
      const long = all[i].some((n) => n.classList.contains("think"));
      i++;
      timer = setTimeout(tick, long ? 1400 : 550);
    };
    tick();
  }

  // ---------------------------------------------------------------- filters

  const state = { wl: workloads[0], policy: hasAgent ? "agent" : "flag-search" };
  // Deep link: #session=kahan_sum:agent
  const deep = location.hash.match(/session=([\w-]+)(?::([\w-]+))?/);
  if (deep && DATA.workloads[deep[1]]) {
    state.wl = deep[1];
    if (deep[2] && policyOf(deep[2])) state.policy = deep[2];
  }
  function seg(container, items, current, onPick) {
    container.replaceChildren(...items.map((it) => el("button", {
      role: "radio", "aria-checked": String(it.id === current), disabled: it.disabled || null,
      onclick: () => onPick(it.id),
    }, it.label)));
  }
  function renderReplay(animate) {
    if (!runFor(state.wl, state.policy)) state.policy = POLICIES.find((p) => runFor(state.wl, p.id))?.id || state.policy;
    seg($("wl-filter"), workloads.map((w) => ({ id: w, label: w })), state.wl, (id) => { state.wl = id; renderReplay(false); });
    seg($("policy-filter"), POLICIES.map((p) => ({ id: p.id, label: p.label, disabled: !runFor(state.wl, p.id) })), state.policy, (id) => { state.policy = id; renderReplay(false); });
    history.replaceState(null, "", `#session=${state.wl}:${state.policy}`);
    const run = runFor(state.wl, state.policy);
    if (!run) return;
    renderTerminal(run, animate);
    renderExperiments(run);
    renderDiff(run);
  }

  // ---------------------------------------------------------------- the trap

  function renderTrap() {
    const cands = [];
    for (const p of POLICIES) {
      const run = runFor("kahan_sum", p.id);
      for (const e of evs(run, "experiment")) if (e.status === "rejected_incorrect" && e.timing) cands.push({ e, p });
    }
    const hit = cands.find((c) => c.e.flags.includes("-ffast-math")) || cands[0];
    const agentConfirm = one(runFor("kahan_sum", "agent"), "confirm");
    const copy = $("trap-copy");
    copy.replaceChildren(
      el("p", {}, "kahan_sum is compensated summation: it carries the rounding error of each addition forward in c so that long sums of mixed-magnitude values stay accurate. Callers use it because a plain loop isn't accurate enough."),
      el("pre", {}, "double y = x[i] - c;\ndouble t = sum + y;\nc = (t - sum) - y;   // algebraically zero\nsum = t;"),
      el("p", {}, "With -ffast-math, clang may reassociate floating-point math. Under real-number algebra (sum + y) - sum - y is 0, so the compensation folds away and what's left is a plain sum the vectorizer can split across lanes. The remark flips from \"loop not vectorized\" to \"vectorized loop\", the speedup is real, and the answer gets worse."),
      el("p", {}, "The LLVM IR confirms it: at -O3 the loop body has three fsub instructions; with -ffast-math it has none, just four <2 x double> accumulators of plain fadd."),
      el("p", {}, "A flag search that only optimizes runtime would keep it. The lab rejects it because the workload's contract says what correct means, and the check runs before the stopwatch matters.")
    );
    if (!hit) return;
    const { e } = hit;
    const ratio = e.correctness.rtol ? e.correctness.max_rel_err / e.correctness.rtol : null;
    const tiles = [
      el("div", { class: "tile" },
        el("span", { class: "label" }, `${e.id} · ${e.flags.join(" ")} · ${hit.p.label}`),
        el("span", { class: "value" }, x(e.timing.speedup)),
        el("span", { class: "ci" }, `faster than -O3 (95% CI ${x(e.timing.ci_low)}–${x(e.timing.ci_high)})`),
        el("span", { class: "badge critical" }, "✕ rejected: incorrect")),
      el("div", { class: "tile" },
        el("span", { class: "label" }, "Relative error vs reference"),
        el("span", { class: "value" }, sci(e.correctness.max_rel_err)),
        el("span", { class: "ci" }, ratio ? `${Math.round(ratio)}× over the contract (rtol ${sci(e.correctness.rtol)})` : "outside the contract")),
    ];
    if (agentConfirm && agentConfirm.best !== "baseline") {
      tiles.push(el("div", { class: "tile" },
        el("span", { class: "label" }, `What the agent shipped instead · ${agentConfirm.best}`),
        el("span", { class: "value" }, x(agentConfirm.speedup)),
        el("span", { class: "ci" }, `95% CI ${x(agentConfirm.ci_low)}–${x(agentConfirm.ci_high)}, with the compensation intact`),
        el("span", { class: "badge good" }, "✓ adopted: correct")));
    }
    $("trap-stats").replaceChildren(...tiles);
  }

  // ---------------------------------------------------------------- chrome

  function renderChrome() {
    document.querySelectorAll("[data-link]").forEach((a) => {
      const href = SITE[a.dataset.link];
      if (href) a.href = href; else a.remove();
    });
    $("byline").textContent = `Built by ${SITE.name || ""} · ${SITE.role || ""}`;
    $("sig").textContent = `${SITE.name || ""}`;
    const links = [["Résumé", SITE.resume], ["GitHub repo", SITE.repo], ["LinkedIn", SITE.linkedin], ["Portfolio", SITE.portfolio], ["Email", SITE.email && "mailto:" + SITE.email], ["Walkthrough video", SITE.video]];
    $("links").replaceChildren(...links.filter((l) => l[1]).map(([t, h]) => el("a", { class: "btn", href: h }, t)));
    const m = runs[0] ? runs[0].meta : null;
    const dates = [...new Set(runs.map((r) => r.meta.started.slice(0, 10)))].sort();
    $("footer-meta").textContent = m ? `Measured on ${m.machine} with ${m.compiler}. Runs recorded ${dates.join(", ")}.` : "";
  }

  $("play").addEventListener("click", () => { const r = runFor(state.wl, state.policy); if (r) renderTerminal(r, true); });
  $("showall").addEventListener("click", () => { const r = runFor(state.wl, state.policy); if (r) renderTerminal(r, false); });
  window.addEventListener("scroll", hideTip, { passive: true });
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => document.querySelectorAll(".chart").forEach((c) => c._redraw && c._redraw()), 150);
  });

  renderChrome();
  renderResults();
  renderScorecard();
  renderReplay(false);
  renderTrap();
  if (deep) $("replay").scrollIntoView();
})();
