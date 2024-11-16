<?php
$host = 'localhost'; // Database host
$db   = 'viawhatsapp'; // Database name
$user = 'root'; // Database username (default for XAMPP/WAMP)
$pass = ''; // Database password (default empty for XAMPP/WAMP)
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $conn = new PDO($dsn, $user, $pass, $options);
    // Add this line to verify connection
    echo "<script>console.log('Database connected successfully')</script>";
} catch (\PDOException $e) {
    // Log error to console for debugging
    echo "<script>console.error('Database connection failed: " . addslashes($e->getMessage()) . "')</script>";
    die("Erro de conexão com o banco de dados");
}