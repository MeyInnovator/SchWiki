// Begriffe-Datenbank als JSON-Objekt
const begriffeDaten = {
  "Begriff 1": "Dies ist die Beschreibung für Begriff 1.",
};

// URL-Parameter auslesen
const params = new URLSearchParams(window.location.search);
const begriff = params.get("begriff");

// Elemente für Titel und Beschreibung auswählen
const titleElement = document.getElementById("begriffs-title");
const descriptionElement = document.getElementById("begriffs-description");

// "Fertig"-Status aus dem Local Storage
let completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

// API-Aufruf, um die Erklärung des Begriffs zu laden
async function fetchBegriffDetails(begriff) {
  try {
    const response = await fetch(`http://localhost:3000/api/begriff/${encodeURIComponent(begriff)}`);
    if (!response.ok) {
      throw new Error("Begriff nicht gefunden");
    }
    const data = await response.json();
    titleElement.textContent = data.name;
    descriptionElement.textContent = data.Erklärung || "Keine Erklärung verfügbar.";

    // Button hinzufügen
    addCompletionButton(begriff);
  } catch (error) {
    console.error("Fehler beim Laden des Begriffs:", error);
    titleElement.textContent = "Fehler";
    descriptionElement.textContent = "Der Begriff konnte nicht geladen werden.";
  }
}

// Funktion zum Hinzufügen des "Gelesen/Ungelesen"-Buttons
function addCompletionButton(begriff) {
  const fertigButton = document.createElement("button");
  fertigButton.className = "btn green";
  fertigButton.id = "fertigButton";
  document.querySelector(".buttons").prepend(fertigButton);

  // Überprüfen, ob der Begriff gelesen ist
  const isGelesen = completedTerms.includes(begriff);
  fertigButton.textContent = isGelesen ? "Ungelesen" : "Gelesen";
  fertigButton.style.backgroundColor = isGelesen ? "#B08F2B" : "#28a745"; // Grün für Gelesen, Orange für Ungelesen

  // Event für den Button
  fertigButton.addEventListener("click", () => {
    if (completedTerms.includes(begriff)) {
      // Begriff entfernen
      completedTerms = completedTerms.filter((term) => term !== begriff);
      fertigButton.textContent = "Gelesen";
      fertigButton.style.backgroundColor = "#28a745"; // Grün
    } else {
      // Begriff hinzufügen
      completedTerms.push(begriff);
      fertigButton.textContent = "Ungelesen";
      fertigButton.style.backgroundColor = "#B08F2B"; // Orange
    }
    // Speichern im Local Storage
    localStorage.setItem("completedTerms", JSON.stringify(completedTerms));
  });
}

// Begriffsdetails laden
if (begriff) {
  fetchBegriffDetails(begriff);
} else {
  titleElement.textContent = "Begriff nicht gefunden";
  descriptionElement.textContent = "Kein Begriff wurde ausgewählt.";
}

// Zurück-Button
const zurueckButton = document.getElementById("zurueckButton");
zurueckButton.addEventListener("click", () => {
  window.history.back();
});
