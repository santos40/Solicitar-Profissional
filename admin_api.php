<?php
session_start();
include 'config.php';
include 'functions.php';

header('Content-Type: application/json');

// Ensure the user is authenticated
if (!isAuthenticated()) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Route the API requests
$route = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

if ($route === '/api/admin/dashboard' && $method === 'GET') {
    getDashboardData($conn);
} elseif ($route === '/api/admin/categories' && $method === 'POST') {
    addCategory($conn);
} elseif (preg_match('/^\/api\/admin\/professionals\/(\d+)\/toggle-status$/', $route, $matches) && $method === 'POST') {
    toggleProfessionalStatus($conn, $matches[1]);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}

function getDashboardData($conn) {
    $data = [
        'totalProfissionais' => getProfissionaisCount($conn),
        'profissionaisPagos' => getPagosCount($conn),
        'orcamentosPendentes' => getOrcamentosCount($conn, 'pendente'),
        'profissionais' => getAllProfissionais($conn),
        'categorias' => getCategorias($conn),
        'orcamentosRecentes' => getOrcamentos($conn, null, 10)
    ];
    echo json_encode($data);
}

function addCategory($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $categoryName = sanitizeInput($data['name']);
    
    if (empty($categoryName)) {
        http_response_code(400);
        echo json_encode(['error' => 'Category name is required']);
        return;
    }

    try {
        addCategoria($conn, $categoryName);
        echo json_encode(['success' => true, 'message' => 'Category added successfully']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to add category']);
    }
}

function toggleProfessionalStatus($conn, $id) {
    $data = json_decode(file_get_contents('php://input'), true);
    $pago = $data['pago'] ? 1 : 0;

    try {
        togglePagoProfissional($conn, $id, $pago);
        echo json_encode(['success' => true, 'message' => 'Professional status updated successfully']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update professional status']);
    }
}