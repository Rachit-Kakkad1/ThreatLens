import * as acorn from "acorn";

/**
 * JavaScript Syntax Checker
 * -------------------------
 * - Static only
 * - No execution
 * - Safe for untrusted code
 */
export function checkJavaScriptSyntax(code) {
  try {
    acorn.parse(code, {
      ecmaVersion: "latest",
      sourceType: "module",
    });

    return {
      valid: true,
      errors: [],
    };
  } catch (err) {
    return {
      valid: false,
      errors: [
        {
          type: "Syntax Error",
          severity: "LOW",
          message: err.message,
          location: {
            line: err.loc?.line ?? null,
            column: err.loc?.column ?? null,
          },
        },
      ],
    };
  }
}
