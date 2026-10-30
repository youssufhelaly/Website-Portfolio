// One-screen summary. Every number comes from window.REMARKABLE (runs/*.json).
(function () {
  "use strict";

  const DATA = window.REMARKABLE || { workloads: {}, runs: [] };
  const SITE = window.SITE || {};
  const $ = (id) => document.getElementById(id);
  const x = (v) => (v >= 9.95 ? v.toFixed(0) : v.toFixed(1)) + "×";
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) n.setAttribute(k, v);
    for (const kid of kids.flat()) if (kid != null) n.append(kid);
    return n;
  }

  const confirm = (wl, policy) => {
    const run = DATA.runs.find((r) => r.meta.workload === wl && r.meta.policy === policy);
    return run && run.events.find((e) => e.type === "confirm");
  };
  const lo = (c) => (c.best === "baseline" ? 1 : c.ci_low);
  const hi = (c) => (c.best === "baseline" ? 1 : c.ci_high);

  const rows = Object.keys(DATA.workloads).map((wl) => ({ wl, a: confirm(wl, "agent"), f: confirm(wl, "flag-search") }))
    .filter((r) => r.a && r.f)
    .map((r) => ({ ...r, v: lo(r.a) > hi(r.f) && r.a.best !== "baseline" ? "win" : lo(r.f) > hi(r.a) ? "loss" : "tie" }));

  const tiles = [];
  // 1. The agent's best win over plain flag search.
  const wins = rows.filter((r) => r.v === "win").sort((p, q) => q.a.speedup - p.a.speedup);
  if (wins.length) {
    const w = wins[0];
    tiles.push(["value", x(w.a.speedup) + " faster",
      `on ${w.wl}, from a ${w.a.source_changed ? "source fix no compiler flag could make" : "change flag search missed"}`]);
  }
  // 2. The most tempting wrong answer.
  // Prefer the sessions the page shows (the final run), agent first.
  const shown = new Set(DATA.runs.map((r) => r.meta.file));
  const rank = (c) => (shown.has(c.file) ? 0 : 2) + (c.policy === "agent" ? 0 : 1);
  const caught = (DATA.caught_all_sessions || []).filter((c) => c.speedup)
    .sort((p, q) => rank(p) - rank(q) || q.speedup - p.speedup);
  if (caught.length) {
    const c = caught[0];
    tiles.push(["value bad", x(c.speedup) + " faster, and wrong",
      `${c.flags.filter((f) => f !== "-O3").join(" ") || "a change"} on ${c.workload} failed its accuracy check. The lab rejected it.`]);
  }
  // 3. Wrong answers blocked overall.
  const n = (DATA.caught_all_sessions || []).length;
  if (n) tiles.push(["value", `${n} incorrect candidates rejected`, "across every recorded session, from the agent and the baseline"]);

  $("key-tiles").replaceChildren(...tiles.map(([cls, v, sub]) =>
    el("div", { class: "tile" }, el("span", { class: cls }, v), el("span", { class: "title" }, sub))));

  if (rows.length) {
    const c = (k) => rows.filter((r) => r.v === k).length;
    const model = (DATA.runs.find((r) => r.meta.policy === "agent") || { meta: {} }).meta.model;
    $("scoreline").textContent =
      `Agent${model ? ` (${model}, running locally)` : ""} vs plain compiler-flag search on ${rows.length} kernels: ` +
      `${c("win")} win, ${c("tie")} ties, ${c("loss")} losses.`;
  }

  $("who").textContent = SITE.name || "";
  const links = [["Résumé", SITE.resume, true], ["Email", SITE.email && "mailto:" + SITE.email], ["LinkedIn", SITE.linkedin], ["Code", SITE.repo]];
  $("contact-links").replaceChildren(...links.filter((l) => l[1]).map(([t, h, primary]) =>
    el("a", { class: primary ? "btn primary" : "btn", href: h }, t)));

  const m = DATA.runs[0] && DATA.runs[0].meta;
  $("fine").textContent = (m ? `Measured on ${m.machine}, ${m.compiler}. ` : "") + "Independent project, not affiliated with NVIDIA.";
})();
