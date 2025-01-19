// Begriffe-Datenbank als JSON-Objekt
const begriffeDaten = {
    "Begriff 1": "Dies ist die Beschreibung für Begriff 1. Hier kannst du weitere Informationen hinzufügen.",
    "Begriff 2": "Dies ist die Beschreibung für Begriff 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Begriff 3": "Beschreibung für Begriff 3. At vero eos et accusam et justo duo dolores et ea rebum.",
    "Begriff 4": "Beschreibung für Begriff 4. No sea takimata sanctus est Lorem ipsum dolor sit amet.",
    "Begriff 5": "Beschreibung für Begriff 5. Lorem ipsum dolor sit amet, sed diam voluptua.",
    "Begriff 6": "Beschreibung für Begriff 6. Duis autem vel eum iriure dolor in hendrerit in vulputate.",
    "Begriff 7": "Beschreibung für Begriff 7. Ut wisi enim ad minim veniam, quis nostrud exerci tation.",
    "Begriff 8": "Beschreibung für Begriff 8. Nam liber tempor cum soluta nobis eleifend option congue nihil."
  };
  
  // URL-Parameter auslesen
  const params = new URLSearchParams(window.location.search);
  const begriff = params.get("begriff");
  
  // Elemente für Titel und Beschreibung auswählen
  const titleElement = document.getElementById("begriffs-title");
  const descriptionElement = document.getElementById("begriffs-description");
  
  // Überprüfen, ob der Begriff vorhanden ist
  if (begriff && begriffeDaten[begriff]) {
    titleElement.textContent = begriff; // Titel anzeigen
    descriptionElement.textContent = begriffeDaten[begriff]; // Beschreibung anzeigen
  } else {
    titleElement.textContent = "Begriff nicht gefunden";
    descriptionElement.textContent = "Der Begriff konnte nicht geladen werden. Bitte wähle einen gültigen Begriff aus.";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const cards = document.querySelectorAll(".grid .card");
  
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();
  
      cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchValue)) {
          card.style.display = ""; // Zeigt das Element an
        } else {
          card.style.display = "none"; // Versteckt das Element
        }
      });
    });
  });
  