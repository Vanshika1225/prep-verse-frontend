import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "coverage", "*.config.js", "*.config.ts"],
  },

  js.configs.recommended,

...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.app.json", // or "./tsconfig.json"
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "unused-imports": unusedImports,
      "jsx-a11y": jsxA11y,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      /*
       * Typescript
       */

      "@typescript-eslint/no-explicit-any": "error",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      "@typescript-eslint/no-unused-vars": "off",

      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      "@typescript-eslint/no-inferrable-types": "error",

      "@typescript-eslint/no-empty-function": "error",

      "@typescript-eslint/no-non-null-assertion": "warn",

      "@typescript-eslint/no-unnecessary-type-assertion": "error",

      "@typescript-eslint/prefer-nullish-coalescing": "error",

      "@typescript-eslint/prefer-optional-chain": "error",

      /*
       * React
       */

      "react/react-in-jsx-scope": "off",

      "react/jsx-uses-react": "off",

      "react/self-closing-comp": "error",

      "react/jsx-boolean-value": ["error", "never"],

      "react/jsx-no-useless-fragment": "error",

      /*
       * Hooks
       */

      ...reactHooks.configs.recommended.rules,

      /*
       * React Refresh
       */

      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      /*
       * Imports
       */

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
          },
        },
      ],

      /*
       * Unused Imports
       */

      "unused-imports/no-unused-imports": "error",

      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      /*
       * Accessibility
       */

      "jsx-a11y/alt-text": "error",

      "jsx-a11y/anchor-is-valid": "error",

      /*
       * Best Practices
       */

      eqeqeq: ["error", "always"],

      curly: ["error", "all"],

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],

      "no-debugger": "error",

      "prefer-const": "error",

      "no-var": "error",

      "object-shorthand": "error",

      "prefer-template": "error",

      "no-duplicate-imports": "error",

      "no-unneeded-ternary": "error",
    },
  },

  prettier,
);
