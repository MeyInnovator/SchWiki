const urlParams = new URLSearchParams(window.location.search);
const lernfeldId = urlParams.get('lernfeld');

let completedTerms = JSON.parse(localStorage.getItem("completedTerms")) || [];

// Optional: Hole auch den Namen des Lernfelds über einen API-Call oder speichere ihn im LocalStorage

async function fetchBegriffe() {
  try {
    const response = await fetch(`http://localhost:3000/api/lernfelder/${lernfeldId}/begriffe`);
    const begriffe = await response.json();
    
    const listContainer = document.querySelector('.begriffe-list');
    listContainer.innerHTML = ''; // Container leeren

    if (begriffe.length === 0) {
      listContainer.innerHTML = '<p>Keine Begriffe gefunden.</p>';
      return;
    }

    // Begriffe auflisten
    begriffe.forEach(begriff => {
      const begriffItem = document.createElement('a');
      begriffItem.classList.add('begriff-item');
      begriffItem.href = `begriffe.html?begriff=${encodeURIComponent(begriff.name)}`;
      begriffItem.textContent = begriff.name;

      // Überprüfen, ob der Begriff in completedTerms enthalten ist
      if (completedTerms.includes(begriff.name)) {
        const checkmark = document.createElement('span');
        checkmark.textContent = '✔️'; // Checkmark-Symbol
        checkmark.classList.add('checkmark');
        begriffItem.appendChild(checkmark);
      }

      listContainer.appendChild(begriffItem);
    });

    // Suchfunktion aktivieren
    enableSearch();
  } catch (error) {
    console.error("Fehler beim Laden der Begriffe:", error);
  }
}

// Funktion zur Aktivierung der Suchfunktion
function enableSearch() {
  const searchInput = document.querySelector('.search-input');
  const begriffItems = document.querySelectorAll('.begriff-item');

  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();

    begriffItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.style.display = ''; // Zeige den Begriff an
      } else {
        item.style.display = 'none'; // Blende den Begriff aus
      }
    });
  });
}

// Begriffe laden
fetchBegriffe();