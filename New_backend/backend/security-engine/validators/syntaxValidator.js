import * as acorn from "acorn";

/**
 * Validates JavaScript code syntax using Acorn parser.
 * Returns detailed error information if syntax is invalid.
 * 
 * @param {string} code - The JavaScript code to validate
 * @returns {Object} - Result object { valid: boolean, errors: Array }
 */
export function validateSyntax(code) {
  if (!code || typeof code !== 'string') {
    return { valid: true, errors: [] }; // Empty code is syntactically valid or handled elsewhere
  }

  try {
    acorn.parse(code, { 
      ecmaVersion: "latest", 
      locations: true,
      sourceType: "module" 
    });
    return { valid: true, errors: [] };
  } catch (err) {
    // Enhance error message with suggested fixes for common issues
    let suggestion = "Check your syntax.";
    if (err.message.includes("Unexpected token")) {
      suggestion = "You might be missing a bracket, parenthesis, or semicolon. Check the code around the error line.";
    } else if (err.message.includes("Identifier directly after number")) {
      suggestion = "Variable names cannot start with numbers.";
    } else if (err.message.includes("Unterminated string")) {
      suggestion = "You have an unclosed string literal. Add a quote.";
    }

    return {
      valid: false,
      errors: [
        {
          line: err.loc ? err.loc.line : 0,
          column: err.loc ? err.loc.column : 0,
          message: err.message.replace(/\s*\(\d+:\d+\)$/, ""), // Remove line info from message as we have it separately
          type: "SyntaxError",
          suggestion: suggestion
        }
      ]
    };
  }
}
