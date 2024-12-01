import raycastPlugin from "@raycast/eslint-config";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@raycast/raycast": raycastPlugin,
    },
    rules: {
      ...raycastPlugin.configs.recommended.rules,
    },
  },
];
