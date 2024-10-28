<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $honeypot = $_POST["honeypot"];
    $startTime = intval($_POST["start_time"]); // Sicherstellen, dass $startTime als Ganzzahl behandelt wird
    $currentTime = time();
    $jsEnabled = isset($_POST["jsEnabled"]) ? $_POST["jsEnabled"] : false;
    $captcha = isset($_POST["captcha"]) ? $_POST["captcha"] : '';
    $correctAnswer = isset($_POST["correctAnswer"]) ? $_POST["correctAnswer"] : '';
    $errors = [];

    // Honeypot-Überprüfung
    if (!empty($honeypot)) {
        $errors[] = "Spam erkannt.";
    }

    // Zeitbasierte Überprüfung
    if (($currentTime - $startTime) < 5) {
        $errors[] = "Formular zu schnell ausgefüllt.";
    }

    // Überprüfung, ob JavaScript aktiviert ist
    if (!$jsEnabled) {
        $errors[] = "Bitte aktivieren Sie JavaScript.";
    }

    // Rechenaufgabe überprüfen
    if ($captcha != $correctAnswer) {
        $errors[] = "Falsche Antwort auf die Rechenaufgabe.";
    }

    // Weitere Validierungen und Verarbeitung
    $salutation = trim($_POST["salutation"]);
    $firstname = trim($_POST["firstname"]);
    $name = trim($_POST["name"]);
    $company = trim($_POST["company"]);
    $position = trim($_POST["position"]);
    $email = trim($_POST["email"]);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Vorname validieren
    if (!preg_match("/^[A-Za-zÄÖÜäöüß]+$/", $firstname)) {
        $errors[] = "Bitte nur Buchstaben im Vornamenfeld eingeben.";
    }

    // Name validieren
    if (!preg_match("/^[A-Za-zÄÖÜäöüß]+$/", $name)) {
        $errors[] = "Bitte nur Buchstaben im Namensfeld eingeben.";
    }

    // Firma validieren
    if (!empty($company) && !preg_match("/^[A-Za-z0-9\sÄÖÜäöüß]+$/", $company)) {
        $errors[] = "Bitte nur Buchstaben und Zahlen im Firmenfeld eingeben.";
    }

    // Position validieren
    if (!empty($position) && !preg_match("/^[A-Za-z\sÄÖÜäöüß]+$/", $position)) {
        $errors[] = "Bitte nur Buchstaben im Positionsfeld eingeben.";
    }

    // E-Mail validieren
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Bitte eine gültige E-Mail-Adresse eingeben.";
    }

    // Nachricht validieren
    if (empty($message)) {
        $errors[] = "Nachricht darf nicht leer sein.";
    }

    // Fehler ausgeben oder Daten verarbeiten
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    } else {
        $to = "info@ags-engineering.de"; // Zieladresse hier eintragen
        $subject = "Neue Nachricht von der Webseite: $subject";
        $body = "<html><body>";
        $body .= "<p>Vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und werden uns so schnell wie möglich bei Ihnen melden.</p>";
        $body .= "<p>Hier sind die Details Ihrer Nachricht:</p>";
        $body .= "<p><strong>Anrede:</strong> $salutation<br>";
        $body .= "<strong>Vorname:</strong> $firstname<br>";
        $body .= "<strong>Name:</strong> $name<br>";
        $body .= "<strong>Firma:</strong> $company<br>";
        $body .= "<strong>Position:</strong> $position<br>";
        $body .= "<strong>E-Mail:</strong> $email<br>";
        $body .= "<strong>Nachricht:</strong><br>$message</p>";
        $body .= "<p>Mit freundlichen Grüßen,<br>Ihr AGS Team</p>";
        $body .= "<img src='https://www.ags-engineering.de/img/Logo%20AGS_2018_300_194.png' alt='Logo' style='width:300px;height:auto;'><br>";
        $body .= "</body></html>";
        $headers = "From: info@ags-engineering.de\r\n"; // Verwende eine gültige und aktive E-Mail-Adresse auf deiner Domain
        $headers .= "Reply-To: $email\r\n";
        $headers .= "CC: $email\r\n"; // Sendet eine Kopie an den Absender
        $headers .= "Content-type: text/html\r\n"; // Stellt sicher, dass die E-Mail als HTML gesendet wird
    
        if (mail($to, $subject, $body, $headers)) {
            echo "<p>Formular erfolgreich abgeschickt. Vielen Dank für Ihre Nachricht.</p>";
        } else {
            echo "<p>Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.</p>";
        }
    }
}
?>
