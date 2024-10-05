<?php
include 'config.php';

// Criar tabela de profissionais
$sql_profissionais = "CREATE TABLE IF NOT EXISTS profissionais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    descricao TEXT,
    youtube VARCHAR(255),
    instagram VARCHAR(100),
    website VARCHAR(255),
    logo VARCHAR(255),
    pago BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Criar tabela de administradores
$sql_admins = "CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_first_access BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Inserir admin padrão
$sql_insert_admin = "INSERT INTO admins (username, password) 
                     SELECT 'admin', 'primeiro_acesso'
                     WHERE NOT EXISTS (SELECT 1 FROM admins WHERE username = 'admin')";

try {
    $conn->exec($sql_profissionais);
    $conn->exec($sql_admins);
    $conn->exec($sql_insert_admin);
    echo "Banco de dados configurado com sucesso!";
} catch(PDOException $e) {
    echo "Erro ao configurar o banco de dados: " . $e->getMessage();
}