import js from "@eslint/js";
import globals from "globals";
// Si instalaste el plugin de cypress: npm install eslint-plugin-cypress --save-dev
// Si no lo tienes, comenta la línea del import y la del plugin más abajo.
import cypressPlugin from "eslint-plugin-cypress/flat"; 

export default [
  // 1. Reglas recomendadas de JS (El equivalente al antiguo "extends": "eslint:recommended")
  js.configs.recommended,

  // 2. Configuración de Cypress (Si usas el plugin)
  cypressPlugin.configs.recommended,

  // 3. Tu configuración personalizada
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser, // Reemplaza "browser": true
        ...globals.es2021,  // Reemplaza "es2021": true
        ...globals.node,    // Reemplaza "node": true (Agrega 'process', 'require', etc.)
        ...globals.jquery,  // Tu extra de jQuery
        ...globals.jest
      }
    },
    rules: {
      // Tus reglas de estilo
      "quotes": ["error", "double"],
      "brace-style": ["error", "1tbs"],
      "semi": ["error", "always"],
      
      // Opcional: si alguna vez cy o $ te molestan aunque los tengas en globals
      "no-undef": "error"
    },
    
  }
];