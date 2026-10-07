(() => {
  const isSupportedRoute = () => location.pathname === "/home" || location.pathname === "/explore" || location.pathname.startsWith("/explore/");
  const findTarget = () => document.querySelector('[data-testid="sidebarColumn"]') || document.querySelector('main [data-testid="primaryColumn"]');
  const selectedLocationKey = "xgt:selected-location";
  const loadTokens = new WeakMap();
  const hiddenModuleAttribute = "data-xgt-hidden-module";
  const previousDisplayAttribute = "data-xgt-previous-display";
  const previousDisplayPriorityAttribute = "data-xgt-previous-display-priority";
  const nativeModuleTitles = ["Actualizar a Premium+", "En directo en X"];
  function restoreNativeModules() {
    document.querySelectorAll(`[${hiddenModuleAttribute}]`).forEach((module) => {
      const previousDisplay = module.getAttribute(previousDisplayAttribute);
      const previousPriority = module.getAttribute(previousDisplayPriorityAttribute);
      if (previousDisplay) module.style.setProperty("display", previousDisplay, previousPriority || "");
      else module.style.removeProperty("display");
      module.removeAttribute(hiddenModuleAttribute);
      module.removeAttribute(previousDisplayAttribute);
      module.removeAttribute(previousDisplayPriorityAttribute);
    });
  }
  function findExactTitleNode(root, title) {
    const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = textWalker.nextNode())) if (textNode.nodeValue.trim() === title) return textNode.parentElement;
    return null;
  }
  function countExactTitleNodes(root, title) {
    const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let count = 0; let textNode;
    while ((textNode = textWalker.nextNode())) if (textNode.nodeValue.trim() === title) count += 1;
    return count;
  }
  function findNativeModule(sidebar, title) {
    const titleNode = findExactTitleNode(sidebar, title);
    if (!titleNode) return null;
    if (titleNode.closest(`[${hiddenModuleAttribute}]`)) return null;
    for (let module = titleNode.parentElement; module && module !== sidebar; module = module.parentElement) {
      const text = module.textContent.trim();
      const hasProtectedContent = module.querySelector('input, [aria-label="Buscar"], [aria-label="Search"]') || /A quién seguir|Tendencias para ti|Deportes/.test(text);
      const hasOnlyTargetTitle = countExactTitleNodes(module, title) === 1;
      if (text.length > title.length && hasOnlyTargetTitle && !hasProtectedContent) return module;
    }
    return null;
  }
  function hideNativeModules(sidebar) {
    if (!sidebar?.matches('[data-testid="sidebarColumn"]')) return;
    nativeModuleTitles.forEach((title) => {
      const module = findNativeModule(sidebar, title);
      if (module && !module.hasAttribute(hiddenModuleAttribute)) {
        module.setAttribute(previousDisplayAttribute, module.style.getPropertyValue("display"));
        module.setAttribute(previousDisplayPriorityAttribute, module.style.getPropertyPriority("display"));
        module.style.setProperty("display", "none", "important");
        module.setAttribute(hiddenModuleAttribute, "true");
      }
    });
  }
  function findSearchAnchor(sidebar) {
    const input = sidebar.querySelector('input[data-testid="SearchBox_Search_Input"]');
    if (!input) return null;
    let anchor = input.closest("form") || input;
    for (let node = anchor; node && node !== sidebar; node = node.parentElement) {
      const position = getComputedStyle(node).position;
      if (position === "sticky" || position === "fixed") return node;
    }
    while (anchor.parentElement && anchor.parentElement !== sidebar && anchor.parentElement.children.length === 1) anchor = anchor.parentElement;
    return anchor;
  }
  function placeRoot(root, target) {
    const searchAnchor = target.matches('[data-testid="sidebarColumn"]') && findSearchAnchor(target);
    if (searchAnchor) {
      if (searchAnchor.nextElementSibling !== root) searchAnchor.after(root);
    } else if (root.parentElement !== target || target.firstElementChild !== root) {
      target.prepend(root);
    }
  }
  function removeUi() { document.getElementById(XGlobalTrendsUI.ROOT_ID)?.remove(); restoreNativeModules(); }
  async function loadTrends(root, location) {
    const token = (loadTokens.get(root) || 0) + 1;
    loadTokens.set(root, token);
    XGlobalTrendsUI.showStatus(root, "Cargando tendencias…");
    try {
      const result = await Trends24Provider.getTrends(location);
      if (loadTokens.get(root) === token) XGlobalTrendsUI.showTrends(root, result);
    }
    catch (error) {
      if (loadTokens.get(root) === token) XGlobalTrendsUI.showStatus(root, ({ empty: "Sin tendencias disponibles", unavailable: "Fuente temporalmente no disponible", network: "Error de conexión", source: "Fuente temporalmente no disponible" })[error?.code] || "Fuente temporalmente no disponible");
    }
  }
  async function initialize(root) {
    try {
      const locations = XGlobalTrendsData.localizeLocations(await Trends24Provider.getLocations());
      const global = locations.find((location) => location.id === "global");
      const storedId = (await chrome.storage.local.get(selectedLocationKey))[selectedLocationKey];
      const selectedLocation = locations.find((location) => location.id === storedId) || global;
      if (storedId && storedId !== selectedLocation.id) await chrome.storage.local.set({ [selectedLocationKey]: selectedLocation.id });
      XGlobalTrendsUI.setCountries(root, locations, selectedLocation.id, async (location) => {
        await chrome.storage.local.set({ [selectedLocationKey]: location.id });
        loadTrends(root, location);
      });
      await loadTrends(root, selectedLocation);
    }
    catch (error) { XGlobalTrendsUI.showStatus(root, error?.code === "network" ? "Error de conexión" : "Fuente temporalmente no disponible"); }
  }
  function ensureUi() {
    if (!isSupportedRoute()) return removeUi(); const target = findTarget(); if (!target) return;
    const existing = document.getElementById(XGlobalTrendsUI.ROOT_ID);
    if (existing && target.contains(existing)) { placeRoot(existing, target); XGlobalTrendsUI.setTheme(existing); hideNativeModules(target); return; }
    existing?.remove(); const root = XGlobalTrendsUI.create(); placeRoot(root, target); XGlobalTrendsUI.setTheme(root); hideNativeModules(target); initialize(root);
  }
  let scheduled = false; function scheduleEnsure() { if (scheduled) return; scheduled = true; requestAnimationFrame(() => { scheduled = false; ensureUi(); }); }
  new MutationObserver(scheduleEnsure).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
  window.addEventListener("popstate", scheduleEnsure); window.addEventListener("hashchange", scheduleEnsure); scheduleEnsure();
})();
