const urlParams = new URLSearchParams(window.location.search);
const lernfeldId = urlParams.get('lernfeld');

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
    begriffe.forEach(term => {
      const termItem = document.createElement('div');
      termItem.classList.add('begriff-item');
      termItem.innerHTML = `
        <h2>${term.name}</h2>
        <p>${term.Erklärung || ''}</p>
      `;
      listContainer.appendChild(termItem);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Begriffe:", error);
  }
}

// Begriffe laden
fetchBegriffe();