#!/usr/bin/env python3
"""Append one A/B scenario entry to docs/technical/rule-validation.md.

Ensures the validation file exists with a header, then appends links to
prompt, result A/B, and notes for the given scenario directory."""
from __future__ import annotations

import argparse
from pathlib import Path
import sys

HEADER = """# Rule Validation

This document records A/B validation results for Cursor rules.

Purpose:
- verify that a rule actually changes agent behavior
- compare output with the rule OFF vs ON
- document whether the rule is effective, partially effective, or ineffective

---
"""


def ensure_file(path: Path) -> None:
    """Create parent dirs and seed rule-validation.md with HEADER if missing."""
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text(HEADER, encoding="utf-8")


def relpath(from_file: Path, to_file: Path) -> str:
    """POSIX relative path from from_file's directory to to_file."""
    import os
    return Path(os.path.relpath(to_file.resolve(), from_file.parent.resolve())).as_posix()


def append_entry(
    validation_file: Path,
    rule_name: str,
    scenario_dir: Path,
    rule_path: str,
    verdict: str,
    summary: str,
) -> None:
    """Write one markdown section with relative links into rule-validation.md."""
    prompt_link = relpath(validation_file, scenario_dir / "prompt.txt")
    a_link = relpath(validation_file, scenario_dir / "result-A.txt")
    b_link = relpath(validation_file, scenario_dir / "result-B.txt")
    notes_link = relpath(validation_file, scenario_dir / "notes.md")

    scenario_name = scenario_dir.name

    entry = f"""## {rule_name}

### {scenario_name}

- **Rule**: `{rule_path}`
- **Scenario**: `{scenario_name}`
- **Prompt**: [`prompt.txt`]({prompt_link})
- **Result A (OFF)**: [`result-A.txt`]({a_link})
- **Result B (ON)**: [`result-B.txt`]({b_link})
- **Notes**: [`notes.md`]({notes_link})
- **Verdict**: `{verdict}`

#### Summary
{summary}

---
"""
    with validation_file.open("a", encoding="utf-8") as f:
        f.write(entry)


def main() -> int:
    """CLI: append validation entry; print path to rule-validation.md."""
    p = argparse.ArgumentParser()
    p.add_argument("--repo-root", required=True)
    p.add_argument("--rule-path", required=True)
    p.add_argument("--scenario-dir", required=True)
    p.add_argument(
        "--result",
        required=True,
        choices=["effective", "partially effective", "ineffective", "pending"],
    )
    p.add_argument("--summary", required=True)
    args = p.parse_args()

    repo = Path(args.repo_root).resolve()
    scenario_dir = Path(args.scenario_dir).resolve()

    if not scenario_dir.exists():
        print(f"ERROR: Scenario dir not found: {scenario_dir}", file=sys.stderr)
        return 1

    validation_file = repo / "docs" / "technical" / "rule-validation.md"
    ensure_file(validation_file)

    rule_name = Path(args.rule_path).name
    if rule_name.endswith(".mdc.off"):
        rule_name = rule_name[:-4]

    append_entry(
        validation_file=validation_file,
        rule_name=rule_name,
        scenario_dir=scenario_dir,
        rule_path=args.rule_path,
        verdict=args.result,
        summary=args.summary,
    )

    print(validation_file)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())