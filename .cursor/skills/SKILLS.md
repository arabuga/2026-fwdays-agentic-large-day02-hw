# Skills

## rule-ab-test
Path: `.cursor/skills/rule-ab-test`

When:
- validate whether one Cursor rule actually changes agent behavior
- compare the same prompt with the rule OFF and ON
- save full raw outputs for both runs
- generate `notes.md`
- update `docs/technical/rule-validation.md`

Trigger:
- A/B test
- rule validation
- validate rule effectiveness
- compare rule off vs on
- test one rule at a time

Inputs:
- rule path
- scenario name
- prompt text

Outputs:
- `docs/technical/ab-tests/<rule>/<date>-<scenario>/prompt.txt`
- `docs/technical/ab-tests/<rule>/<date>-<scenario>/result-A.txt`
- `docs/technical/ab-tests/<rule>/<date>-<scenario>/result-B.txt`
- `docs/technical/ab-tests/<rule>/<date>-<scenario>/notes.md`
- updated `docs/technical/rule-validation.md`