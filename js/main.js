document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const cards = document.querySelectorAll(".grid .card");

  // "Fertig"-Status aus dem Local Storage laden
  const completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

  // Icon für abgeschlossene Begriffe hinzufügen
  cards.forEach((card) => {
    const cardText = card.textContent.trim();
    if (completedTerms.includes(cardText)) {
      const icon = document.createElement("span");
      icon.textContent = "✔";
      icon.style.color = "green";
      icon.style.marginLeft = "10px";
      card.appendChild(icon);
    }
  });

  // Suche aktivieren
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    cards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();
      card.style.display = cardText.includes(searchValue) ? "" : "none";
    });
  });
});
