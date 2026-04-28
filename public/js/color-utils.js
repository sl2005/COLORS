/* global module */
(function attachColorUtils(root, factory) {
  const api = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  root.ColorUtils = api;
}(typeof window !== "undefined" ? window : globalThis, () => {
  function normalizeColorInput(value) {
    return String(value ?? "").trim();
  }

  function formatSearchResults(results) {
    return results.join("<br>\r\n");
  }

  function parseSearchResponse(responseText) {
    const parsed = JSON.parse(responseText);

    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.results) || typeof parsed.error !== "string") {
      throw new Error("Invalid search response");
    }

    return parsed;
  }

  return {
    normalizeColorInput,
    formatSearchResults,
    parseSearchResponse
  };
}));
