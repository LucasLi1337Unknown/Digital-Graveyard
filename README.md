# Digital Graveyard v2

A GitHub Pages site that downloads a random real historical artifact from a public internet archive, then reveals what you recovered.

## How it works

1. Click **DIG UP A FILE**.
2. JavaScript selects a random artifact from `files.json`.
3. The browser fetches the original archive file.
4. It converts the file to a Blob and triggers a download.
5. The site reveals what you recovered.

If a source blocks cross-origin fetching, the page falls back to opening the original file.

## Safety

The curated list excludes executables, malware, leaked/private files, gore, and dangerous payloads.

## GitHub setup

1. Create a new GitHub repository.
2. Upload these files to the repository root:
   - `index.html`
   - `style.css`
   - `script.js`
   - `files.json`
   - `README.md`
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select the main branch and `/ (root)`.
6. Save.

## Adding more artifacts

Edit `files.json` and add another entry with a direct file URL plus its archive source page.
