# Digital Graveyard

A creepy-but-safe GitHub Pages experiment that randomly surfaces real historical internet artifacts from public archive records.

## What it does

Press **DIG UP A FILE** and the site selects a real historical artifact. The file itself remains hosted by the original archive; this project links to the archive's original-file redirect and source record.

## Safety

This collection intentionally excludes executables, malware, leaked/private material, gore, and dangerous payloads. Current artifacts are historical public-domain spirit-photography images hosted by Wikimedia Commons.

## Deploy

Upload the files in this folder to the root of a GitHub repository, then enable GitHub Pages for the repository.

## Files

- `index.html` — interface
- `style.css` — visual design
- `script.js` — random recovery system
- `files.json` — curated artifact database

## Sources

Every artifact includes its original Wikimedia Commons source record in `files.json`. Licensing and provenance should be checked on the linked source page before redistributing any artifact.
