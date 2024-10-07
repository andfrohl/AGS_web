document.addEventListener('DOMContentLoaded', function () {
    const fields = [
        { id: 'firstname', pattern: /^[A-Za-z]+$/, errorMessage: 'Bitte nur Buchstaben im Vornamenfeld eingeben.' },
        { id: 'name', pattern: /^[A-Za-z]+$/, errorMessage: 'Bitte nur Buchstaben im Namensfeld eingeben.' },
        { id: 'company', pattern: /^[A-Za-z0-9\s]+$/, errorMessage: 'Bitte nur Buchstaben und Zahlen im Firmenfeld eingeben.', optional: true },
        { id: 'position', pattern: /^[A-Za-z\s]+$/, errorMessage: 'Bitte nur Buchstaben im Positionsfeld eingeben.', optional: true },
        { id: 'email', pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, errorMessage: 'Bitte eine gültige E-Mail-Adresse eingeben.' },
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
