CREATE DATABASE dbArteza;
USE dbArteza;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    username VARCHAR(20) UNIQUE,
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(45),
    imgPerfil VARCHAR(255) DEFAULT 'padrao.jpg',
    dtCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publicacao (
	idPublicacao INT AUTO_INCREMENT,
    fkUsuario INT,
    imgPublicacao VARCHAR(255),
    descricao VARCHAR(45),
    dtPublicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	titulo VARCHAR(45),
    isDeleted BOOLEAN DEFAULT false,
    PRIMARY KEY (idPublicacao, fkUsuario),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE curtida (
    idCurtida INT AUTO_INCREMENT,
    fkPublicacao INT,
    fkUsuario INT,
    dtCurtida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idCurtida, fkPublicacao, fkUsuario),
    FOREIGN KEY (fkPublicacao) REFERENCES publicacao(idPublicacao),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE comentario (
	idComentario INT AUTO_INCREMENT,
    fkPublicacao INT,
    fkUsuario INT,
    comentario VARCHAR(45),
    dtComentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkResposta INT,
    PRIMARY KEY (idComentario, fkPublicacao, fkUsuario),
	FOREIGN KEY (fkPublicacao) REFERENCES publicacao(idPublicacao),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkResposta) REFERENCES comentario(idComentario)
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

CREATE TABLE seguidor (
	fkSeguido INT,
    fkSeguidor INT,
	dtFollow TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (fkSeguido, fkSeguidor),
    FOREIGN KEY (fkSeguido) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkSeguidor) REFERENCES usuario(idUsuario)
);

-- Inserindo usuários
INSERT INTO usuario (nome, username, email, senha, imgPerfil) VALUES 
	('Moises', 'moiseshxs', 'moises@email.com', '12345678', '970a619cd1b06b8f1a85026eefc2fe1f0507d007cf2de4c4b03e2a94d1f5e31c12d2a08db65230e5d23c7ef9ee1bd8012b52ca26a4fe21eba23288bab6de5bcd.jpg'),
    ('Dudu', 'Ohata', 'dudu@gmail.com', '12345678', '57e24422d6e6df0571bd32d7b180dc853d8bd4a729bcb28b85b40c4de8ab3a4b22ebbc78c3f6d98bd06687fbf67e8a4c5bf3fa8eb56c0e514b17dd5c438cbe19.jfif'),
	('Sslarty', 'sslarty', 'sslarty@gmail.com', '12345678', 'f9731c945b5bc134ec4a4e3da35aa938db9ee5b05c5e671a1a42bdb9de75af588304eab75d4500d2a755508689d2ab57dbacd86701669a9a68fdca61d0e54906.png');
    
