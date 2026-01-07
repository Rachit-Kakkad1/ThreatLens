function decideGraphVisible(engineDecision, syntax) {
  const halted = engineDecision === "HALTED_AT_SYNTAX_STAGE";
  const invalid = !!syntax && syntax.valid === false;
  return !(halted || invalid);
}

function assert(name, cond) {
  console.log(`${cond ? "PASS" : "FAIL"}: ${name}`);
  if (!cond) process.exitCode = 1;
}

assert("Graph hidden on HALTED", decideGraphVisible("HALTED_AT_SYNTAX_STAGE", { valid: false }) === false);
assert("Graph hidden on invalid syntax", decideGraphVisible("COMPLETED", { valid: false }) === false);
assert("Graph visible on valid syntax", decideGraphVisible("COMPLETED", { valid: true }) === true);
assert("Graph visible when syntax missing but completed", decideGraphVisible("COMPLETED") === true);
assert("Graph hidden when halted but syntax missing", decideGraphVisible("HALTED_AT_SYNTAX_STAGE") === false);
