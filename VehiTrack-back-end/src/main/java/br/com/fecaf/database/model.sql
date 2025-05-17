-- Criação do banco e seleção
CREATE DATABASE db_vehitrack;
USE db_vehitrack;

-- Tabela de Marcas
CREATE TABLE marca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela de Tipos de Veículo
CREATE TABLE tipo_veiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

-- Tabela de Modelos
CREATE TABLE modelo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca_id INT NOT NULL,
    tipo_veiculo_id INT NOT NULL,
    FOREIGN KEY (marca_id) REFERENCES marca(id) ON DELETE CASCADE,
    FOREIGN KEY (tipo_veiculo_id) REFERENCES tipo_veiculo(id) ON DELETE CASCADE
);

-- Tabela de Usuários
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('ADMIN', 'OPERADOR') NOT NULL DEFAULT 'OPERADOR',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Veículos
CREATE TABLE veiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo_id INT NOT NULL,
    ano_fabricacao INT NOT NULL,
    cor VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quilometragem INT NOT NULL,
    status_disponibilidade ENUM('DISPONIVEL', 'VENDIDO', 'INDISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (modelo_id) REFERENCES modelo(id) ON DELETE CASCADE
);

-- Tabela de Histórico de Atualizações de Veículos
CREATE TABLE historico_veiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    veiculo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    campo_modificado VARCHAR(100) NOT NULL,
    valor_antigo VARCHAR(255),
    valor_novo VARCHAR(255),
    data_modificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Inserir dados iniciais mínimos para evitar erro de FK

INSERT INTO marca (nome) VALUES ('Hyundai');
INSERT INTO tipo_veiculo (descricao) VALUES ('Carro');
INSERT INTO usuario (nome, email, senha, tipo) VALUES ('Admin', 'admin@vehitrack.com', 'senha123', 'ADMIN');

-- Agora insere o modelo com marca_id = 1 e tipo_veiculo_id = 1
INSERT INTO modelo (nome, marca_id, tipo_veiculo_id) VALUES ('HB20 Comfort 1.6', 1, 1);

-- Inserir veículo para teste
INSERT INTO veiculo (
    modelo_id,
    ano_fabricacao,
    cor,
    preco,
    quilometragem,
    status_disponibilidade
) VALUES (
    1,         -- modelo_id que existe na tabela modelo
    2022,
    'Prata',
    85000.00,
    32000,
    'DISPONIVEL'
);
