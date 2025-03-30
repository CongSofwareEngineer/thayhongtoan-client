import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "off",
      "jsx-a11y/alt-text": "off",
      "react/jsx-key": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "no-unused-expressions": "off",
      "no-unsafe-optional-chaining": "off",
      "no-case-declarations": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-empty": "off",
      "no-unused-vars": "warn"
    },
  }
];

export default eslintConfig;
