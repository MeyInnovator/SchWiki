const begriffeDaten = {
  "Begriff 1": "Dies ist die Beschreibung für Begriff 1.",
  "Begriff 2": "Dies ist die Beschreibung für Begriff 2.",
  "Begriff 3": "Beschreibung für Begriff 3.",
  "Begriff 4": "Beschreibung für Begriff 4.",
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
  fertigButton.textContent = "Fertig";
  fertigButton.className = "complete-button";
  document.querySelector(".content").appendChild(fertigButton);

  // Event für den Button
  fertigButton.addEventListener("click", () => {
    if (!completedTerms.includes(begriff)) {
      completedTerms.push(begriff);
      localStorage.setItem("completedTerms", JSON.stringify(completedTerms));
    }
    //alert(`${begriff} wurde als fertig markiert.`);
    window.location.href = "index.html";
  });
} else {
  titleElement.textContent = "Begriff nicht gefunden";
  descriptionElement.textContent = "Der Begriff konnte nicht geladen werden.";
}
