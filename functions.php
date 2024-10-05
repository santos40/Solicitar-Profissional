<?php
function getProfissionais($conn) {
    $stmt = $conn->query("SELECT * FROM profissionais WHERE pago = 1 ORDER BY RAND() LIMIT 10");
    return $stmt->fetchAll();
}

function getCategorias($conn) {
    $stmt = $conn->query("SELECT DISTINCT categoria FROM profissionais ORDER BY categoria");
    return $stmt->fetchAll();
}

function compartilhar($nome, $id) {
    $url = "https://viawhatsapp.com/perfil.php?id=" . $id;
    $texto = "Confira o perfil de " . $nome . " no ViaWhatsApp: " . $url;
    return urlencode($texto);
}

function getProfissionalById($conn, $id) {
    $stmt = $conn->prepare("SELECT * FROM profissionais WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

function getAdminByUsername($conn, $username) {
    $stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    return $stmt->fetch();
}

function updateAdminPassword($conn, $adminId, $newPassword) {
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE admins SET password = ?, is_first_access = FALSE WHERE id = ?");
    $stmt->execute([$hashedPassword, $adminId]);
}

function isAuthenticated() {
    return isset($_SESSION['admin_id']);
}

function requireAuth() {
    if (!isAuthenticated()) {
        header('Location: admin_login.php');
        exit;
    }
}
