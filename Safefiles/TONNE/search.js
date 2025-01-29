// Beispiel: Dropdown-Änderungen erkennen
document.getElementById('lernfeld-dropdown').addEventListener('change', function () {
    const selectedValue = this.value;
    alert(`Lernfeld ${selectedValue} wurde ausgewählt!`);
  });