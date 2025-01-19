document.addEventListener("DOMContentLoaded", () => {
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
  