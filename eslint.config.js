const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: ["node_modules/**", "public/js/md5.js"]
  },
  {
    ...js.configs.recommended,
    files: ["public/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      sourceType: "script"
    },
    rules: {
      ...js.configs.recommended.rules,
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error"
    }
  }
];
