# Progress

## Current status

- **Last reviewed:** 2026-03-26
- **Memory Bank:** roles clarified in [`README.md`](README.md); duplication reduced (`techContext.md` owns versions and commands).
- **Behavior docs:** snapshot semantics are now split by role:
  - operational summary in [`systemPatterns.md`](systemPatterns.md)
  - detailed behavior in [`../technical/undocumented-behaviors.md`](../technical/undocumented-behaviors.md)
  - reusable investigation heuristics in [`../technical/code-archaeology-patterns.md`](../technical/code-archaeology-patterns.md)
- **Open:** placeholder reference files (`openapi.yaml`, `graphql-schema.graphql`) and ADR bodies in `docs/decisions/*` still optional until real content is produced.

## Completed (historical)

- Created docs structure under `docs/`.
- Established `docs/memory/techContext.md` as the stack/commands snapshot (versions from `package.json`).
- Distributed content into domain docs:
  - `docs/memory/projectbrief.md`, `productContext.md`, `systemPatterns.md`
  - `docs/technical/architecture.md`, `api-reference.md`, `dev-setup.md`, `infrastructure.md`
  - `docs/reference/dependency-map.md`
  - `docs/product/*`, `docs/operations/*`

## Pending

- Populate generated reference artifacts when available:
  - [`../reference/openapi.yaml`](../reference/openapi.yaml)
  - [`../reference/graphql-schema.graphql`](../reference/graphql-schema.graphql)
- Flesh out ADRs in `docs/decisions/*` where decisions are finalized.
