const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Datenbankfehler:', err.message);
  } else {
    console.log('Mit SQLite verbunden');
  }
});

// API-Endpunkt zum Abrufen der Lernfelder (jetzt mit description)
app.get('/api/lernfelder', (req, res) => {
  const sql = `SELECT id, name, description FROM lernfelder`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API-Endpunkt zum Abrufen der Begriffe eines bestimmten Lernfelds
app.get('/api/lernfelder/:id/begriffe', (req, res) => {
  const lernfeldId = req.params.id;
  const sql = 'SELECT id, name, Erklärung FROM begriffe WHERE lernfeld_id = ?';
  db.all(sql, [lernfeldId], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API-Endpunkt zum Abrufen der Erklärung eines Begriffs
app.get('/api/begriff/:name', (req, res) => {
  const begriffName = req.params.name;
  const sql = 'SELECT name, Erklärung FROM begriffe WHERE name = ?';
  db.get(sql, [begriffName], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Begriff nicht gefunden' });
      return;
    }
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
