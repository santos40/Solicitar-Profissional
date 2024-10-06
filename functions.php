<?php

function getProfissionais($conn, $limit = 10, $offset = 0, $orderBy = 'cliques', $order = 'DESC') {
    $stmt = $conn->prepare("SELECT * FROM profissionais WHERE pago = 1 ORDER BY $orderBy $order LIMIT :limit OFFSET :offset");
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll();
}

function getCategorias($conn) {
    $stmt = $conn->query("SELECT * FROM categorias ORDER BY nome");
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
    $stmt = $conn->prepare("UPDATE profissionais SET nome = ?, categoria = ?, cidade = ?, whatsapp = ?, descricao = ?, youtube = ?, instagram = ?, website = ?, pago = ?, ultima_atualizacao = CURRENT_TIMESTAMP WHERE id = ?");
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
    $whatsapp = preg_replace('/\D/', '', $whatsapp);
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

function getMaisClicados($conn, $limit = 10) {
    $stmt = $conn->prepare("SELECT * FROM profissionais WHERE pago = 1 ORDER BY cliques DESC LIMIT ?");
    $stmt->execute([$limit]);
    return $stmt->fetchAll();
}

function incrementarCliques($conn, $id) {
    $stmt = $conn->prepare("UPDATE profissionais SET cliques = cliques + 1 WHERE id = ?");
    $stmt->execute([$id]);
}

function getOrcamentos($conn, $status = null) {
    $sql = "SELECT * FROM orcamentos";
    if ($status) {
        $sql .= " WHERE status = ?";
    }
    $sql .= " ORDER BY data_solicitacao DESC";
    
    $stmt = $conn->prepare($sql);
    if ($status) {
        $stmt->execute([$status]);
    } else {
        $stmt->execute();
    }
    return $stmt->fetchAll();
}

function updateOrcamentoStatus($conn, $id, $status) {
    $stmt = $conn->prepare("UPDATE orcamentos SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);
}

function deleteOrcamento($conn, $id) {
    $stmt = $conn->prepare("DELETE FROM orcamentos WHERE id = ?");
    $stmt->execute([$id]);
}

function addOrcamento($conn, $nome, $email, $telefone, $descricao, $categoria) {
    $stmt = $conn->prepare("INSERT INTO orcamentos (nome, email, telefone, descricao, categoria) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$nome, $email, $telefone, $descricao, $categoria]);
    return $conn->lastInsertId();
}