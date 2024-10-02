document.getElementById('accept-map').addEventListener('click', function() {
    // Verstecke das Overlay
    document.getElementById('consent-overlay').style.display = 'none';
    document.getElementById('background-blur').style.display = 'none';
    
    // Zeige das Karten-Element an und stelle sicher, dass es die volle Größe hat
    var map = document.getElementById('map');
    map.style.display = 'block';
    map.style.width = '100%';
    map.style.height = '100%';

    // Google Maps iframe laden
    var iframe = document.getElementById('google-map');
    iframe.src = iframe.getAttribute('data-src');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
  });