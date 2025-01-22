// Begriffe-Datenbank als JSON-Objekt
const begriffeDaten = {
  "Begriff 1": "Dies ist die Beschreibung für Begriff 1.",
  "Begriff 2": "Dies ist die Beschreibung für Begriff 2.",
  "Begriff 3": "Beschreibung für Begriff 3.",
  "Begriff 4": "Beschreibung für Begriff 4.", // Füge Begriff 4 sicher hinzu
  "Begriff 5": "Beschreibung für Begriff 5.",
  "Begriff 6": "Beschreibung für Begriff 6.",
  "Begriff A": "Beschreibung für Begriff A.",
  "Begriff B": "Beschreibung für Begriff B.",
  "Begriff C": "Beschreibung für Begriff C.",
};

// URL-Parameter auslesen
const params = new URLSearchParams(window.location.search);
const begriff = params.get("begriff");

// Elemente für Titel und Beschreibung auswählen
const titleElement = document.getElementById("begriffs-title");
const descriptionElement = document.getElementById("begriffs-description");

// "Fertig"-Status aus dem Local Storage
let completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

// Überprüfen, ob der Begriff in der Datenbank vorhanden ist
if (begriff && begriffeDaten[begriff]) {
  titleElement.textContent = begriff;
  descriptionElement.textContent = begriffeDaten[begriff];

  // Button hinzufügen
  const fertigButton = document.createElement("button");
  fertigButton.className = "btn green";
  fertigButton.id = "fertigButton";
  document.querySelector(".buttons").prepend(fertigButton);

  // Überprüfen, ob der Begriff gelesen ist
  const isGelesen = completedTerms.includes(begriff);
  fertigButton.textContent = isGelesen ? "Gelesen" : "Ungelesen";
  fertigButton.style.backgroundColor = isGelesen ? "#28a745" : "#B08F2B"; // Grün für Gelesen, Orange für Ungelesen

  // Event für den Button
  fertigButton.addEventListener("click", () => {
    if (completedTerms.includes(begriff)) {
      // Begriff entfernen
      completedTerms = completedTerms.filter((term) => term !== begriff);
      fertigButton.textContent = "Ungelesen";
      fertigButton.style.backgroundColor = "#B08F2B"; // Orange
    } else {
      // Begriff hinzufügen
      completedTerms.push(begriff);
      fertigButton.textContent = "Gelesen";
      fertigButton.style.backgroundColor = "#28a745"; // Grün
    }
    // Speichern im Local Storage
    localStorage.setItem("completedTerms", JSON.stringify(completedTerms));
  });
} else {
  // Fallback: Begriff nicht gefunden
  titleElement.textContent = "Begriff nicht gefunden";
  descriptionElement.textContent =
    "Der Begriff konnte nicht geladen werden.";
}

// Zurück-Button
const zurueckButton = document.getElementById("zurueckButton");
zurueckButton.addEventListener("click", () => {
  window.history.back();
});
