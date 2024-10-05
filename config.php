<?php
$host = 'localhost'; // Altere se o seu banco de dados estiver em um host diferente
$db   = 'viawhatsapp'; // Nome do seu banco de dados
$user = 'seu_usuario'; // Substitua pelo seu usuário do MySQL
$pass = 'sua_senha'; // Substitua pela sua senha do MySQL
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $conn = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // Em um ambiente de produção, você não deve exibir a mensagem de erro detalhada
    die("Erro de conexão com o banco de dados: " . $e->getMessage());
}