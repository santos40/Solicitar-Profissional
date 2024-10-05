<?php
function getProfissionais($conn) {
    $stmt = $conn->query("SELECT * FROM profissionais WHERE pago = 1 ORDER BY RAND() LIMIT 10");
    return $stmt->fetchAll();
}

function compartilhar($nome, $id) {
    $url = "https://viawhatsapp.com/perfil.php?id=" . $id;
    $texto = "Confira o perfil de " . $nome . " no ViaWhatsApp: " . $url;
    return urlencode($texto);
}