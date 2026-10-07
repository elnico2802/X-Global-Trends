(() => {
  const isExploreRoute = () => location.pathname === "/explore" || location.pathname.startsWith("/explore/");

  function findTarget() {
    const timeline = document.querySelector('[aria-label*="Timeline"]');
    if (timeline) return timeline;

    // X cambia con frecuencia sus selectores; este contenedor es un fallback estable.
    return document.querySelector('main [data-testid="primaryColumn"]');
  }

  function removeUi() {
    document.getElementById(XGlobalTrendsUI.ROOT_ID)?.remove();
  }

  function ensureUi() {
    if (!isExploreRoute()) {
      removeUi();
      return;
    }

    const target = findTarget();
    if (!target) return;

    const existing = document.getElementById(XGlobalTrendsUI.ROOT_ID);
    if (existing && target.contains(existing)) return;
    existing?.remove();
    target.prepend(XGlobalTrendsUI.create());
  }

  let scheduled = false;
  function scheduleEnsure() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      ensureUi();
    });
  }

  const observer = new MutationObserver(scheduleEnsure);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("popstate", scheduleEnsure);
  window.addEventListener("hashchange", scheduleEnsure);
  scheduleEnsure();
})();
