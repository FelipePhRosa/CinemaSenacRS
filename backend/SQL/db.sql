CREATE DATABASE Cinema;
USE Cinema;

CREATE TABLE Diretor (
  id_diretor INT PRIMARY KEY IDENTITY(1,1),
  nameDiretor VARCHAR(100) NOT NULL,
  ageDiretor TINYINT NOT NULL,
  nationality VARCHAR(60) NOT NULL
);

CREATE TABLE Filmes (
  id_filme INT PRIMARY KEY IDENTITY(1,1),
  title VARCHAR(100) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  release_year INT NOT NULL,
  id_diretor INT NOT NULL,
  FOREIGN KEY (id_diretor) REFERENCES Diretor(id_diretor) ON DELETE SET NULL,
  id_ator INT NOT NULL,
  FOREIGN KEY (id_ator) REFERENCES Atores(id_ator) ON DELETE SET NULL
);

CREATE TABLE ATORES (
  id_ator INT PRIMARY KEY IDENTITY(1,1),
  nameAtor VARCHAR(100) NOT NULL,
  ageAtor TINYINT NOT NULL,
  nationality VARCHAR(60) NOT NULL
);