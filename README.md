# Menu Builder — দেশি জোটা

A4 restaurant menu studio: edit on the sheet, Bangla fonts, print / PNG, QR, and style templates.

Inspired by tools like Canva Menus, MustHaveMenus, and IAMenu — focused on print-shop workflows.

## Run

Needs [Node.js](https://nodejs.org/).

```bash
npm install
npm start
```

Open http://localhost:3000

## Features

- **Templates** — Classic Heritage, Modern Clean, Fine Dining, Kraft Market, Night Bistro
- **Type** — Title / Headings / Body Bangla fonts, weight, size
- **Layout** — 1 / 2 / 3 columns, margins, density, leaders, frame, paper texture
- **Items** — add/move sections & rows, special rows, dietary badges (স / ঝ / ★), descriptions, bulk price %
- **Share** — QR code on the menu, Download PNG (2×), Print A4
- **Undo / Redo** — Ctrl+Z / Ctrl+Y
- **Autosave** — browser + server (`menu-data.json`)

## Files

- `server.js` — Express API (save menu, upload logos)
- `public/index.html` — Menu Studio + A4 preview
- `package.json` — dependencies

## Notes

- Menu data is saved to `menu-data.json` (gitignored).
- Uploaded logos go in `uploads/` (gitignored).
- Print hides the studio; only the A4 sheet prints.
