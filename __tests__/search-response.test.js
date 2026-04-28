const { parseSearchResponse } = require("../public/js/color-utils");

describe("search response contract", () => {
  test("accepts the COLORS search API JSON shape", () => {
    const response = parseSearchResponse('{"results":["Red","Blue"],"error":""}');

    expect(response).toEqual({
      results: ["Red", "Blue"],
      error: ""
    });
  });

  test("rejects malformed API responses", () => {
    expect(() => parseSearchResponse('{"error":""}')).toThrow("Invalid search response");
  });
});
