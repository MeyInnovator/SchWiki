document.addEventListener("DOMContentLoaded", generateLernfeldList);

async function generateLernfeldList() {
  const lernfeldList = document.querySelector(".lernfeld-list");
  lernfeldList.innerHTML = ""; // Liste zurücksetzen

  try {
    // API-Call zum Abrufen der Lernfelder
    const response = await fetch("http://localhost:3000/api/lernfelder");
    const lernfelder = await response.json();

    // Gegebenenfalls kannst du hier auch lokale Daten (z. B. den Fortschritt) einfließen lassen.
    // Beispiel: completedTerms aus dem localStorage
    const completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

    // Für jedes Lernfeld ein Element generieren
    lernfelder.forEach((lf) => {
      // Falls du pro Lernfeld zusätzlich die Liste der Begriffe und den Fortschritt (gelesen/total) abrufen möchtest,
      // musst du entweder diese Daten direkt in der Tabelle "lernfelder" speichern oder einen weiteren API-Aufruf durchführen.
      // Hier nehmen wir als Beispiel an, dass du das statisch berechnest:
      // (z. B. könnten die Begriffe auch aus einer eigenen API kommen)
      const begriffe = getBegriffeFuerLernfeld(lf.id); // Diese Funktion müsstest du definieren – alternativ statisch halten
      const gelesen = begriffe.filter((begriff) => completedTerms.includes(begriff)).length;
      const total = begriffe.length;
      const percentage = total > 0 ? (gelesen / total) * 100 : 0;

      // Erstelle ein Lernfeld-Element (als Link)
      const lernfeldItem = document.createElement("a");
      lernfeldItem.href = `lernfeld.html?lernfeld=${lf.id}`;
      lernfeldItem.className = "lernfeld-item";

      lernfeldItem.innerHTML = `
        <div>
          <h2>${lf.name}</h2>
          <p>${lf.description || "TestThema"}</p>
        </div>
        <div class="progress-circle">
          <svg>
            <circle cx="20" cy="20" r="18"></circle>
            <circle cx="20" cy="20" r="18" style="stroke-dashoffset: calc(113 - (${percentage} / 100) * 113);"></circle>
          </svg>
          <span>${gelesen}/${total}</span>
        </div>
      `;

      lernfeldList.appendChild(lernfeldItem);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Lernfelder:", error);
  }
}

// Falls du die Begriffe für ein Lernfeld (statt der statischen Daten) dynamisch ermitteln möchtest,
// kannst du hier eine Funktion definieren, die entweder einen API-Aufruf startet oder statische Beispielwerte zurückgibt:
function getBegriffeFuerLernfeld(lernfeldId) {
  // Beispiel mit statischen Daten:
  const daten = {
    1: ["Begriff 1", "Begriff 2", "Begriff 3"],
    2: ["Begriff A", "Begriff B", "Begriff C"],
    // Weitere Lernfelder ggf. hinzufügen
  };
  return daten[lernfeldId] || [];
}
