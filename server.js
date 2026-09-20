const express = require('express');
const multer  = require('multer');
const fs      = require('fs');
const path    = require('path');

const app   = express();
const PUB   = path.join(__dirname, 'public');
const UP    = path.join(__dirname, 'uploads');
const DATA  = path.join(__dirname, 'menu-data.json');
const BAK   = DATA + '.bak';
const EXTS  = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

fs.mkdirSync(PUB, { recursive: true });
fs.mkdirSync(UP,  { recursive: true });

const store = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, UP),
    filename: (req, file, cb) => {
      const clean = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-40);
      cb(null, Date.now() + '-' + clean);
    }
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    cb(null, /^image\/(png|jpe?g|webp|svg\+xml)$/.test(file.mimetype))
});

app.use(express.json({ limit: '15mb' }));
app.use(express.static(PUB));
app.use('/uploads', express.static(UP));

/* atomic menu save — never corrupts, keeps one .bak */
function saveMenu(json, cb) {
  const tmp = DATA + '.tmp';
  fs.writeFile(tmp, json, e => {
    if (e) return cb(e);
    fs.rename(DATA, BAK, () => fs.rename(tmp, DATA, cb));
  });
}

app.get('/api/menu', (req, res) => {
  fs.existsSync(DATA) ? res.sendFile(DATA) : res.json(null);
});
app.post('/api/menu', (req, res) => {
  saveMenu(JSON.stringify(req.body), e =>
    e ? res.status(500).json({ error: 'save failed' }) : res.json({ ok: true }));
});

app.get('/api/logos', (req, res) => {
  fs.readdir(UP, (e, files) =>
    res.json(e ? [] : files.filter(f => EXTS.includes(path.extname(f).toLowerCase()))
      .map(f => '/uploads/' + f)));
});
app.post('/api/upload', store.single('logo'), (req, res) => {
  req.file ? res.json({ url: '/uploads/' + req.file.filename })
           : res.status(400).json({ error: 'no file' });
});
app.delete('/api/logo', (req, res) => {
  const name = path.basename(req.query.f || '');
  const p = path.join(UP, name);
  if (p.startsWith(UP) && fs.existsSync(p)) fs.unlinkSync(p);
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.error('✖', err.message || err);
  res.status(err.status || 400).json({ error: err.message || 'error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log('\n  ✅  Menu Builder running  →  http://localhost:' + PORT +
              '\n      (phones on same Wi-Fi: http://<your-ip>:' + PORT + ')\n'));
