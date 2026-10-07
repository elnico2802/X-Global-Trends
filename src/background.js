const CACHE_TTL_MS = 7 * 60 * 1000;
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "TRENDS24_FETCH" || typeof message.url !== "string") return;
  fetchPage(message.url).then((html) => sendResponse({ ok: true, html }))
    .catch((error) => sendResponse({ ok: false, code: error.code || "network" }));
  return true;
});
async function fetchPage(url) {
  const cacheKey = `trends24:${url}`;
  const cached = (await chrome.storage.local.get(cacheKey))[cacheKey];
  if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS) return cached.html;
  let response;
  try { response = await fetch(url, { cache: "no-store" }); }
  catch { const error = new Error("Network error"); error.code = "network"; throw error; }
  if (!response.ok) { const error = new Error(`Trends24 returned ${response.status}`); error.code = response.status >= 500 ? "unavailable" : "source"; throw error; }
  const html = await response.text();
  await chrome.storage.local.set({ [cacheKey]: { html, savedAt: Date.now() } });
  return html;
}
