---
name: rule-ab-test
description: run A/B validation for one Cursor rule in a code repository. Use when ChatGPT needs to test whether a specific `.cursor/rules/*.mdc` file changes agent behavior by running the same prompt twice with the rule OFF and ON, saving raw outputs, generating notes, and updating `docs/technical/rule-validation.md` with an `effective`, `partially effective`, or `ineffective` verdict.
---

# Rule A/B Test

Use this skill to run a reproducible A/B test for one Cursor rule inside a repository.

## Inputs

Collect these inputs before starting:
- rule file path, for example `.cursor/rules/excalidraw-architecture.mdc`
- scenario name, for example `stateful`
- prompt text to use for both runs
- optional test date; default to today's date in `YYYY-MM-DD`

## Workflow

Run these steps in order.

1. Confirm the rule exists and that it is a single `.mdc` file.
2. Create a temporary prompt file containing the exact prompt text.
3. Scaffold the test directory and save `prompt.txt` by running:
   `python .cursor/skills/rule-ab-test/scripts/init_ab_test.py --rule "<rule>" --scenario "<scenario>" --prompt-file "<path-to-prompt-txt>"`
4. Record the generated test directory:
   `docs/technical/ab-tests/<rule-name>/<YYYY-MM-DD>-<scenario>/`
5. Rename the rule file from `.mdc` to `.mdc.off` to disable it.
6. Run the exact prompt with the rule OFF and save the full raw response to `result-A.txt`.
7. Rename the rule file back from `.mdc.off` to `.mdc` to enable it.
8. Run the exact same prompt with the rule ON and save the full raw response to `result-B.txt`.
9. Compare A and B. Judge only the selected rule's visible effect. Use the verdict guidance in `references/verdict-guidelines.md`.
10. Fill in `notes.md` using the exact headings from the template.
11. Update `docs/technical/rule-validation.md` by running:
    `python .cursor/skills/rule-ab-test/scripts/update_rule_validation.py --repo-root "<repo>" --rule-path "<rule>" --scenario-dir "<path-to-scenario-dir>" --result "<effective|partially effective|ineffective>" --summary "<short summary>"`
12. In the final response, report:
    - the generated files
    - the verdict
    - the short summary
    - any manual review needed

## Hard rules

- Test exactly one rule at a time.
- Keep the prompt identical between A and B.
- Save full raw outputs; do not summarize inside `result-A.txt` or `result-B.txt`.
- If the OFF or ON run fails, stop and report the failure instead of fabricating a verdict.
- Always restore the rule file to `.mdc` before finishing.
- Do not modify application code during this workflow.
- If A and B are too similar, report that honestly.
- Prefer `partially effective` over exaggerated claims.

## Output requirements

Each test directory must contain:
- `prompt.txt`
- `result-A.txt`
- `result-B.txt`
- `notes.md`

`notes.md` must contain these sections:
- `# Notes`
- `## Goal`
- `## Signals in A`
- `## Signals in B`
- `## Comparison`
- `## Verdict`
- `## Next step`

## Verdict rubric

Use these definitions consistently:
- `effective`: the rule causes a clear and meaningful improvement in architecture fit, safety, style, or documentation behavior.
- `partially effective`: the ON result is better, but only modestly or only on some dimensions.
- `ineffective`: there is no clear visible improvement attributable to the rule.

## Notes

Use this skill together with:
- `.cursor/commands/run-rule-ab-test.md`
- `docs/technical/rule-validation.md`

For verdict standards, consult:
- `references/verdict-guidelines.md`