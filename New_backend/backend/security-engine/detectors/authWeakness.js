/**
 * Detects authentication weaknesses and sensitive data exposure.
 */
export function detectAuthWeakness(content) {
  const findings = [];
  const lines = content.split('\n');

  const PATTERNS = [
    {
      name: "Weak Hashing Algorithm",
      regex: /crypto\.createHash\(['"](md5|sha1)['"]\)/i,
      severity: "Medium",
      description: "MD5 and SHA1 are considered weak hashing algorithms. Use SHA256 or better."
    },
    {
      name: "Hardcoded JWT Secret",
      regex: /jwt\.sign\s*\([^,]+,\s*['"][a-zA-Z0-9_]+['"]\)/,
      severity: "High",
      description: "Hardcoded JWT secrets are a major security risk. Use environment variables."
    },
    {
      name: "Basic Authentication",
      regex: /Authorization:\s*['"]Basic\s+/,
      severity: "Low",
      description: "Basic Authentication transmits credentials in base64. Ensure this is used over HTTPS only."
    },
    {
      name: "Insecure Randomness",
      regex: /Math\.random\(\)/,
      severity: "Low",
      description: "Math.random() is not cryptographically secure. Use crypto.randomBytes() for security-critical values."
    },
    {
        name: "Hardcoded API Key",
        regex: /(api_key|apikey|secret_key|auth_token)\s*[:=]\s*['"][a-zA-Z0-9_\-]{20,}['"]/i,
        severity: "Critical",
        description: "Potential hardcoded API key or secret detected."
    }
  ];

  lines.forEach((line, index) => {
    PATTERNS.forEach(pattern => {
      if (pattern.regex.test(line)) {
        findings.push({
          type: pattern.name,
          severity: pattern.severity,
          description: pattern.description,
          location: { line: index + 1, column: 0 }
        });
      }
    });
  });

  return findings;
}
