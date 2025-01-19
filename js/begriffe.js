// Begriffe-Datenbank als JSON-Objekt (als Platzhalter)
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

// Überprüfen, ob der Begriff in der Datenbank vorhanden ist
if (begriff && begriffeDaten[begriff]) {
  titleElement.textContent = begriff; // Titel anzeigen
  descriptionElement.textContent = begriffeDaten[begriff]; // Beschreibung anzeigen
} else {
  titleElement.textContent = "Begriff nicht gefunden";
  descriptionElement.textContent =
    "Der Begriff konnte nicht geladen werden. Bitte wählen Sie einen gültigen Begriff aus.";
}


document.addEventListener("DOMContentLoaded", () => {
  // Suchfeld und Karten auswählen
  const searchInput = document.querySelector(".search-input"); // Suchfeld
  const cards = document.querySelectorAll(".grid .card"); // Alle Karten

  // Debugging: Prüfen, ob Karten gefunden wurden
  console.log(cards); // Zeigt die Karten in der Konsole

  // Platzhalter für "Keine Ergebnisse gefunden"
  const noResultsMessage = document.createElement("p");
  noResultsMessage.textContent = "Keine Ergebnisse gefunden.";
  noResultsMessage.style.display = "none";
  noResultsMessage.className = "no-results";
  document.querySelector(".content").appendChild(noResultsMessage);

  // Überprüfen, ob Karten existieren
  if (!cards.length) {
    console.error("Es wurden keine Karten gefunden. Überprüfe die .grid und .card-Klassen.");
    return;
  }

  // Event-Listener für Suchfeld
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    let hasResults = false;

    cards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();
      if (cardText.includes(searchValue)) {
        card.style.display = ""; // Karte anzeigen
        hasResults = true;
      } else {
        card.style.display = "none"; // Karte ausblenden
      }
    });

    // Anzeige der "Keine Ergebnisse"-Nachricht
    noResultsMessage.style.display = hasResults ? "none" : "";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const begriffeDaten = ["Begriff 1", "Begriff 2", "Begriff 3", "Begriff 4"];

  begriffeDaten.forEach((begriff) => {
    const card = document.createElement("a");
    card.href = `begriffe.html?begriff=${encodeURIComponent(begriff)}`;
    card.className = "card";
    card.textContent = begriff;
    grid.appendChild(card);
  });
});





