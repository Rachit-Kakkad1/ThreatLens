/**
 * Detects insecure dependencies in package.json content.
 */
export function detectInsecureDependencies(content, inputType) {
  const findings = [];
  
  // Only analyze if input is config/json and looks like package.json
  if (inputType !== "config" && inputType !== "json") return findings;
  
  let packageJson;
  try {
    packageJson = JSON.parse(content);
  } catch (e) {
    return findings; // Not valid JSON, skip
  }

  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  // Known vulnerable packages (simplified database)
  const VULNERABLE_PACKAGES = {
    "express": { 
      version: "4.17.1", // simplified check: anything below this is flagged (logic below needs to be robust)
      severity: "High", 
      message: "Versions of Express < 4.17.1 are vulnerable to open redirect." 
    },
    "lodash": { 
      version: "4.17.21", 
      severity: "Medium", 
      message: "Lodash < 4.17.21 is vulnerable to Command Injection via template." 
    },
    "axios": {
      version: "0.21.1",
      severity: "Medium",
      message: "Axios < 0.21.1 has SSRF vulnerabilities."
    },
    "jsonwebtoken": {
        version: "8.5.1",
        severity: "High",
        message: "Old versions of jsonwebtoken have verification bypass issues."
    }
  };

  for (const [pkg, version] of Object.entries(dependencies)) {
    if (VULNERABLE_PACKAGES[pkg]) {
      // Very basic version check - in real world use semver
      // This assumes the version string might contain caret or tilde
      const cleanVersion = version.replace(/[\^~]/g, '');
      const secureVersion = VULNERABLE_PACKAGES[pkg].version;
      
      // Compare versions (simple string comparison for MVP, ideally use semver package)
      if (cleanVersion < secureVersion) {
         findings.push({
          type: "Insecure Dependency",
          severity: VULNERABLE_PACKAGES[pkg].severity,
          description: `Vulnerable version of ${pkg} detected (${version}). ${VULNERABLE_PACKAGES[pkg].message}`,
          location: { line: 0, column: 0 } // JSON location hard to pinpoint without AST, defaulting to 0
        });
      }
    }
  }

  return findings;
}
