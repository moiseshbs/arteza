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
INSERT INTO usuario (nome, username, email, senha) VALUES 
	('Moises', 'moiseshxs', 'moises@email.com', '12345678');

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