document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const lernfeldId = params.get("lernfeld");

  const lernfeldTitle = document.getElementById("lernfeld-title");
  const begriffeGrid = document.getElementById("begriffe-grid");
  const searchInput = document.querySelector(".search-input");

  // Daten für die Lernfelder
  const lernfeldData = {
    1: { title: "Lernfeld 1", begriffe: ["Begriff 1", "Begriff 2", "Begriff 3"] },
    2: { title: "Lernfeld 2", begriffe: ["Begriff 4", "Begriff 5", "Begriff 6"] },
  };

  let completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

  const lernfeld = lernfeldData[lernfeldId];
  if (lernfeld) {
    lernfeldTitle.textContent = lernfeld.title;
    renderBegriffe(lernfeld.begriffe);
  } else {
    lernfeldTitle.textContent = "Lernfeld nicht gefunden";
  }

  function renderBegriffe(begriffe) {
    begriffeGrid.innerHTML = "";
    begriffe.forEach((begriff) => {
      const begriffCard = document.createElement("a");
      begriffCard.href = `begriffe.html?begriff=${encodeURIComponent(begriff)}`;
      begriffCard.textContent = begriff;
      begriffCard.className = "card";

      if (completedTerms.includes(begriff)) {
        const checkmark = document.createElement("span");
        checkmark.textContent = "✔️";
        checkmark.className = "checkmark";
        begriffCard.appendChild(checkmark);
      }

      begriffeGrid.appendChild(begriffCard);
    });
  }

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBegriffe = lernfeld.begriffe.filter(begriff => 
      begriff.toLowerCase().includes(searchTerm)
    );
    renderBegriffe(filteredBegriffe);
  });
});
