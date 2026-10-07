(() => {
  const isSupportedRoute = () => location.pathname === "/home" || location.pathname === "/explore" || location.pathname.startsWith("/explore/");
  const findTarget = () => document.querySelector('[data-testid="sidebarColumn"]') || document.querySelector('main [data-testid="primaryColumn"]');
  const hiddenModuleAttribute = "data-xgt-hidden-module";
  const nativeModuleTitles = ["Actualizar a Premium+", "En directo en X"];
  function restoreNativeModules() {
    document.querySelectorAll(`[${hiddenModuleAttribute}]`).forEach((module) => { module.hidden = false; module.removeAttribute(hiddenModuleAttribute); });
  }
  function findNativeModule(sidebar, title) {
    const titleNode = [...sidebar.querySelectorAll("span, h2, h3")].find((node) => node.textContent.trim() === title);
    if (!titleNode) return null;
    if (titleNode.closest(`[${hiddenModuleAttribute}]`)) return null;
    for (let module = titleNode.parentElement; module && module !== sidebar; module = module.parentElement) {
      const text = module.textContent.trim();
      const hasProtectedContent = module.querySelector('input, [aria-label="Buscar"], [aria-label="Search"]') || /A quién seguir|Tendencias para ti|Deportes/.test(text);
      const hasOnlyTargetTitle = [...module.querySelectorAll("span, h2, h3")].filter((node) => node.textContent.trim() === title).length === 1;
      if (text.length > title.length && text.length < 1800 && hasOnlyTargetTitle && !hasProtectedContent) return module;
    }
    return null;
  }
  function hideNativeModules(sidebar) {
    if (!sidebar?.matches('[data-testid="sidebarColumn"]')) return;
    nativeModuleTitles.forEach((title) => {
      const module = findNativeModule(sidebar, title);
      if (module && !module.hidden) { module.hidden = true; module.setAttribute(hiddenModuleAttribute, "true"); }
    });
  }
  function removeUi() { document.getElementById(XGlobalTrendsUI.ROOT_ID)?.remove(); restoreNativeModules(); }
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
    if (!isSupportedRoute()) return removeUi(); const target = findTarget(); if (!target) return;
    const existing = document.getElementById(XGlobalTrendsUI.ROOT_ID);
    if (existing && target.contains(existing)) { XGlobalTrendsUI.setTheme(existing); hideNativeModules(target); return; }
    existing?.remove(); const root = XGlobalTrendsUI.create(); target.prepend(root); XGlobalTrendsUI.setTheme(root); hideNativeModules(target); initialize(root);
  }
  let scheduled = false; function scheduleEnsure() { if (scheduled) return; scheduled = true; requestAnimationFrame(() => { scheduled = false; ensureUi(); }); }
  new MutationObserver(scheduleEnsure).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
  window.addEventListener("popstate", scheduleEnsure); window.addEventListener("hashchange", scheduleEnsure); scheduleEnsure();
})();
