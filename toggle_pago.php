<?php
session_start();
include 'config.php';
include 'functions.php';

requireAuth();

$id = $_GET['id'] ?? null;
$pago = $_GET['pago'] ?? null;

if (!$id || !isset($pago)) {
    header('Location: admin.php');
    exit;
}

togglePagoProfissional($conn, $id, $pago);
header('Location: admin.php');
exit;