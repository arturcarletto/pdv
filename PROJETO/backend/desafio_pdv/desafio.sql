-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para desafio
CREATE DATABASE IF NOT EXISTS `desafio` 
USE `desafio`;

-- Copiando estrutura para tabela desafio.pedido
CREATE TABLE IF NOT EXISTS `pedido` (
  `codigo` int NOT NULL,
  `data` datetime DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela desafio.pedido: ~1 rows (aproximadamente)
DELETE FROM `pedido`;
INSERT INTO `pedido` (`codigo`, `data`, `total`) VALUES
	(1, '2023-02-23 15:10:20', 155);

-- Copiando estrutura para tabela desafio.produto
CREATE TABLE IF NOT EXISTS `produto` (
  `codigo` int NOT NULL,
  `nome` varchar(255) NOT NULL DEFAULT '',
  `valor` float NOT NULL DEFAULT '0',
  `tipo` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`codigo`),
  KEY `fktipo` (`tipo`),
  CONSTRAINT `fktipo` FOREIGN KEY (`tipo`) REFERENCES `tipo_produto` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela desafio.produto: ~4 rows (aproximadamente)
DELETE FROM `produto`;
INSERT INTO `produto` (`codigo`, `nome`, `valor`, `tipo`) VALUES
	(1, 'Pão', 10, 1),
	(2, 'Picanha', 90, 1),
	(3, 'Maionese', 3.99, 1),
	(4, 'Celular xing-ling', 2000, 2);

-- Copiando estrutura para tabela desafio.produto_pedido
CREATE TABLE IF NOT EXISTS `produto_pedido` (
  `codigo` int NOT NULL,
  `pedido` int DEFAULT NULL,
  `produto` int DEFAULT NULL,
  `quantidade` int DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fkpedido` (`pedido`),
  KEY `fkproduto` (`produto`),
  CONSTRAINT `fkpedido` FOREIGN KEY (`pedido`) REFERENCES `pedido` (`codigo`),
  CONSTRAINT `fkproduto` FOREIGN KEY (`produto`) REFERENCES `produto` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela desafio.produto_pedido: ~3 rows (aproximadamente)
DELETE FROM `produto_pedido`;
INSERT INTO `produto_pedido` (`codigo`, `pedido`, `produto`, `quantidade`, `total`) VALUES
	(1, 1, 2, 2, 50),
	(2, 1, 3, 1, 5),
	(3, 1, 1, 20, 100);

-- Copiando estrutura para tabela desafio.tipo_produto
CREATE TABLE IF NOT EXISTS `tipo_produto` (
  `codigo` int NOT NULL,
  `nome` varchar(50) NOT NULL,
  `percentual_imposto` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela desafio.tipo_produto: ~2 rows (aproximadamente)
DELETE FROM `tipo_produto`;
INSERT INTO `tipo_produto` (`codigo`, `nome`, `percentual_imposto`) VALUES
	(1, 'Alimento', 10),
	(2, 'Eletrônico', 60);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
