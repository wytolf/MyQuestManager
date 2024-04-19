import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions:
      {
        globals: globals.browser
      },
      ignores: [
        ".angular/*",
        "node_modules/",
        ".idea/",
        ".vscode/",
        "karma.conf.js"
      ],
    },
  ...tseslint.configs.recommended,
];
