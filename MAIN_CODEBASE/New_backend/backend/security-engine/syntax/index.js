import { checkJavaScriptSyntax } from "./jsSyntax.js";
import { runAllDetectors } from "./detectors/runAllDetectors.js";

export function analyzeInput({ inputType, content, language }) {
  const start = Date.now();

  /* ===============================
   * STEP 0: JS SYNTAX CHECK
   * =============================== */
  if (inputType === "code" && (language === "js" || language === "javascript")) {
    const syntax = checkJavaScriptSyntax(content);

    if (!syntax.valid) {
      return {
        vulnerabilities: syntax.errors.map(e => ({
          type: e.type,
          severity: e.severity,
          description: e.message,
          location: e.location,
        })),
        attackerView: [],
        defenderFixes: [],
        payloads: [],
        impactAnalysis: [],
        processingTime: Date.now() - start,
      };
    }
  }

  /* ===============================
   * STEP 1: SECURITY DETECTORS
   * =============================== */
  const normalizedInput = {
    type: inputType,
    raw: content,
  };

  const vulnerabilities = runAllDetectors(normalizedInput);

  return {
    vulnerabilities,
    attackerView: [],
    defenderFixes: [],
    payloads: [],
    impactAnalysis: [],
    processingTime: Date.now() - start,
  };
}
