const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Statische Dateien bereitstellen (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// SQLite-Datenbankverbindung
const db = new sqlite3.Database('./database.sqlite');

// Endpunkt für Lernfelder und Begriffe
app.get('/api/lernfelder', (req, res) => {
    db.all(`SELECT * FROM lernfelder`, [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/begriffe/:lernfeldId', (req, res) => {
    const lernfeldId = req.params.lernfeldId;
    db.all(`SELECT * FROM begriffe WHERE lernfeld_id = ?`, [lernfeldId], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
