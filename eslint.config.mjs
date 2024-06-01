// eslint.config.mjs
import pluginJs from "@eslint/js";
import globals from "globals";
import tse from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    languageOptions: {
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tse,
      prettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tse.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "no-unused-expressions": "error",
      "no-unused-vars": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
];
