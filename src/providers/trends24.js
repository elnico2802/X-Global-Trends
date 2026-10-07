const Trends24Provider = (() => {
  const ORIGIN = "https://trends24.in";
  function fetchHtml(url) { return new Promise((resolve, reject) => chrome.runtime.sendMessage({ type: "TRENDS24_FETCH", url }, (response) => {
    if (chrome.runtime.lastError || !response?.ok) reject({ code: response?.code || "network" }); else resolve(response.html);
  })); }
  function parseDocument(html) { return new DOMParser().parseFromString(html, "text/html"); }
  function safeUrl(href) { try { const url = new URL(href, ORIGIN); return url.origin === ORIGIN ? url.href : null; } catch { return null; } }
  async function getLocations() {
    const doc = parseDocument(await fetchHtml(`${ORIGIN}/location-menu.html`));
    const countries = [...doc.querySelectorAll(".location-group")].flatMap((group) => {
      const name = group.querySelector(".country-title h3")?.textContent.trim();
      const anchor = group.querySelector(".location-list a.location-item[href]");
      const url = anchor && safeUrl(anchor.getAttribute("href"));
      const pathDepth = url ? new URL(url).pathname.split("/").filter(Boolean).length : 0;
      // Each group begins with the country; following links are its cities.
      return name && name !== "Worldwide" && url && pathDepth === 1 && anchor.textContent.trim() === name
        ? [{ id: url, name, url }]
        : [];
    });
    if (!countries.length) throw { code: "source" };
    return [{ id: "global", name: "🌎 Global", url: `${ORIGIN}/` }, ...countries.sort((a, b) => a.name.localeCompare(b.name, "en"))];
  }
  function parseTrends(html) {
    const doc = parseDocument(html);
    const candidates = [...doc.querySelectorAll(".trend-card__list, ol, ul")].map((list) => [...list.children].filter((item) => item.matches("li"))).filter((items) => items.length >= 2).sort((a, b) => b.length - a.length);
    const trends = (candidates[0] || []).map((item, index) => {
      const anchor = item.querySelector("a[href]"); const name = (anchor?.textContent || item.textContent).trim().replace(/\s+/g, " "); if (!name) return null;
      const externalUrl = anchor?.href || ""; const host = new URL(externalUrl || ORIGIN, ORIGIN).hostname;
      const searchUrl = /(^|\.)((x|twitter)\.com)$/i.test(host) ? externalUrl.replace(/^https:\/\/twitter\.com/i, "https://x.com") : `https://x.com/search?q=${encodeURIComponent(name)}&src=typed_query`;
      return { rank: index + 1, name, searchUrl };
    }).filter(Boolean);
    return { trends, snapshot: doc.querySelector("time[datetime]")?.getAttribute("datetime") || null };
  }
  async function getTrends(location) { const parsed = parseTrends(await fetchHtml(location.url)); if (!parsed.trends.length) throw { code: "empty" }; return parsed; }
  return { getLocations, getTrends };
})();
