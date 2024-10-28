var formStartTime;

document.addEventListener('DOMContentLoaded', function() {
    // Speichere den Startzeitpunkt des Formulars
    formStartTime = new Date().getTime();

    var jsEnabledInput = document.createElement('input');
    jsEnabledInput.setAttribute('type', 'hidden');
    jsEnabledInput.setAttribute('name', 'jsEnabled');
    jsEnabledInput.setAttribute('value', 'true');
    document.forms['contactForm'].appendChild(jsEnabledInput);

    // Zufällige Rechenaufgabe generieren
    var num1 = Math.floor(Math.random() * 10) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    document.getElementById('correctAnswer').value = num1 + num2; // Setze die korrekte Antwort im versteckten Feld

    document.forms['contactForm'].setAttribute('data-correct-answer', num1 + num2); // Optionale zusätzliche Absicherung
});

function validateForm() {
    var honeypot = document.getElementsByName("honeypot")[0].value;
    if (honeypot) {
        // Honeypot-Feld wurde ausgefüllt – vermutlich ein Bot
        return false;
    }

    var captcha = document.getElementById("captcha").value;
    var correctAnswer = document.getElementById("correctAnswer").value; // Holen Sie die korrekte Antwort aus dem versteckten Feld
    if (captcha != correctAnswer) {
        // Captcha wurde falsch ausgefüllt
        alert("Bitte geben Sie die richtige Antwort auf die Rechenaufgabe ein.");
        return false;
    }

    // Überprüfe die Zeit, die seit dem Start vergangen ist
    var formEndTime = new Date().getTime();
    var timeTaken = (formEndTime - formStartTime) / 1000; // Zeit in Sekunden

    if (timeTaken < 5) {
        // Formular wurde zu schnell ausgefüllt – vermutlich ein Bot
        alert("Formular zu schnell ausgefüllt. Bitte nehmen Sie sich etwas mehr Zeit.");
        return false;
    }

    // Weitere Validierungen

    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const fields = [
        { id: 'firstname', pattern: /^[A-Za-zÄÖÜäöüß]+$/, errorMessage: 'Bitte nur Buchstaben im Vornamenfeld eingeben.' },
        { id: 'name', pattern: /^[A-Za-zÄÖÜäöüß]+$/, errorMessage: 'Bitte nur Buchstaben im Namensfeld eingeben.' },
        { id: 'company', pattern: /^[A-Za-z0-9\s]+$/, errorMessage: 'Bitte nur Buchstaben und Zahlen im Firmenfeld eingeben.', optional: true },
        { id: 'position', pattern: /^[A-Za-z\s]+$/, errorMessage: 'Bitte nur Buchstaben im Positionsfeld eingeben.', optional: true },
        { id: 'email', pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, errorMessage: 'Bitte eine gültige E-Mail-Adresse eingeben.' },
        { id: 'subject', pattern: /.+/, errorMessage: 'Betreff darf nicht leer sein.' },
        { id: 'message', pattern: /.+/, errorMessage: 'Nachricht darf nicht leer sein.' }
    ];

    const validateField = (input, pattern, errorMessage, optional) => {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (!optional || input.value) {
            if (!pattern.test(input.value)) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('visible');
                input.classList.add('error', 'animated');
            } else {
                errorElement.classList.remove('visible');
                input.classList.remove('error', 'animated');
            }
        }
    };

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.addEventListener('input', () => validateField(input, field.pattern, field.errorMessage, field.optional));
        input.addEventListener('blur', () => validateField(input, field.pattern, field.errorMessage, field.optional));
    });

    document.querySelector('form').addEventListener('submit', function (event) {
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            validateField(input, field.pattern, field.errorMessage, field.optional);
            if (input.classList.contains('error')) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });
});