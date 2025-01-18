// Event-Listener für das Login-Formular
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Verhindert das automatische Neuladen der Seite
  
    // Werte aus den Eingabefeldern holen
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Überprüfung der Eingaben
    if (email === 'admin@test.de' && password === '123') {
      // Weiterleitung zur index.html bei korrekten Daten
      window.location.href = 'index.html';
    } else {
      // Fehlermeldung anzeigen, wenn die Eingaben falsch sind
      alert('Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.');
    }
  });
  