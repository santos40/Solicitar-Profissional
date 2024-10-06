-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS viawhatsapp;

-- Use the viawhatsapp database
USE viawhatsapp;

-- Create the profissionais table
CREATE TABLE IF NOT EXISTS profissionais (
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
    cliques INT DEFAULT 0,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the admins table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_first_access BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin user with the new password 'admin123'
INSERT INTO admins (username, password) 
VALUES ('admin', 'admin123')
ON DUPLICATE KEY UPDATE username = 'admin';

-- Create the orcamentos table
CREATE TABLE IF NOT EXISTS orcamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    status ENUM('pendente', 'em_andamento', 'concluido') DEFAULT 'pendente',
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the categorias table
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some initial categories
INSERT INTO categorias (nome) VALUES 
('Pedreiro'),
('Eletricista'),
('Encanador'),
('Pintor'),
('Jardineiro'),
('Diarista'),
('Carpinteiro')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);
