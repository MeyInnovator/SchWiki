document.addEventListener("DOMContentLoaded", generateLernfeldList);

async function generateLernfeldList() {
  const lernfeldList = document.querySelector(".lernfeld-list");
  lernfeldList.innerHTML = ""; // Liste zurücksetzen

  try {
    // API-Call zum Abrufen der Lernfelder
    const response = await fetch("http://localhost:3000/api/lernfelder");
    const lernfelder = await response.json();

    // localStorage: bereits abgeschlossene Begriffe abrufen
    const completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

    // Für jedes Lernfeld ein Element generieren
    for (const lf of lernfelder) {
      // API-Call zum Abrufen der Begriffe für das jeweilige Lernfeld
      const begriffeResponse = await fetch(`http://localhost:3000/api/lernfelder/${lf.id}/begriffe`);
      const begriffeData = await begriffeResponse.json();
      const begriffe = begriffeData.map(term => term.name);
      const gelesen = begriffe.filter(begriff => completedTerms.includes(begriff)).length;
      const total = begriffe.length;
      const percentage = total > 0 ? (gelesen / total) * 100 : 0;

      // Berechne den Wert für stroke-dashoffset (angenommen, die Kreisumfang ist 113)
      const strokeDashoffset = 113 - (percentage / 100) * 113;

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
            <circle cx="20" cy="20" r="18" stroke="#ccc" stroke-width="4" fill="none"></circle>
            <circle cx="20" cy="20" r="18" stroke="#f00" stroke-width="4" fill="none" style="stroke-dasharray: 113; stroke-dashoffset: ${strokeDashoffset};"></circle>
          </svg>
          <span>${gelesen}/${total}</span>
        </div>
      `;

      lernfeldList.appendChild(lernfeldItem);
    }
  } catch (error) {
    console.error("Fehler beim Laden der Lernfelder:", error);
  }
}
