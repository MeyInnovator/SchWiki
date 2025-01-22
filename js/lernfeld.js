document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const lernfeldId = params.get("lernfeld");

  const lernfeldTitle = document.getElementById("lernfeld-title");
  const begriffeGrid = document.getElementById("begriffe-grid");

  // Daten für die Lernfelder
  const lernfeldData = {
    1: { title: "Lernfeld 1", begriffe: ["Begriff 1", "Begriff 2", "Begriff 3"] },
    2: { title: "Lernfeld 2", begriffe: ["Begriff 4", "Begriff 5", "Begriff 6"] },
  };

  // "Fertig"-Status aus Local Storage abrufen
  let completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

  // Überprüfen, ob das Lernfeld existiert
  const lernfeld = lernfeldData[lernfeldId];
  if (lernfeld) {
    lernfeldTitle.textContent = lernfeld.title;

    // Begriffe dynamisch hinzufügen
    lernfeld.begriffe.forEach((begriff) => {
      const begriffCard = document.createElement("a");
      begriffCard.href = `begriffe.html?begriff=${encodeURIComponent(begriff)}`;
      begriffCard.textContent = begriff;
      begriffCard.className = "card";

      // Überprüfen, ob der Begriff als "fertig" markiert wurde
      if (completedTerms.includes(begriff)) {
        const checkmark = document.createElement("span");
        checkmark.textContent = "✔️"; // Haken-Symbol
        checkmark.className = "checkmark";
        begriffCard.appendChild(checkmark); // Haken zur Karte hinzufügen
      }

      begriffeGrid.appendChild(begriffCard);
    });
  } else {
    lernfeldTitle.textContent = "Lernfeld nicht gefunden";
  }
});
