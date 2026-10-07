#!/bin/bash
set -e
cd "$(dirname "$0")"

# Quarto preview does not detect edits to included tab files in this project.
(
  while sleep 1; do
    for tab in _research_*.qmd; do
      if [[ "$tab" -nt research.qmd ]]; then
        if grep -q 'preview-tab-reload: 0' research.qmd; then
          sed -i '' 's/preview-tab-reload: 0/preview-tab-reload: 1/' research.qmd
        else
          sed -i '' 's/preview-tab-reload: 1/preview-tab-reload: 0/' research.qmd
        fi
        break
      fi
    done
  done
) &
watcher=$!
trap 'kill "$watcher" 2>/dev/null || true' EXIT

quarto preview --render all "$@"
