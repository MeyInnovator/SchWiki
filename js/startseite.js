// Gelesene Begriffe aus dem Local Storage
const completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

// Funktion zur Generierung der Lernfeldliste
function generateLernfeldList() {
  const lernfeldList = document.querySelector(".lernfeld-list");
  lernfeldList.innerHTML = ""; // Reset der Liste

  // Iteriere über die Lernfelder und deren Begriffe
  Object.entries(lernfeldDaten).forEach(([lernfeldId, begriffe]) => {
    // Filtere Begriffe, die gelesen wurden und zu diesem Lernfeld gehören
    const gelesen = begriffe.filter((begriff) => completedTerms.includes(begriff)).length;
    const total = begriffe.length;

    // Berechne den Fortschritt in Prozent
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

// Generiere die Lernfeldliste beim Laden der Seite
document.addEventListener("DOMContentLoaded", generateLernfeldList);
