// In server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Falls du den Live Server (Port 5500) nutzt und dein API-Server auf Port 3000 läuft

const app = express();
const port = 3000;

// CORS aktivieren, damit dein Client (auf Port 5500) darauf zugreifen kann
app.use(cors());

// Statische Dateien bereitstellen (falls benötigt)
app.use(express.static('public'));

// SQLite-Datenbankverbindung
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Datenbankfehler:', err.message);
  } else {
    console.log('Mit SQLite verbunden');
  }
});

// API-Endpunkt zum Abrufen der Lernfelder
app.get('/api/lernfelder', (req, res) => {
  // Beispiel: Annahme, dass die Tabelle "lernfelder" die Spalten "id", "name" und "description" enthält.
  db.all(`SELECT id, name FROM lernfelder`, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
