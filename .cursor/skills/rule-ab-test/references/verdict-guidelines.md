
```md
# Verdict Guidelines

Use these standards when deciding the final A/B verdict.

## Effective

Choose `effective` when the ON result shows clear, meaningful improvement in the rule’s intended area.

Typical signs:
- visibly fewer failure modes
- stronger project-specific behavior
- better alignment with architecture, constraints, or docs
- clearer caution in fragile areas
- better routing to the correct doc layer
- the difference is obvious, not subtle

Use `effective` only when the rule clearly changes behavior in the intended direction.

---

## Partially Effective

Choose `partially effective` when the ON result is better, but only moderately.

Typical signs:
- some improvement is visible
- the model still shows some generic behavior
- the result is more cautious, but not dramatically
- the rule helps, but does not fully control the failure mode
- A and B differ, but not strongly

When unsure, prefer `partially effective`.

---

## Ineffective

Choose `ineffective` when the ON result is nearly the same as the OFF result or the rule does not clearly improve the intended behavior.

Typical signs:
- A and B are nearly identical
- the same failure mode appears in both
- the rule does not noticeably change structure, caution, or correctness
- improvements are too weak to attribute confidently to the rule

---

## Review questions

Ask:

1. Did the rule reduce the specific failure mode it was supposed to address?
2. Did the ON run show clearer alignment with the project’s rules or architecture?
3. Is the difference obvious enough that another reviewer would agree?
4. Is the verdict based on concrete signals, not a vague impression?

---

## Notes writing guidance

In `notes.md`, always include:

- the rule goal
- what failure mode was expected without the rule
- concrete signals from Result A
- concrete signals from Result B
- a short comparison
- the final verdict
- the next step if the rule should be refined