-- inserindo publicacoes
INSERT INTO publicacao (fkUsuario, imgPublicacao, descricao, titulo, dtPublicacao) VALUES
	(3, 'e6a38645a8741caa95b8cdf6e85cc572b3c33fe6f7c9c6987b3cd58ed84964178b2357ca282c2a57d808a91980eab6689cf455dfb52e3589ebd8e7369548613a.png', 'Goku - 2024', 'Goku', '2024-04-13 10:10:10'),
    (3, '81acb15b9c378fcf40db813b67877ec3fecabc1c0e7349745d4b4c141e5c83c9ca86405bfaf6c4aa54ab203b602f5534c5ffd60e12a21d83a3996b6a6b11f8a1.png', 'Calleri, Lucas e James - 2024', 'São Paulo Team', '2024-04-14 10:10:10'),
    (3, 'c0f260c3e0d85fa62dc35fa7a9a5d264347eccb5bcbc6180453c5ea238439b8a2d14cccabc47498cae25db2bdf93c508a733083a1232fe6956ab504740bccfa9.png', 'Cat Corinthians - 2024', 'Corinthians', '2024-04-20 10:10:10'),
    (3, '4980e363b5de08bb343b5c61370fa7d568bddbb5a7cfbcc1325dd7270a32b46fb3f4f85e466942fb349334a6f6b469c93a0e7cad3c48a4439beba2dd398bdf92.png', 'Prismo - 2024', 'Prismo', '2024-05-04 10:10:10'),
    (3, '76cb9fddde0c8489b67cec376be2fb20b957a27c850367bcc3b1b7beed812e64950e8edd1fd1b4bccb9e632eb660bdf5dda49f7d3180cc634d7fdb46e8e0c98b.png', 'Nico Williams - 2024', 'Nico Williams', '2024-05-05 10:10:10'),
    (3, 'fb8eb3df944f5e3de70dee47789d5e9a614eac92a5248e84d18c66b32afeec00f6a79f52174d7e64c3b6607b9f54f4c7ac804d024ea1627d8475e27ad6539ec5.png', 'Qual temporada mais te marcou?', 'El Casamiento Perfecto (2009-2018)', '2024-05-11 10:10:10'),
    (3, '3a4000a22ec999fa4ab460bd645adcd3915af342873edd644b328b20ecaa1d9052e8d9face8471fecea9799e3a2b3335c7671d766ee387fa5271124b3805f84c.png', 'Qual a música que você gosta do Bruno Mars?', 'Doo-Wops & Hooligans', '2024-05-13 10:10:10'),
    (3, 'dde30ec36e5888b462fed685057e6a25dde2b15f46f68a3274043a4c50aeee4c36b4b828c79811a028052e463a53e2cce91a397facc48dd6cafdfdff2e847566.png', 'Ajudar na briga ou bater o penalti?', 'Luís Fabiano', '2024-05-17 10:10:10'),
    (3, 'c4309a810731afcd17313f4fb872a1a360b801c0d63606a7f26a4a45eccee27b1923f0f08dc9e5fc200efa8d2e0d2ab9f3ed5b37bb4f36d7fc5888b0ae7467da.png', 'Rogério Ceni, o M1TO', 'Rogério Ceni', '2024-05-20 10:10:10'),
    (2, '0fc86963085d839e23d0021d1537d8c521e4542a912b450aef198bfd9b7ed909044b83d9884fae2863c4bced32b381a1f08a1f4a7018ce4f9cb1a6093663d811.png', 'Meu desenho feito para o Moises', 'Shimen Takezo', '2024-11-11 11:11:11'),
    (1, 'f4f62e412ce0f31e8ef10db5450bc1f512c3d116e34555565830448c93ee17e4eaaffdbdd1f7cf4ffda20274f6a56bde07961a3b32280076900ccd0a4abf2b95.jpg', 'Mascote da Vértice', 'Harpia', '2024-10-29 10:10:10'),
	(1, '2448660b9cb670ebfd83ed446a92ee3d3e88ade756a6ac138ac9435cae49a40f82a4859082d0b1fb0bd03d7407fdcf9531af6cffd9bbacd0494b5dd5f317b9e3.jpg', 'Ellie de The Last of Us - colorido', 'Ellie', '2024-11-19 10:10:10'),
	(1, 'a0b8a0de826d7aea13f82e0f5a7efbc2690a59185f0ff2d76a2abd70d9ef8582bf3b29b12734181917d82821e5dbcb2302ee85c1196a0d882ef82ef408c97908.jpg', 'Ellie sem colorir', 'Ellie lineart', '2024-11-17 10:10:10'),
    (1, 'ea3183b1924ccd3ebc58240ea33da5b2ea451a8d5f1ca392fb26240b4afa16d9f005842b1c815a7fa6292d5a66ee4f4ad0cb0de843e01d43e4ddc3214660f6c2.jpg', 'Personagem de anime 2', 'Samurai 2', '2024-11-15 10:10:10'),
	(1, 'cfa3e946fa1000a24b07b28195e8c7b535d9db8b9e8a669f0dd5b160efdea43742a3f658b2044a7e5b3c74f2e705badddb9e1a47a3f8f94fe7ea8d31b1c9ecbe.jpg', 'Personagem de anime samurai', 'Samurai', '2024-11-14 10:10:10'),
	(1, '44f57ad0c5663212b0247896b57fcc0011240ba16b1e6622cd32280c1385b5471c3239801834837cf1015b52b13ff40b5a4b5230146aadcd3a9d1c783ef8a21d.jpg', 'Personagem de The Last of Us 2', 'Abby', '2024-11-13 10:10:10'),
	(1, 'c8269e9bccdc3f030e54222470aefb4d71a4f204daf4a6dd5e467f9604271e88c2665a311ceb4781fbfa3683ee184369966ac24a055082003022819915910913.jpg', 'Ellie piscando', 'Ellie Piscando', '2024-11-11 10:10:10'),
	(1, '4e4953d48ee38031172952ef1f2b5ebb76a08cd29c5b3e2d7b06e2f2b5a4876d24f7ce26857532b4256c956f70745f93e1bfe1803df1ea423008a8824fd412a9.jpg', 'Macacos do artico', 'Artic Monkeys', '2024-11-07 10:10:10'),
    (1, 'fee34cebc16850f7cf54e1ed2dd06266d780d563c0a886881a0ec17692d15d7d7c8b163e2c192e6ecbbf0c32ca3427354249f0c5e3c59eaf80369927b2b35677.jpg', 'Personagem de COD MW2', 'R0-Z3', '2024-11-05 10:10:10'),
	(1, '935374ad135c4529bcab6bb7be796e98d1ef00e3a576fa3aed3fced6e62d96917aa457ae65ea52fcb5e155007b95e932c0a8b760d94f489e053696a58b636572.png', 'Personagem de Red Dead', 'Arthur Morgan', '2024-10-25 10:10:10'),
	(1, '83284b2767c32744b5acbd0652b59bc67b58d5491820dc52f0e9c397c4d981a466d14511b9b233d53e9d54dea679621297e5dc6732fbf19c4ec2d5ce739f5803.png', 'igu', 'MC Igu', '2024-10-15 10:10:10'),
	(1, 'e620ba2b655704b6a9b69275350d7d6807762b067d16f4d8fb1c7f6c84d28bfca8b6f264fc5dab9d34213f32f514d69f5d7cb46ee353bba21f7ba001334ba15e.png', 'Banana', 'Banana', '2024-10-10 10:10:10'),
	(1, '290f9f02621ae2762c7c2120648f9498bd321b341dc31d34629905b888ea18f5c3e54a397cd76fda8290c9d6a6dca972404d34b28885c77906b188988771abd2.png', 'Meu primeiro desenho digital', 'Cuphead', '2024-10-10 10:10:10');

