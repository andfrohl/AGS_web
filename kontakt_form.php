<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $honeypot = $_POST["honeypot"];
    $startTime = $_POST["start_time"];
    $currentTime = time();
    $errors = [];

    // Honeypot-Überprüfung
    if (!empty($honeypot)) {
        $errors[] = "Spam erkannt.";
    }

    // Zeitbasierte Überprüfung
    if (($currentTime - $startTime) < 5) {
        $errors[] = "Formular zu schnell ausgefüllt.";
    }

    // Weitere Validierungen und Verarbeitung
    if (empty($errors)) {
        // Daten verarbeiten
        echo "Formular erfolgreich abgeschickt.";
    } else {
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $secret = 'DEIN_GEHEIMER_SCHLÜSSEL';
    $response = $_POST['h-captcha-response'];
    $remoteip = $_SERVER['REMOTE_ADDR'];

    $url = 'https://hcaptcha.com/siteverify';
    $data = array('secret' => $secret, 'response' => $response, 'remoteip' => $remoteip);

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ),
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $resultJson = json_decode($result);

    if ($resultJson->success != true) {
        echo '<p>Captcha-Überprüfung fehlgeschlagen. Bitte versuche es erneut.</p>';
    } else {
        $salutation = trim($_POST["salutation"]);
        $firstname = trim($_POST["firstname"]);
        $name = trim($_POST["name"]);
        $company = trim($_POST["company"]);
        $position = trim($_POST["position"]);
        $email = trim($_POST["email"]);
        $message = trim($_POST["message"]);
        $errors = [];

        // Vorname validieren
        if (!preg_match("/^[A-Za-z]+$/", $firstname)) {
            $errors[] = "Bitte nur Buchstaben im Vornamenfeld eingeben.";
        }

        // Name validieren
        if (!preg_match("/^[A-Za-z]+$/", $name)) {
            $errors[] = "Bitte nur Buchstaben im Namensfeld eingeben.";
        }

        // Firma validieren
        if (!empty($company) && !preg_match("/^[A-Za-z0-9\s]+$/", $company)) {
            $errors[] = "Bitte nur Buchstaben und Zahlen im Firmenfeld eingeben.";
        }

        // Position validieren
        if (!empty($position) && !preg_match("/^[A-Za-z\s]+$/", $position)) {
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
            echo "<p>Formular erfolgreich abgeschickt. Vielen Dank für deine Nachricht.</p>";
            // Weitere Verarbeitung der Daten
        }
    }
}
?>