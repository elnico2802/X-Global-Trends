const XGlobalTrendsUI = (() => {
  const ROOT_ID = "x-global-trends-root";
  function create() {
    const root = document.createElement("section");
    root.id = ROOT_ID; root.setAttribute("aria-label", "X Global Trends");
    root.innerHTML = `<div class="xgt-panel"><div class="xgt-title">X Global Trends</div><div class="xgt-filters"><label>PAÍS<select class="xgt-country" disabled><option>Cargando países…</option></select></label><label>CATEGORÍA<select class="xgt-category" disabled><option>Todas</option></select></label></div><p class="xgt-status" aria-live="polite">Cargando países…</p><ol class="xgt-trends" hidden></ol></div>`;
    return root;
  }
  function showStatus(root, text) { root.querySelector(".xgt-status").textContent = text; root.querySelector(".xgt-trends").hidden = true; }
  function setCountries(root, locations, onChange) {
    const select = root.querySelector(".xgt-country");
    select.replaceChildren(...locations.map((location) => { const option = new Option(location.name, location.id); return option; }));
    select.disabled = false; select.addEventListener("change", () => onChange(locations.find((location) => location.id === select.value)));
  }
  function showTrends(root, result) {
    const list = root.querySelector(".xgt-trends");
    list.replaceChildren(...result.trends.map((trend) => { const item = document.createElement("li"); const link = document.createElement("a"); link.href = trend.searchUrl; link.target = "_self"; link.textContent = trend.name; item.append(link); return item; }));
    list.hidden = false; root.querySelector(".xgt-status").textContent = result.snapshot ? `Actualizado: ${new Date(result.snapshot).toLocaleString()}` : "Fuente: Trends24";
  }
  return { ROOT_ID, create, showStatus, setCountries, showTrends };
})();
