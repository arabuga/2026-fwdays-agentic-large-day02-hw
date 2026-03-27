# A/B test layout

Use this directory layout:

```text
docs/
  technical/
    rule-validation.md
    ab-tests/
      <rule-name-without-extension>/
        <YYYY-MM-DD>-<scenario>/
          prompt.txt
          result-A.txt
          result-B.txt
          notes.md
```

Naming rules:
- directory name for the rule should drop the `.mdc` extension
- keep scenario names short and lowercase with hyphens if needed
- store full raw model outputs in the result files
