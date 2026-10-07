const XGlobalTrendsUI = (() => {
  const ROOT_ID = "x-global-trends-root";
  const globeIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5S14.3 18.1 12 20.5C9.7 18.1 8.6 15.3 8.6 12S9.7 5.9 12 3.5"/><path d="m13.5 15 2-2 1.8 1.8 3.3-4"/></svg>`;
  const xIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2.8h3.7l-8.1 9.3 9.5 9.1h-7.4l-5.8-5.5-4.8 5.5H2.3l8.6-9.8-9.1-8.6h7.6l5.3 5 4.4-5ZM17.6 19l2.1-.1L8.2 4.8H6l11.6 14.2Z"/></svg>`;
  function create() {
    const root = document.createElement("section");
    root.id = ROOT_ID; root.setAttribute("aria-label", "X Global Trends");
    root.innerHTML = `<div class="xgt-panel"><header class="xgt-header"><div class="xgt-brand"><span class="xgt-globe">${globeIcon}</span><span>X Global Trends</span></div><a class="xgt-profile" href="https://x.com/NicoAguilarUY" aria-label="Perfil de @NicoAguilarUY en X">${xIcon}</a></header><div class="xgt-filters"><label>PAÍS<select class="xgt-country" disabled><option>Cargando países…</option></select></label></div><p class="xgt-status" aria-live="polite">Cargando países…</p><ol class="xgt-trends" hidden></ol></div>`;
    return root;
  }
  function showStatus(root, text) { root.querySelector(".xgt-status").textContent = text; root.querySelector(".xgt-trends").hidden = true; }
  function setCountries(root, locations, onChange) {
    const select = root.querySelector(".xgt-country");
    select.replaceChildren(...locations.map((location) => new Option(location.displayName, location.id)));
    select.disabled = false; select.addEventListener("change", () => onChange(locations.find((location) => location.id === select.value)));
  }
  function showTrends(root, result) {
    const list = root.querySelector(".xgt-trends");
    list.replaceChildren(...result.trends.map((trend) => { const item = document.createElement("li"); const link = document.createElement("a"); link.href = trend.searchUrl; link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = trend.name; item.append(link); return item; }));
    list.hidden = false; root.querySelector(".xgt-status").textContent = result.snapshot ? `Actualizado: ${new Date(result.snapshot).toLocaleString()}` : "Fuente: Trends24";
  }
  function setTheme(root) {
    const background = getComputedStyle(document.body).backgroundColor.match(/\d+/g)?.map(Number) || [255, 255, 255];
    root.classList.toggle("xgt-dark", background.slice(0, 3).reduce((sum, channel) => sum + channel, 0) < 180);
  }
  return { ROOT_ID, create, showStatus, setCountries, showTrends, setTheme };
})();
