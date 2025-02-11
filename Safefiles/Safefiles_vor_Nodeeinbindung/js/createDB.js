const sqlite3 = require('sqlite3').verbose();

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err.message);
    } else {
        console.log('Erfolgreich mit der SQLite-Datenbank verbunden.');
    }
});

// Tabellen erstellen (falls sie noch nicht existieren)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS lernfelder (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS begriffe (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        lernfeld_id INTEGER,
        FOREIGN KEY (lernfeld_id) REFERENCES lernfelder(id)
    )`);
    
    // Beispiel-Lernfelder und Begriffe einfügen
    const insertLernfeld = db.prepare(`INSERT INTO lernfelder (name) VALUES (?)`);
    insertLernfeld.run("Lernfeld 1");
    insertLernfeld.run("Lernfeld 2");
    insertLernfeld.run("Lernfeld 3");

    const insertBegriff = db.prepare(`INSERT INTO begriffe (name, lernfeld_id) VALUES (?, ?)`);
    insertBegriff.run("Begriff 1", 1);
    insertBegriff.run("Begriff 2", 1);
    insertBegriff.run("Begriff 3", 2);
    insertBegriff.run("Begriff 4", 2);
    insertBegriff.run("Begriff 5", 3);
    insertBegriff.run("Begriff 6", 3);
});
