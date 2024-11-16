CREATE DATABASE dbArteza;
USE dbArteza;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    username VARCHAR(20) UNIQUE,
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(45),
    imgPerfil VARCHAR(255),
    dtCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publicacao (
	idPublicacao INT AUTO_INCREMENT,
    fkUsuario INT,
    imgPublicacao VARCHAR(255),
    descricao VARCHAR(45),
    dtPublicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	titulo VARCHAR(45),
    PRIMARY KEY (idPublicacao, fkUsuario),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE curtida (
    qtdCurtida INT AUTO_INCREMENT UNIQUE,
    fkPublicacao INT,
    fkUsuario INT,
    dtCurtida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (fkPublicacao, fkUsuario),
    FOREIGN KEY (fkPublicacao) REFERENCES publicacao(idPublicacao),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE comentario (
	idComentario INT AUTO_INCREMENT,
    fkPublicacao INT,
    fkUsuario INT,
    comentario VARCHAR(45),
    dtComentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idComentario, fkPublicacao, fkUsuario),
	FOREIGN KEY (fkPublicacao) REFERENCES publicacao(idPublicacao),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE visualizacao (
	idVisualizacao INT AUTO_INCREMENT,
    fkPublicacao INT,
    fkUsuario INT,
    dtVisualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO usuario (nome, username, email, senha, imgPerfil) VALUES 
	('Moises', 'moiseshxs', 'moises@email.com', '12345678', '9d9ab97e0fca2375549542fa5b763b1f7bad7e292a904d9f9be55196b407078151d1d437889ca04bd2b97f3a43068118537673014c93b084aefc4e2629644c3a.jpg');

-- inserindo publicacoes
INSERT INTO publicacao (fkUsuario, imgPublicacao, descricao, titulo) VALUES 
	(1, '290f9f02621ae2762c7c2120648f9498bd321b341dc31d34629905b888ea18f5c3e54a397cd76fda8290c9d6a6dca972404d34b28885c77906b188988771abd2.png', 'Meu primeiro desenho digital', 'Cuphead'),
	(1, '83284b2767c32744b5acbd0652b59bc67b58d5491820dc52f0e9c397c4d981a466d14511b9b233d53e9d54dea679621297e5dc6732fbf19c4ec2d5ce739f5803.png', 'igu', 'MC Igu'),
	(1, 'e620ba2b655704b6a9b69275350d7d6807762b067d16f4d8fb1c7f6c84d28bfca8b6f264fc5dab9d34213f32f514d69f5d7cb46ee353bba21f7ba001334ba15e.png', 'Banana', 'Banana'),
    (1, 'fee34cebc16850f7cf54e1ed2dd06266d780d563c0a886881a0ec17692d15d7d7c8b163e2c192e6ecbbf0c32ca3427354249f0c5e3c59eaf80369927b2b35677.jpg', 'Personagem de COD MW2', 'R0-Z3'),
	(1, 'c8269e9bccdc3f030e54222470aefb4d71a4f204daf4a6dd5e467f9604271e88c2665a311ceb4781fbfa3683ee184369966ac24a055082003022819915910913.jpg', 'Ellie piscando', 'Ellie Piscando'),
	(1, '44f57ad0c5663212b0247896b57fcc0011240ba16b1e6622cd32280c1385b5471c3239801834837cf1015b52b13ff40b5a4b5230146aadcd3a9d1c783ef8a21d.jpg', 'Personagem de The Last of Us 2', 'Abby'),
	(1, '4e4953d48ee38031172952ef1f2b5ebb76a08cd29c5b3e2d7b06e2f2b5a4876d24f7ce26857532b4256c956f70745f93e1bfe1803df1ea423008a8824fd412a9.jpg', 'Macacos do artico', 'Artic Monkeys'),
    (1, 'f4f62e412ce0f31e8ef10db5450bc1f512c3d116e34555565830448c93ee17e4eaaffdbdd1f7cf4ffda20274f6a56bde07961a3b32280076900ccd0a4abf2b95.jpg', 'Mascote da Vértice', 'Harpia'),
	(1, '935374ad135c4529bcab6bb7be796e98d1ef00e3a576fa3aed3fced6e62d96917aa457ae65ea52fcb5e155007b95e932c0a8b760d94f489e053696a58b636572.png', 'Personagem de Red Dead', 'Arthur Morgan'),
	(1, 'cfa3e946fa1000a24b07b28195e8c7b535d9db8b9e8a669f0dd5b160efdea43742a3f658b2044a7e5b3c74f2e705badddb9e1a47a3f8f94fe7ea8d31b1c9ecbe.jpg', 'Personagem de anime samurai', 'Samurai'),
    (1, 'ea3183b1924ccd3ebc58240ea33da5b2ea451a8d5f1ca392fb26240b4afa16d9f005842b1c815a7fa6292d5a66ee4f4ad0cb0de843e01d43e4ddc3214660f6c2.jpg', 'Personagem de anime 2', 'Samurai 2'),
	(1, 'a0b8a0de826d7aea13f82e0f5a7efbc2690a59185f0ff2d76a2abd70d9ef8582bf3b29b12734181917d82821e5dbcb2302ee85c1196a0d882ef82ef408c97908.jpg', 'Ellie sem colorir', 'Ellie lineart'),
	(1, '2448660b9cb670ebfd83ed446a92ee3d3e88ade756a6ac138ac9435cae49a40f82a4859082d0b1fb0bd03d7407fdcf9531af6cffd9bbacd0494b5dd5f317b9e3.jpg', 'Ellie de The Last of Us - colorido', 'Ellie');

-- inserindo curtidas
INSERT INTO curtida (fkPublicacao, fkUsuario) VALUES 
	(1, 1),
	(2, 1),
	(3, 1);

-- inserindo comentarios
INSERT INTO comentario (fkPublicacao, fkUsuario, comentario) VALUES 
	(1, 1, 'Linda paisagem!'),
	(1, 1, 'Adorei as cores!'),
	(2, 1, 'Essa arte é fantástica!');

-- inserindo visualizacoes
INSERT INTO visualizacao (fkPublicacao, fkUsuario) VALUES 
	(1, 1),
	(1, 1),
	(2, 1);

-- Inserindo tags
INSERT INTO tag (nome) VALUES 
	('Série'),
	('Jogo'),
	('Artista');

-- associando tags a publicacoes
INSERT INTO tag_publicacao (fkPublicacao, fkTag) VALUES 
	(1, 1),
	(2, 2),
	(3, 3);

SELECT 
    DATE_FORMAT(base.mes_referencia, '%M') AS mes,
    IFNULL(publicacoes.total_publicacao, 0) AS publicacao,
    IFNULL(comentarios.total_comentario, 0) AS comentario,
    IFNULL(curtidas.total_curtida, 0) AS curtida,
    IFNULL(visualizacoes.total_visualizacao, 0) AS visualizacao
FROM (
    SELECT DISTINCT DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia
    FROM publicacao
    UNION
    SELECT DISTINCT DATE_FORMAT(dtComentario, '%Y-%m-01')
    FROM comentario
    UNION
    SELECT DISTINCT DATE_FORMAT(dtCurtida, '%Y-%m-01')
    FROM curtida
    UNION
    SELECT DISTINCT DATE_FORMAT(dtVisualizacao, '%Y-%m-01')
    FROM visualizacao
) AS base

LEFT JOIN (
    SELECT 
        DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia, 
        COUNT(*) AS total_publicacao
    FROM publicacao
    WHERE fkUsuario = 1
    GROUP BY mes_referencia
) AS publicacoes
ON base.mes_referencia = publicacoes.mes_referencia

LEFT JOIN (
    SELECT 
        DATE_FORMAT(dtComentario, '%Y-%m-01') AS mes_referencia, 
        COUNT(*) AS total_comentario
    FROM comentario
    JOIN publicacao ON comentario.fkPublicacao = publicacao.idPublicacao
    WHERE publicacao.fkUsuario = 1
    GROUP BY mes_referencia
) AS comentarios
ON base.mes_referencia = comentarios.mes_referencia

LEFT JOIN (
    SELECT 
        DATE_FORMAT(dtCurtida, '%Y-%m-01') AS mes_referencia, 
        COUNT(*) AS total_curtida
    FROM curtida
    JOIN publicacao ON curtida.fkPublicacao = publicacao.idPublicacao
    WHERE publicacao.fkUsuario = 1
    GROUP BY mes_referencia
) AS curtidas
ON base.mes_referencia = curtidas.mes_referencia

LEFT JOIN (
    SELECT 
        DATE_FORMAT(dtVisualizacao, '%Y-%m-01') AS mes_referencia, 
        COUNT(*) AS total_visualizacao
    FROM visualizacao
    JOIN publicacao ON visualizacao.fkPublicacao = publicacao.idPublicacao
    WHERE publicacao.fkUsuario = 1
    GROUP BY mes_referencia
) AS visualizacoes
ON base.mes_referencia = visualizacoes.mes_referencia

ORDER BY base.mes_referencia;


SELECT
			(SELECT COUNT(p.idPublicacao)
            FROM publicacao AS p
            WHERE p.fkUsuario = ${idUsuario}) AS publicacao,
            
            (SELECT COUNT(c.idComentario)
            FROM comentario AS c
            JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS comentario,
            
            (SELECT COUNT(l.qtdCurtida) 
            FROM curtida AS l
            JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS curtida,
            
            (SELECT COUNT(v.idVisualizacao) 
            FROM visualizacao AS v
            JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS visualizacao;
            
	SELECT COUNT(l.qtdCurtida) 
            FROM curtida AS l
            JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = 1;
            
            
	SELECT 
    IF(base.mes_referencia IS NULL, 'Total', DATE_FORMAT(base.mes_referencia, '%M')) AS mes,
    SUM(IFNULL(publicacoes.total_publicacao, 0)) AS publicacao,
    SUM(IFNULL(comentarios.total_comentario, 0)) AS comentario,
    SUM(IFNULL(curtidas.total_curtida, 0)) AS curtida,
    SUM(IFNULL(visualizacoes.total_visualizacao, 0)) AS visualizacao
FROM (
    SELECT DISTINCT DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia
    FROM publicacao
    UNION
    SELECT DISTINCT DATE_FORMAT(dtComentario, '%Y-%m-01')
    FROM comentario
    UNION
    SELECT DISTINCT DATE_FORMAT(dtCurtida, '%Y-%m-01')
    FROM curtida
    UNION
    SELECT DISTINCT DATE_FORMAT(dtVisualizacao, '%Y-%m-01')
    FROM visualizacao
) AS base

LEFT JOIN (
    SELECT 
        DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia, 
        COUNT(*) AS total_publicacao
    FROM publicacao
    WHERE fkUsuario = 1
    GROUP BY mes_referencia
) AS publicacoes
ON base.mes_referencia = publicacoes.mes_referencia

LEFT JOIN (
    SELECT 
        DATE_FORMAT(dtComentario, '%Y-%m-01') AS mes_referencia, 
        COUNT(*) AS total_comentario
    FROM comentario
    JOIN publicacao ON comentario.fkPublicacao = publicacao.idPublicacao
    WHERE publicacao.fkUsuario = 1
    GROUP BY mes_referencia
) AS comentarios
ON base.mes_referencia = comentarios.mes_referencia

LEFT JOIN (
    SELECT 
        DATE_FORMAT(dtCurtida, '%Y-%m-01') AS mes_referencia, 
        COUNT(*) AS total_curtida
    FROM curtida
    JOIN publicacao ON curtida.fkPublicacao = publicacao.idPublicacao
    WHERE publicacao.fkUsuario = 1
    GROUP BY mes_referencia
) AS curtidas
ON base.mes_referencia = curtidas.mes_referencia

LEFT JOIN (
    SELECT 
        DATE_FORMAT(dtVisualizacao, '%Y-%m-01') AS mes_referencia, 
        COUNT(*) AS total_visualizacao
    FROM visualizacao
    JOIN publicacao ON visualizacao.fkPublicacao = publicacao.idPublicacao
    WHERE publicacao.fkUsuario = 1
    GROUP BY mes_referencia
) AS visualizacoes
ON base.mes_referencia = visualizacoes.mes_referencia

GROUP BY base.mes_referencia WITH ROLLUP
HAVING base.mes_referencia IS NOT NULL OR mes = 'Total'
ORDER BY FIELD(mes, 'Total') DESC, base.mes_referencia;

 SELECT
			(SELECT COUNT(p.idPublicacao)
            FROM publicacao AS p
            WHERE p.fkUsuario = 1) AS publicacaoKpi,
            
            (SELECT COUNT(c.idComentario)
            FROM comentario AS c
            JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = 1) AS comentarioKpi,
            
            (SELECT COUNT(l.qtdCurtida) 
            FROM curtida AS l
            JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = 1) AS curtidaKpi,
            
            (SELECT COUNT(v.idVisualizacao) 
            FROM visualizacao AS v
            JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = 1) AS visualizacaoKpi;
            
            
        SELECT 
            DATE_FORMAT(base.mes_referencia, '%M') AS mes,
            IFNULL(publicacoes.total_publicacao, 0) AS publicacao,
            IFNULL(comentarios.total_comentario, 0) AS comentario,
            IFNULL(curtidas.total_curtida, 0) AS curtida,
            IFNULL(visualizacoes.total_visualizacao, 0) AS visualizacao
        FROM (
            SELECT DISTINCT DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia
            FROM publicacao
            UNION
            SELECT DISTINCT DATE_FORMAT(dtComentario, '%Y-%m-01')
            FROM comentario
            UNION
            SELECT DISTINCT DATE_FORMAT(dtCurtida, '%Y-%m-01')
            FROM curtida
            UNION
            SELECT DISTINCT DATE_FORMAT(dtVisualizacao, '%Y-%m-01')
            FROM visualizacao
        ) AS base

        LEFT JOIN (
            SELECT 
                DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia, 
                COUNT(*) AS total_publicacao
            FROM publicacao
            WHERE fkUsuario = 1
            GROUP BY mes_referencia
        ) AS publicacoes
        ON base.mes_referencia = publicacoes.mes_referencia

        LEFT JOIN (
            SELECT 
                DATE_FORMAT(dtComentario, '%Y-%m-01') AS mes_referencia, 
                COUNT(*) AS total_comentario
            FROM comentario
            JOIN publicacao ON comentario.fkPublicacao = publicacao.idPublicacao
            WHERE publicacao.fkUsuario = 1
            GROUP BY mes_referencia
        ) AS comentarios
        ON base.mes_referencia = comentarios.mes_referencia

        LEFT JOIN (
            SELECT 
                DATE_FORMAT(dtCurtida, '%Y-%m-01') AS mes_referencia, 
                COUNT(*) AS total_curtida
            FROM curtida
            JOIN publicacao ON curtida.fkPublicacao = publicacao.idPublicacao
            WHERE publicacao.fkUsuario = 1
            GROUP BY mes_referencia
        ) AS curtidas
        ON base.mes_referencia = curtidas.mes_referencia

        LEFT JOIN (
            SELECT 
                DATE_FORMAT(dtVisualizacao, '%Y-%m-01') AS mes_referencia, 
                COUNT(*) AS total_visualizacao
            FROM visualizacao
            JOIN publicacao ON visualizacao.fkPublicacao = publicacao.idPublicacao
            WHERE publicacao.fkUsuario = 1
            GROUP BY mes_referencia
        ) AS visualizacoes
        ON base.mes_referencia = visualizacoes.mes_referencia,
        
        (SELECT COUNT(p.idPublicacao)
            FROM publicacao AS p
            WHERE p.fkUsuario = 1) AS publicacaoKpi,
            
        (SELECT COUNT(c.idComentario)
            FROM comentario AS c
            JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = 1) AS comentarioKpi,
            
        (SELECT COUNT(l.qtdCurtida) 
            FROM curtida AS l
            JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = 1) AS curtidaKpi,
            
        (SELECT COUNT(v.idVisualizacao) 
            FROM visualizacao AS v
            JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = 1) AS visualizacaoKpi
            
        ORDER BY base.mes_referencia;
        
SELECT t.nome, p.imgPublicacao FROM tag AS t
	JOIN tag_publicacao AS tp
		ON tp.fkTag = t.idTag
	JOIN publicacao AS p
		ON tp.fkPublicacao = p.idPublicacao;
        
         SELECT 
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario, 
            u.username,
            COUNT(DISTINCT l.qtdCurtida) AS curtida,
            COUNT(DISTINCT c.idComentario) AS comentario,
            COUNT(DISTINCT v.idVisualizacao) AS visualizacao
        FROM publicacao AS p
            INNER JOIN usuario AS u 
                ON p.fkUsuario = u.idUsuario
            LEFT JOIN curtida AS l
                ON l.fkPublicacao = p.idPublicacao
            LEFT JOIN comentario AS c
                ON c.fkPublicacao = p.idPublicacao
            LEFT JOIN visualizacao AS v
                ON v.fkPublicacao = p.idPublicacao
                GROUP BY 
                p.idPublicacao, 
                p.fkUsuario, 
                p.imgPublicacao, 
                p.descricao, 
                p.dtPublicacao,
                p.titulo, 
                u.idUsuario, 
                u.username
                ORDER BY curtida DESC LIMIT 1;
                
        SELECT 
            u.idUsuario,
            u.nome,
            u.username,
            u.imgPerfil,
            p.titulo,
            p.descricao,
            p.imgPublicacao
        FROM usuario AS u
            JOIN publicacao AS p
                ON p.fkUsuario = u.idUsuario
        WHERE u.nome LIKE 'moises'
        OR u.username LIKE '%${texto}%'
        OR p.titulo LIKE '%${texto}%'
        OR p.descricao LIKE '%${texto}%';