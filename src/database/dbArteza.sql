CREATE DATABASE dbArteza;
USE dbArteza;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    username VARCHAR(20),
    email VARCHAR(45),
    senha VARCHAR(45),
    imgPerfil VARCHAR(255),
    dtCadastro TIMESTAMP DEFAULT CURRENT_TIMES
);

CREATE TABLE publicacao (
	idPublicacao INT AUTO_INCREMENT,
    fkUsuario INT,
    imgPublicacao VARCHAR(255),
    descricao VARCHAR(45),
    dtPublicacao TIMESTAMP DEFAULT CURRENT_TIMES,
	titulo VARCHAR(45),
    PRIMARY KEY (idPublicacao, fkUsuario),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE curtida (
	idCurtida INT AUTO_INCREMENT,
    fkPublicacao INT,
    fkUsuario INT,
    dtCurtida TIMESTAMP DEFAULT CURRENT_TIMES,
    PRIMARY KEY (idCurtida, fkPublicacao, fkUsuario),
    FOREIGN KEY (fkPublicacao) REFERENCES publicacao(idPublicacao),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE comentario (
	idComentario INT AUTO_INCREMENT,
    fkPublicacao INT,
    fkUsuario INT,
    comentario VARCHAR(45),
    dtComentario TIMESTAMP DEFAULT CURRENT_TIMES,
    PRIMARY KEY (idComentario, fkPublicacao, fkUsuario),
	FOREIGN KEY (fkPublicacao) REFERENCES publicacao(idPublicacao),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE visualizacao (
	idVisualizacao INT AUTO_INCREMENT,
    fkPublicacao INT,
    fkUsuario INT,
    dtVisualizacao TIMESTAMP DEFAULT CURRENT_TIMES,
    PRIMARY KEY (idVisualizacao, fkPublicacao, fkUsuario),
	FOREIGN KEY (fkPublicacao) REFERENCES publicacao(idPublicacao),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE tag (
	idTag INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

CREATE TABLE tag_publicacao (
	fkPublicacao INT,
    fkTag INT,
    PRIMARY KEY (fkPublicacao, fkTag),
	FOREIGN KEY (fkPublicacao) REFERENCES publicacao(idPublicacao),
    FOREIGN KEY (fkTag) REFERENCES tag(idTag)
);

-- Inserindo usuários
INSERT INTO usuario (nome, username, email, senha, imgPerfil, dtCadastro) VALUES 
	('Ana Paula', 'ana', 'ana@gmail.com', 'senha123', 'ana.jpg', '2023-10-01'),
	('Bruno Almeida', 'bruno', 'bruno@gmail.com', 'senha456', 'bruno.jpg', '2023-10-02'),
	('Carla Mendes', 'carla', 'carla@gmail.com', 'senha789', 'carla.jpg', '2023-10-03');

-- inserindo publicacoes
INSERT INTO publicacao (fkUsuario, imgPublicacao, descricao, dtPublicacao) VALUES 
	(1, 'paisagem.jpg', 'Uma bela paisagem', '2023-10-10 10:00:00'),
	(2, 'arte_abstrata.jpg', 'Arte abstrata incrível', '2023-10-11 12:30:00'),
	(3, 'retrato.jpg', 'Retrato em preto e branco', '2023-10-12 15:20:00');

-- inserindo curtidas
INSERT INTO curtida (fkPublicacao, fkUsuario, dtCurtida) VALUES 
	(1, 2, '2023-10-10 10:05:00'),
	(1, 3, '2023-10-10 10:10:00'),
	(2, 1, '2023-10-11 12:35:00');

-- inserindo comentarios
INSERT INTO comentario (fkPublicacao, fkUsuario, comentario, dtComentario) VALUES 
	(1, 2, 'Linda paisagem!', '2023-10-10 10:06:00'),
	(1, 3, 'Adorei as cores!', '2023-10-10 10:12:00'),
	(2, 1, 'Essa arte é fantástica!', '2023-10-11 12:40:00');

-- inserindo visualizacoes
INSERT INTO visualizacao (fkPublicacao, fkUsuario, dtVisualizacao) VALUES 
	(1, 2, '2023-10-10 10:02:00'),
	(1, 3, '2023-10-10 10:04:00'),
	(2, 1, '2023-10-11 12:32:00');

-- Inserindo tags
INSERT INTO tag (nome) VALUES 
	('Natureza'),
	('Abstrato'),
	('Retrato');

-- associando tags a publicacoes
INSERT INTO tag_publicacao (fkPublicacao, fkTag) VALUES 
	(1, 1),
	(2, 2),
	(3, 3);

-- select total de curtidas de uma publicacao
SELECT COUNT(*) AS 'Total de curtidas' FROM curtida WHERE fkPublicacao = 1 AND fkUsuario = 1;
    
-- select total de comentarios de uma publicacao
SELECT COUNT(*) AS 'Total de comentarios' FROM comentario WHERE fkPublicacao = 2;

-- select total de visualizacoes de uma publicacao
SELECT COUNT(*) AS 'Total de visualizações' FROM visualizacao WHERE fkPublicacao = 1;

-- select total de curtidas recebidas em publicacoes de UM usuario
SELECT COUNT(c.idCurtida) AS 'Total de curtidas', u.username FROM curtida AS c
	JOIN publicacao AS p
		ON c.fkPublicacao = p.idPublicacao
	JOIN usuario AS u
		ON p.fkUsuario = u.idUsuario
			WHERE u.idUsuario = 1;
            
-- select do total de publicacoes de UM usuario
SELECT COUNT(p.idPublicacao) AS 'Total de publicações', u.username FROM publicacao AS p
	JOIN usuario as u
		ON p.fkUsuario = u.idUsuario
			WHERE u.idUsuario = 1;
            
-- select do total de visualizacoes recebidas de UM usuario
SELECT COUNT(v.idVisualizacao) AS 'Total de visualizações', u.username FROM visualizacao AS v
	JOIN publicacao AS p
		ON v.fkPublicacao = p.idPublicacao
	JOIN usuario AS u
		ON p.fkUsuario = u.idUsuario
			WHERE u.idUsuario = 1;
            
