CREATE TABLE profissionais (
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
);