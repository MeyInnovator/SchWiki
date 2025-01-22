// Daten für Lernfelder und Begriffe
const lernfeldDaten = {
  1: ["Begriff 1", "Begriff 2", "Begriff 3"], // Lernfeld 1 Begriffe
  2: ["Begriff A", "Begriff B", "Begriff C"], // Lernfeld 2 Begriffe
};

// Gelesene Begriffe aus dem Local Storage
const completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

// Funktion zur Generierung der Lernfeldliste
function generateLernfeldList() {
  const lernfeldList = document.querySelector(".lernfeld-list");
  lernfeldList.innerHTML = ""; // Reset der Liste

  // Iteriere über die Lernfelder
  Object.entries(lernfeldDaten).forEach(([lernfeldId, begriffe]) => {
    // Zähle die gelesenen Begriffe, die zu diesem Lernfeld gehören
    const gelesen = begriffe.filter((begriff) => completedTerms.includes(begriff)).length;
    const total = begriffe.length;
    const percentage = total > 0 ? (gelesen / total) * 100 : 0;

    // HTML-Struktur für ein Lernfeld
    const lernfeldItem = document.createElement("a");
    lernfeldItem.href = `lernfeld.html?lernfeld=${lernfeldId}`;
    lernfeldItem.className = "lernfeld-item";

    lernfeldItem.innerHTML = `
      <div>
        <h2>Lernfeld ${lernfeldId}</h2>
        <p>TestThema</p>
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
}

// Überwachung von Local Storage und Fortschrittsanzeige
function updateProgressOnLocalStorageChange() {
  // Überwache Änderungen am Local Storage
  window.addEventListener("storage", () => {
    generateLernfeldList();
  });
}

// Generiere die Lernfeldliste beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
  generateLernfeldList();
  updateProgressOnLocalStorageChange();
});
