---
description: Review code changes for architecture alignment, constraints, and hidden risks
---

# /review-code

Review the current code changes as a senior engineer for the Excalidraw codebase.

## Goals

- verify alignment with project architecture
- detect violations of `.cursor/rules/*.mdc`
- detect unsafe refactors in fragile areas
- detect hallucinated APIs, imports, or patterns
- identify documentation updates required

## Review checklist

### 1. Architecture
Check that:
- state updates go through `actionManager.dispatch()` where required
- no external state management libraries were introduced
- rendering logic follows existing canvas/render pipeline
- existing types and data flow are respected

### 2. Constraints and guardrails
Check that:
- protected files were not modified unsafely
- no undocumented behavior was broken
- no forbidden patterns were introduced
- no unapproved dependencies were added

### 3. Code conventions
Check that:
- components are functional components
- exports are named, not default
- typing is explicit and safe
- `any` and `@ts-ignore` are not used without strong justification

### 4. Testing and validation
Check that:
- affected tests were considered
- build/typecheck impact is understood
- follow-up verification steps are clear

### 5. Documentation
Check whether the change should update:
- `docs/memory/systemPatterns.md`
- `docs/technical/undocumented-behaviors.md`
- `docs/technical/code-archaeology-patterns.md`
- `docs/memory/progress.md`
- `docs/memory/decisionLog.md`

## Output format

Return these sections:

### Understanding
What changed and what area is affected.

### Findings
List:
- architecture violations
- rule violations
- hidden risks
- unclear assumptions
- possible hallucinations

### Required fixes
What must be changed before approval.

### Validation
What should be tested or verified manually.

### Docs impact
Which docs must be updated, if any.

## Important
Be strict.
Prefer grounded findings over speculative ones.
If the area touches hidden behavior, treat it as high risk.