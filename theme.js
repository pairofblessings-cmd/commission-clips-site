// Light/dark theme. Follows the device setting until someone presses the header button; that choice is remembered.
// Loaded in <head> (not deferred) so the saved theme applies before the page paints.
(() => {
  const KEY = "cc-site-theme", root = document.documentElement;
  try { const saved = localStorage.getItem(KEY); if (saved === "light" || saved === "dark") root.dataset.theme = saved; } catch (e) {}
  const dark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = () => dark() ? "Switch to light mode" : "Switch to dark mode";
  document.addEventListener("DOMContentLoaded", () => {
    const actions = document.querySelector("header.top .actions");
    if (!actions) return;
    const b = document.createElement("button");
    b.type = "button"; b.className = "theme-btn"; b.setAttribute("aria-label", label()); b.title = label();
    b.innerHTML = '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>' +
      '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    b.addEventListener("click", () => {
      const next = dark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (e) {}
      b.setAttribute("aria-label", label()); b.title = label();
    });
    actions.prepend(b);
  });
})();
