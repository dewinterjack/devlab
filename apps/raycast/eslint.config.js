import baseConfig, { restrictEnvAccess } from "@devlab/eslint-config/base";
import raycastConfig from "@devlab/eslint-config/raycast";
import reactConfig from "@devlab/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  ...raycastConfig,
  ...restrictEnvAccess,
];