-- inserindo curtidas
INSERT INTO curtida (fkPublicacao, fkUsuario) VALUES 
	(1, 1),
	(2, 1),
	(3, 1);

-- inserindo comentarios
INSERT INTO comentario (fkPublicacao, fkUsuario, comentario) VALUES 
	(2, 1, 'Essa arte é fantástica!');

-- inserindo resposta para comentario
-- INSERT INTO comentario (fkPublicacao, fkUsuario, comentario, fkResposta) VALUES 
-- 		(1, 2, 'Verdade', 2);

-- inserindo visualizacoes
INSERT INTO visualizacao (fkPublicacao, fkUsuario) VALUES 
	(1, 1),
	(1, 1),
	(2, 1);

-- Inserindo tags
INSERT INTO tag (nome) VALUES 
	('Série'),
	('Jogo'),
	('PixelArt'),
    ('Futebol'),
    ('Música'),
    ('Anime'),
    ('Animal'),
    ('Autoretrato'),
    ('Pintura'),
    ('LineArt'),
    ('Pintura'),
    ('Pintura a óleo'),
    ('Pintura a acrílica'),
    ('Pintura a guache'),
    ('Pintura a aquarela'),
    ('Retrato'),
    ('Paisagem'),
    ('Natureza-morta'),
    ('Mitológico'),
    ('Histórico'),
    ('Releitura'),
    ('Religioso'),
    ('Mural'),
    ('Abstratas'),
    ('Figurativas'),
    ('Representativa'),
    ('Digital');
    
-- associando tags a publicacoes
INSERT INTO tag_publicacao (fkPublicacao, fkTag) VALUES 
	(1, 6),
    (1, 3),
	(2, 3),
    (2, 4),
	(3, 3),
    (3, 7),
    (4, 3),
    (5, 3),
    (5, 4),
    (6, 3),
    (6, 4),
    (7, 3),
    (7, 5),
    (8, 3),
    (8, 4),
    (9, 3),
    (9, 4);