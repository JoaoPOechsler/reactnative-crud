--usar no console do MySQL para criar o banco e a tabela

CREATE DATABASE IF NOT EXISTS usuarios_db;

USE usuarios_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nome   VARCHAR(100) NOT NULL,
  email  VARCHAR(100) NOT NULL,
  senha  VARCHAR(100) NOT NULL DEFAULT '',
  perfil VARCHAR(50)  NOT NULL DEFAULT 'usuario'
);

-- Adiciona as colunas caso a tabela já exista sem elas
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS senha  VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS perfil VARCHAR(50)  NOT NULL DEFAULT 'usuario';

-- exemplo de insert
INSERT INTO usuarios (nome, email, senha, perfil) VALUES
  ('Joao', 'teste@gmail.com', '123456', 'admin'),
  ('Felippe', 'felippe@gmail.com', '123456', 'usuario');
