const XGlobalTrendsUI = (() => {
  const ROOT_ID = "x-global-trends-root";

  function create(onSelect) {
    const root = document.createElement("section");
    root.id = ROOT_ID;
    root.setAttribute("aria-label", "X Global Trends (demostración)");

    const panel = document.createElement("div");
    panel.className = "xgt-panel";
    const title = document.createElement("div");
    title.className = "xgt-title";
    title.textContent = "X Global Trends";
    const demo = document.createElement("span");
    demo.className = "xgt-demo";
    demo.textContent = "DEMO — datos MOCK";
    title.append(demo);

    const controls = document.createElement("div");
    controls.className = "xgt-controls";
    controls.setAttribute("role", "tablist");
    const trends = document.createElement("p");
    trends.className = "xgt-preview";
    trends.setAttribute("aria-live", "polite");

    let activeId = "global";
    const buttons = new Map();
    for (const mode of XGlobalTrendsData.modes) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "xgt-mode";
      button.textContent = mode.label;
      button.setAttribute("role", "tab");
      button.addEventListener("click", () => select(mode.id));
      buttons.set(mode.id, button);
      controls.append(button);
    }

    function select(id) {
      activeId = id;
      for (const [modeId, button] of buttons) {
        const selected = modeId === activeId;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", String(selected));
      }
      trends.textContent = `DEMO: ${XGlobalTrendsData.mockTrends[id].join(" · ")}`;
      onSelect?.(id);
    }

    panel.append(title, controls, trends);
    root.append(panel);
    select(activeId);
    return root;
  }

  return { ROOT_ID, create };
})();
