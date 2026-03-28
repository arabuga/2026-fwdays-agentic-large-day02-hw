---
description: Run an A/B validation for one Cursor rule and record the results
---

# /run-rule-ab-test

Use the `rule-ab-test` skill.

## Inputs
- `rule`: path to one rule file, for example `.cursor/rules/excalidraw-architecture.mdc`
- `scenario`: short scenario name, for example `stateful`
- `prompt`: the exact prompt text to use for both runs

## Required behavior

1. Validate that the target rule exists and is a single `.mdc` file.
2. Confirm `docs/technical/rule-validation.md` exists, or create it if missing.
3. Create a temporary prompt file and use the skill scaffold step to create:

   `docs/technical/ab-tests/<rule-name>/<YYYY-MM-DD>-<scenario>/`

4. Save the exact prompt into `prompt.txt`.
5. Run **Result A**:
   - disable only the target rule by renaming:
     - `.mdc` -> `.mdc.off`
   - run the exact prompt through the agent
   - save the full raw output to `result-A.txt`
   - do not summarize or shorten it

6. Run **Result B**:
   - restore the rule:
     - `.mdc.off` -> `.mdc`
   - run the exact same prompt again
   - save the full raw output to `result-B.txt`
   - do not summarize or shorten it

7. Compare A and B using the rule’s intended failure mode and success signals.
8. Create `notes.md` with:
   - Goal
   - Signals in A
   - Signals in B
   - Comparison
   - Verdict: `effective`, `partially effective`, or `ineffective`
   - Next step

9. Update `docs/technical/rule-validation.md` with:
   - rule name
   - scenario
   - relative links to `prompt.txt`, `result-A.txt`, `result-B.txt`, `notes.md`
   - verdict
   - short summary

## Rules
- test exactly one rule at a time
- keep the prompt identical for A and B
- store full raw outputs without shortening or paraphrasing
- do not modify application code
- if the rule rename fails, stop and report the issue
- if A and B are too similar, report that honestly
- prefer `partially effective` over exaggerated claims

## Output
Return:
- created folder path
- files written
- verdict
- short summary
- any manual review needed