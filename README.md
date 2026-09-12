# Digital Graveyard v3

This is the reliable-download build.

## What changed

Previous versions attempted to force-download files directly from Wikimedia Commons. Browsers can block that because the download comes from a different origin.

v3 downloads a small local HTML artifact viewer from this repository instead. The downloaded viewer then displays the real historical public-domain image from its archive source when opened.

## Upload to GitHub

Replace/update:

- `index.html`
- `style.css`
- `script.js`
- `files.json`
- `README.md`

Also upload the entire new `files/` folder.

Do not rename the `files` folder.

## GitHub Pages

Keep the files at the repository root. `files/` should be directly beside `index.html`.

## Sources

The current collection links to Wikimedia Commons public archive records. Each downloaded artifact viewer contains a link to its original record.
