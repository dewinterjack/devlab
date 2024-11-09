import baseConfig, { restrictEnvAccess } from "@devlab/eslint-config/base";
import nextjsConfig from "@devlab/eslint-config/nextjs";
import reactConfig from "@devlab/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
