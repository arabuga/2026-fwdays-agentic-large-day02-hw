# Dev Setup

## Prerequisites
- Node.js >= 18
- Yarn 1.x (workspace manager in this repo)

## Install
```bash
yarn
```

## Common Commands
```bash
yarn start
yarn test
yarn test:all
yarn build
yarn build:packages
```

## Optional: CodeGraphContext (CGC)
If using CGC in this repository, use wrapper script:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\cgc.ps1 --version
powershell -ExecutionPolicy Bypass -File .\scripts\cgc.ps1 index .
powershell -ExecutionPolicy Bypass -File .\scripts\cgc.ps1 list
```
This script routes CGC state into local `.cgc_home` to avoid profile permission issues.

For current CGC status and value, see `docs/reference/codegraphcontext.md`.

## Optional: Context7 MCP (library docs)

This repo includes project-level [Model Context Protocol](https://docs.cursor.com/context/model-context-protocol) config at `.cursor/mcp.json` for [Context7](https://github.com/upstash/context7): up-to-date library documentation via MCP tools (`resolve-library-id`, `query-docs`).

- After opening the project in Cursor, enable the **context7** MCP server if it is not on by default.
- For higher rate limits, add a free API key from [context7.com/dashboard](https://context7.com/dashboard) using the [remote server headers](https://context7.com/docs/resources/all-clients) or run `npx ctx7 setup --cursor` locally.
- Alternative: local MCP via `npx -y @upstash/context7-mcp` (see Context7 docs).


