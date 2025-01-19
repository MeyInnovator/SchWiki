// Begriffe-Datenbank als JSON-Objekt
const begriffeDaten = {
  "Begriff 1": "Dies ist die Beschreibung für Begriff 1. Hier kannst du weitere Informationen hinzufügen.",
  "Begriff 2": "Dies ist die Beschreibung für Begriff 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Begriff 3": "Beschreibung für Begriff 3. At vero eos et accusam et justo duo dolores et ea rebum.",
  "Begriff 4": "Beschreibung für Begriff 4. No sea takimata sanctus est Lorem ipsum dolor sit amet."
};

// URL-Parameter auslesen
const params = new URLSearchParams(window.location.search);
const begriff = params.get("begriff");

// Elemente für Titel und Beschreibung auswählen
const titleElement = document.getElementById("begriffs-title");
const descriptionElement = document.getElementById("begriffs-description");

// Debugging: Zeige den gelesenen URL-Parameter in der Konsole
console.log("Gelesener Begriff:", begriff);

// Überprüfen, ob der Begriff in der Datenbank vorhanden ist
if (begriff && begriffeDaten[begriff]) {
  titleElement.textContent = begriff; // Titel anzeigen
  descriptionElement.textContent = begriffeDaten[begriff]; // Beschreibung anzeigen
} else {
  titleElement.textContent = "Begriff nicht gefunden";
  descriptionElement.textContent =
    "Der Begriff konnte nicht geladen werden. Bitte wählen Sie einen gültigen Begriff aus.";
}
