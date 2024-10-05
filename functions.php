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

function getAllProfissionais($conn) {
    $stmt = $conn->query("SELECT * FROM profissionais ORDER BY nome");
    return $stmt->fetchAll();
}

function updateProfissional($conn, $id, $nome, $categoria, $cidade, $whatsapp, $descricao, $youtube, $instagram, $website, $pago) {
    $stmt = $conn->prepare("UPDATE profissionais SET nome = ?, categoria = ?, cidade = ?, whatsapp = ?, descricao = ?, youtube = ?, instagram = ?, website = ?, pago = ? WHERE id = ?");
    $stmt->execute([$nome, $categoria, $cidade, $whatsapp, $descricao, $youtube, $instagram, $website, $pago, $id]);
}

function deleteProfissional($conn, $id) {
    $stmt = $conn->prepare("DELETE FROM profissionais WHERE id = ?");
    $stmt->execute([$id]);
}

function togglePagoProfissional($conn, $id, $pago) {
    $stmt = $conn->prepare("UPDATE profissionais SET pago = ? WHERE id = ?");
    $stmt->execute([$pago, $id]);
}

function searchProfissionais($conn, $query) {
    $searchTerm = "%$query%";
    $stmt = $conn->prepare("SELECT * FROM profissionais WHERE nome LIKE ? OR categoria LIKE ? OR cidade LIKE ? ORDER BY nome");
    $stmt->execute([$searchTerm, $searchTerm, $searchTerm]);
    return $stmt->fetchAll();
}

function getProfissionaisByCategoria($conn, $categoria) {
    $stmt = $conn->prepare("SELECT * FROM profissionais WHERE categoria = ? AND pago = 1 ORDER BY nome");
    $stmt->execute([$categoria]);
    return $stmt->fetchAll();
}

function addCategoria($conn, $nome) {
    $stmt = $conn->prepare("INSERT INTO categorias (nome) VALUES (?) ON DUPLICATE KEY UPDATE nome = nome");
    $stmt->execute([$nome]);
}

function removeCategoria($conn, $nome) {
    $stmt = $conn->prepare("DELETE FROM categorias WHERE nome = ?");
    $stmt->execute([$nome]);
}

function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

function validateWhatsApp($whatsapp) {
    // Remove any non-digit characters
    $whatsapp = preg_replace('/\D/', '', $whatsapp);
    // Check if the number has 10-14 digits (international format)
    return preg_match('/^[1-9]\d{9,13}$/', $whatsapp);
}

function logAdminAction($conn, $adminId, $action) {
    $stmt = $conn->prepare("INSERT INTO admin_logs (admin_id, action) VALUES (?, ?)");
    $stmt->execute([$adminId, $action]);
}

function getAdminLogs($conn, $limit = 100) {
    $stmt = $conn->prepare("SELECT al.*, a.username FROM admin_logs al JOIN admins a ON al.admin_id = a.id ORDER BY al.created_at DESC LIMIT ?");
    $stmt->execute([$limit]);
    return $stmt->fetchAll();
}

function getProfissionaisCount($conn) {
    $stmt = $conn->query("SELECT COUNT(*) as total FROM profissionais");
    $result = $stmt->fetch();
    return $result['total'];
}

function getPagosCount($conn) {
    $stmt = $conn->query("SELECT COUNT(*) as total FROM profissionais WHERE pago = 1");
    $result = $stmt->fetch();
    return $result['total'];
}

function getCategoriasCount($conn) {
    $stmt = $conn->query("SELECT COUNT(*) as total FROM categorias");
    $result = $stmt->fetch();
    return $result['total'];
}

function backupDatabase($conn, $backupDir) {
    $tables = [];
    $result = $conn->query("SHOW TABLES");
    while ($row = $result->fetch(PDO::FETCH_NUM)) {
        $tables[] = $row[0];
    }

    $backupFile = $backupDir . 'backup_' . date('Y-m-d_H-i-s') . '.sql';
    $output = '';

    foreach ($tables as $table) {
        $result = $conn->query("SELECT * FROM $table");
        $numFields = $result->columnCount();

        $output .= "DROP TABLE IF EXISTS $table;";
        $row2 = $conn->query("SHOW CREATE TABLE $table")->fetch(PDO::FETCH_NUM);
        $output .= "\n\n" . $row2[1] . ";\n\n";

        while ($row = $result->fetch(PDO::FETCH_NUM)) {
            $output .= "INSERT INTO $table VALUES(";
            for ($j = 0; $j < $numFields; $j++) {
                $row[$j] = addslashes($row[$j]);
                $row[$j] = str_replace("\n", "\\n", $row[$j]);
                if (isset($row[$j])) {
                    $output .= '"' . $row[$j] . '"';
                } else {
                    $output .= '""';
                }
                if ($j < ($numFields - 1)) {
                    $output .= ',';
                }
            }
            $output .= ");\n";
        }
        $output .= "\n\n";
    }

    file_put_contents($backupFile, $output);
    return $backupFile;
}