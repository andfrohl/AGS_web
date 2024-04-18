// Annahme: Du hast eine Gruppe von Radio-Buttons mit der Klasse "carousel-radio"
const radioButtons = document.querySelectorAll(".carousel input[type='radio']");

let currentIndex = 0;

function changeSlide() {
    // Ändere den checked-Status des aktuellen Radio-Buttons
    radioButtons[currentIndex].checked = false;
    currentIndex = (currentIndex + 1) % radioButtons.length;
    radioButtons[currentIndex].checked = true;
}

// Rufe die Funktion alle 5 Sekunden auf
const interval = setInterval(changeSlide, 4000);

// Um das Intervall zu stoppen, rufe clearInterval() auf
function stopInterval() {
    clearInterval(interval);
    console.log("JavaScript gestoppt");
}

// Beispiel: Stoppe das Intervall nach 20 Sekunden
setTimeout(stopInterval, 22000);