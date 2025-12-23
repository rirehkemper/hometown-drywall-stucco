(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });

document.querySelectorAll("[data-ba]").forEach((wrap) => {
  const range = wrap.querySelector('input[type="range"]');
  const after = wrap.querySelector(".after");
  const handle = wrap.querySelector(".handle");
  const lblBefore = wrap.querySelector(".label.before");
  const lblAfter  = wrap.querySelector(".label.after");

  if (!range || !after || !handle) return;

  const set = (v) => {
    const n = Number(v);
    after.style.width = `${n}%`;
    handle.style.left = `calc(${n}% - 2px)`;

    if (lblBefore && lblAfter) {
      lblBefore.style.opacity = (n <= 50) ? "1" : "0";
      lblAfter.style.opacity  = (n >= 50) ? "1" : "0";
    }
  };

  set(range.value);
  range.addEventListener("input", () => set(range.value));
});

})();
