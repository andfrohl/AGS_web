function validateForm() {
    let firstname = document.forms["contactForm"]["firstname"].value;
    let email = document.forms["contactForm"]["email"].value;
    let namePattern = /^[A-Za-z]+$/;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!namePattern.test(firstname)) {
        alert("Bitte nur Buchstaben im Vornamenfeld eingeben.");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Bitte eine gültige E-Mail-Adresse eingeben.");
        return false;
    }
    return true;
}