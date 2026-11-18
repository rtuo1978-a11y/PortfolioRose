(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // "En ce moment" — rotating real updates
  var updates = [
    "je coordonne FlowManage, une application contre les inondations.",
    "je termine ma Licence 3 à l'ESATIC.",
    "je cherche un stage de fin de cycle de 3 à 6 mois à Abidjan.",
    "je fais grandir N'Zassa, ma plateforme sur la culture ivoirienne."
  ];
  var nowEl = document.getElementById("now-text");
  if (nowEl && !reduce) {
    var i = 0;
    setInterval(function () {
      nowEl.classList.add("is-fading");
      setTimeout(function () {
        i = (i + 1) % updates.length;
        nowEl.textContent = updates[i];
        nowEl.classList.remove("is-fading");
      }, 350);
    }, 4200);
  }

  // Project filters
  var quilt = document.getElementById("quilt");
  var empty = document.getElementById("quilt-empty");
  var buttons = document.querySelectorAll(".filter");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var shown = 0;
      quilt.querySelectorAll(".patch").forEach(function (p) {
        var tags = (p.getAttribute("data-tags") || "").split(" ");
        var show = f === "all" || tags.indexOf(f) !== -1;
        p.hidden = !show;
        if (show) shown++;
      });
      quilt.classList.toggle("is-filtered", f !== "all");
      empty.hidden = shown !== 0;
    });
  });

  // Live GitHub repositories
  var list = document.getElementById("repos");
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ago(dateStr) {
    var d = new Date(dateStr);
    var days = Math.round((Date.now() - d.getTime()) / 86400000);
    if (days <= 0) return "mis à jour aujourd'hui";
    if (days === 1) return "mis à jour hier";
    if (days < 31) return "mis à jour il y a " + days + " jours";
    return "mis à jour en " + d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  }
  if (list && window.fetch) {
    fetch("https://api.github.com/users/rtuo1978-a11y/repos?sort=pushed&per_page=9")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (repos) {
        repos = repos.filter(function (r) { return !r.fork && r.name !== "rtuo1978-a11y" && r.name !== "PortfolioRose"; });
        if (!repos.length) throw new Error("vide");
        list.innerHTML = repos.slice(0, 6).map(function (r) {
          return '<li><a href="' + esc(r.html_url) + '">' + esc(r.name) + "</a>" +
            "<p>" + esc(r.description || "Un projet en cours, la description arrive bientôt.") + "</p>" +
            '<div class="repo-info">' +
            (r.language ? '<span><span class="lang-dot" aria-hidden="true"></span>' + esc(r.language) + "</span>" : "") +
            "<span>" + ago(r.pushed_at) + "</span></div></li>";
        }).join("");
      })
      .catch(function () {
        list.innerHTML = '<li class="repo-loading">Impossible de charger mes dépôts pour le moment. Retrouvez-les directement sur GitHub.</li>';
      });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
