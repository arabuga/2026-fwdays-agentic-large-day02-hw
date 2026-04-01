#!/usr/bin/env python3
"""Scaffold A/B rule-test folders under docs/technical/ab-tests/.

Creates prompt.txt, empty result files, notes template, and ensures README.
Used by the rule-ab-test Cursor skill workflow."""
from __future__ import annotations

import argparse
from datetime import date
from pathlib import Path
import sys

NOTES_TEMPLATE = """# Notes

## Goal
Describe what this rule is supposed to influence.

## Signals in A (OFF)
- 

## Signals in B (ON)
- 

## Comparison
- what changed:
- what improved:
- what stayed weak:

## Verdict
effective | partially effective | ineffective

## Next step
- keep as is
- refine wording
- split rule
- add module-specific constraint
"""

README_TEXT = """# A/B Tests

Structure:
- ab-tests/<rule>/<date>-<scenario>/
- each scenario contains prompt.txt, result-A.txt, result-B.txt, notes.md

Rules:
- keep the prompt identical for A and B
- change one rule at a time
- store full raw outputs
- summarize conclusions in notes.md
"""


def rule_dir_name(rule_path: Path) -> str:
    """Return directory name for a rule file (strip .mdc / .mdc.off suffix)."""
    name = rule_path.name
    if name.endswith(".mdc.off"):
        return name[:-8]
    if name.endswith(".mdc"):
        return name[:-4]
    return name


def main() -> int:
    """Parse CLI args and create scenario directory layout; print scenario path."""
    p = argparse.ArgumentParser()
    p.add_argument("--repo-root", required=True)
    p.add_argument("--rule-path", required=True)
    p.add_argument("--scenario", required=True)
    p.add_argument("--prompt-file", required=True)
    p.add_argument("--test-date", default=date.today().isoformat())
    args = p.parse_args()

    repo = Path(args.repo_root).resolve()
    rule_path = Path(args.rule_path)
    prompt_src = Path(args.prompt_file).resolve()

    if not prompt_src.exists():
        print(f"ERROR: Prompt file not found: {prompt_src}", file=sys.stderr)
        return 1

    rule_dir = rule_dir_name(rule_path)

    ab_root = repo / "docs" / "technical" / "ab-tests"
    scenario_dir = ab_root / rule_dir / f"{args.test_date}-{args.scenario}"
    scenario_dir.mkdir(parents=True, exist_ok=True)

    (ab_root / "README.md").write_text(README_TEXT, encoding="utf-8")
    (scenario_dir / "prompt.txt").write_text(
        prompt_src.read_text(encoding="utf-8"),
        encoding="utf-8",
    )

    for name in ["result-A.txt", "result-B.txt"]:
        target = scenario_dir / name
        if not target.exists():
            target.write_text("", encoding="utf-8")

    notes = scenario_dir / "notes.md"
    if not notes.exists():
        notes.write_text(NOTES_TEMPLATE, encoding="utf-8")

    print(scenario_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())