(function () {
  const body = document.body;
  const toggle = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");

  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || "dark";

  body.setAttribute("data-theme", initialTheme);
  if (toggle) {
    toggle.textContent = initialTheme === "light" ? "🌙" : "☀️";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      const currentTheme = body.getAttribute("data-theme") || "dark";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      toggle.textContent = nextTheme === "light" ? "🌙" : "☀️";
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const revealTargets = document.querySelectorAll(
    ".hero, .section, .timeline-item, .project-card"
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
})();
