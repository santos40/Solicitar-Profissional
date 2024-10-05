<?php
session_start();
include 'config.php';
include 'functions.php';

requireAuth();

$id = $_GET['id'] ?? null;
if (!$id) {
    header('Location: admin.php');
    exit;
}

deleteProfissional($conn, $id);
header('Location: admin.php');
exit;