const Trends24Provider = (() => {
  const ORIGIN = "https://trends24.in";
  const normalized = (value) => value.trim().replace(/\s+/g, " ").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase();
  // ISO 3166-1 codes only identify links already published by Trends24; they do
  // not declare that the provider supports any particular country.
  const ISO_COUNTRY_CODES = "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ");
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const COUNTRY_NAMES = new Set(ISO_COUNTRY_CODES.map((code) => normalized(regionNames.of(code))));
  function fetchHtml(url) { return new Promise((resolve, reject) => chrome.runtime.sendMessage({ type: "TRENDS24_FETCH", url }, (response) => {
    if (chrome.runtime.lastError || !response?.ok) reject({ code: response?.code || "network" }); else resolve(response.html);
  })); }
  function parseDocument(html) { return new DOMParser().parseFromString(html, "text/html"); }
  function safeUrl(href) { try { const url = new URL(href, ORIGIN); return url.origin === ORIGIN ? url.href : null; } catch { return null; } }
  async function getLocations() {
    const doc = parseDocument(await fetchHtml(`${ORIGIN}/`));
    const locations = new Map(); let worldwide = null;
    for (const anchor of doc.querySelectorAll("a[href]")) {
      const name = anchor.textContent.trim().replace(/\s+/g, " "); const url = safeUrl(anchor.getAttribute("href")); if (!name || !url) continue;
      const key = normalized(name);
      if (key === "worldwide" || key === "world wide") worldwide = { id: "global", name: "🌎 Global", url };
      else if (COUNTRY_NAMES.has(key) && !locations.has(key)) locations.set(key, { id: key, name, url });
    }
    if (!worldwide) throw { code: "source" };
    return [worldwide, ...[...locations.values()].sort((a, b) => a.name.localeCompare(b.name, "en"))];
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
