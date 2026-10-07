(() => {
  const isExploreRoute = () => location.pathname === "/explore" || location.pathname.startsWith("/explore/");
  const findTarget = () => document.querySelector('[data-testid="sidebarColumn"]') || document.querySelector('main [data-testid="primaryColumn"]');
  const removeUi = () => document.getElementById(XGlobalTrendsUI.ROOT_ID)?.remove();
  async function loadTrends(root, location) {
    XGlobalTrendsUI.showStatus(root, "Cargando tendencias…");
    try { XGlobalTrendsUI.showTrends(root, await Trends24Provider.getTrends(location)); }
    catch (error) { XGlobalTrendsUI.showStatus(root, ({ empty: "Sin tendencias disponibles", unavailable: "Fuente temporalmente no disponible", network: "Error de conexión", source: "Fuente temporalmente no disponible" })[error?.code] || "Fuente temporalmente no disponible"); }
  }
  async function initialize(root) {
    try { const locations = XGlobalTrendsData.localizeLocations(await Trends24Provider.getLocations()); XGlobalTrendsUI.setCountries(root, locations, (location) => loadTrends(root, location)); await loadTrends(root, locations[0]); }
    catch (error) { XGlobalTrendsUI.showStatus(root, error?.code === "network" ? "Error de conexión" : "Fuente temporalmente no disponible"); }
  }
  function ensureUi() {
    if (!isExploreRoute()) return removeUi(); const target = findTarget(); if (!target) return;
    const existing = document.getElementById(XGlobalTrendsUI.ROOT_ID);
    if (existing && target.contains(existing)) return XGlobalTrendsUI.setTheme(existing);
    existing?.remove(); const root = XGlobalTrendsUI.create(); target.prepend(root); XGlobalTrendsUI.setTheme(root); initialize(root);
  }
  let scheduled = false; function scheduleEnsure() { if (scheduled) return; scheduled = true; requestAnimationFrame(() => { scheduled = false; ensureUi(); }); }
  new MutationObserver(scheduleEnsure).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
  window.addEventListener("popstate", scheduleEnsure); window.addEventListener("hashchange", scheduleEnsure); scheduleEnsure();
})();
