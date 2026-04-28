const { formatSearchResults, normalizeColorInput } = require("../public/js/color-utils");

describe("color utils", () => {
  test("normalizes color input", () => {
    expect(normalizeColorInput("  Blue  ")).toBe("Blue");
    expect(normalizeColorInput(null)).toBe("");
  });

  test("formats search results as HTML breaks", () => {
    expect(formatSearchResults(["Red", "Green", "Blue"])).toBe("Red<br>\r\nGreen<br>\r\nBlue");
  });
});
