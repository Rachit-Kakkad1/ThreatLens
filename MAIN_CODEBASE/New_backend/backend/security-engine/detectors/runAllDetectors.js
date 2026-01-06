// backend/security-engine/syntax/detectors/runAllDetectors.js

import { detectSQLInjection } from "./sqlInjection.js";
import { detectXSS } from "./xss.js";
import { detectHardcodedSecrets } from "./hardcodedSecrets.js";

export function runAllDetectors(normalizedInput) {
  const findings = [];

  try {
    findings.push(...detectSQLInjection(normalizedInput));
  } catch {}

  try {
    findings.push(...detectXSS(normalizedInput));
  } catch {}

  try {
    findings.push(...detectHardcodedSecrets(normalizedInput));
  } catch {}

  return findings;
}
