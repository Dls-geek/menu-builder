# Menu Builder — দেশি জোটা

A4 menu editor for restaurants. Edit text on the sheet, change Bangla fonts, layout, colors, and logo, then print to PDF.

## Run

Needs [Node.js](https://nodejs.org/).

```bash
npm install
npm start
```

Open http://localhost:3000

## Files

- `server.js` — Express API (save menu, upload logos)
- `public/index.html` — Menu Studio + A4 preview
- `package.json` — dependencies

## Notes

- Menu data is saved to `menu-data.json` (ignored by git).
- Uploaded logos go in `uploads/` (ignored by git).
