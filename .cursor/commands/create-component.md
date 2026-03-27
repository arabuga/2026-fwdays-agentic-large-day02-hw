---
description: Create a new component following Excalidraw architecture, conventions, and safety rules
---

# /create-component

Create a new component for the Excalidraw codebase following project architecture and code conventions.

## Requirements

### Architecture
- do not introduce Redux, Zustand, MobX, or other external state managers
- use existing Excalidraw patterns
- respect current rendering and interaction flow
- use existing types where possible

### Component conventions
- use functional components only
- use named exports only
- define props as `<ComponentName>Props`
- keep the component focused and minimal
- colocate tests when appropriate

### TypeScript
- use strict typing
- do not use `any`
- do not use `@ts-ignore`
- prefer `type` for simple aliases
- use `import type { ... }` where appropriate

### Safety
- do not modify protected files unless explicitly required
- do not introduce new dependencies without approval
- do not invent APIs that do not exist in the codebase
- if the task touches unfamiliar code, first use codebase exploration

## Process

1. Identify the correct target location for the component
2. Inspect nearby components for existing patterns
3. Reuse existing types, helpers, and conventions
4. Generate the component
5. Note what tests and docs may need updates

## Output format

Return:

### Proposed location
Where the component should live.

### Component code
The implementation.

### Notes
- dependencies reused
- patterns followed
- assumptions made

### Follow-up
- suggested tests
- docs updates if relevant

## Important
Match the existing project style.
Do not optimize by introducing foreign architectural patterns.
When uncertain, prefer consistency over novelty.