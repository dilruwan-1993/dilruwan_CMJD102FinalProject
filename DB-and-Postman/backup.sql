-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.22 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pos_db
DROP DATABASE IF EXISTS `pos_db`;
CREATE DATABASE IF NOT EXISTS `pos_db` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pos_db`;

-- Dumping structure for table pos_db.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(250) DEFAULT NULL,
  `category_status` int NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table pos_db.category: ~0 rows (approximately)
DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `category_name`, `category_status`) VALUES
	(1, 'Grocery', 0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table pos_db.invoice
DROP TABLE IF EXISTS `invoice`;
CREATE TABLE IF NOT EXISTS `invoice` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `invoice_date` datetime DEFAULT NULL,
  `net_total` double DEFAULT NULL,
  `payment` double DEFAULT NULL,
  `invoice_status` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `fk_invoice_user1_idx` (`user_id`),
  CONSTRAINT `fk_invoice_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table pos_db.invoice: ~0 rows (approximately)
DELETE FROM `invoice`;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` (`invoice_id`, `invoice_date`, `net_total`, `payment`, `invoice_status`, `user_id`) VALUES
	(1, '2024-01-21 22:25:24', 9000, 10000, 1, 1);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;

-- Dumping structure for table pos_db.invoice_item
DROP TABLE IF EXISTS `invoice_item`;
CREATE TABLE IF NOT EXISTS `invoice_item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_qty` double DEFAULT NULL,
  `item_price` double DEFAULT NULL,
  `sub_total` double DEFAULT NULL,
  `invoice_id` int DEFAULT NULL,
  `product_stock_id` int DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `fk_invoice_item_invoice1_idx` (`invoice_id`),
  KEY `fk_invoice_item_product_stock1_idx` (`product_stock_id`),
  CONSTRAINT `fk_invoice_item_invoice1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`),
  CONSTRAINT `fk_invoice_item_product_stock1` FOREIGN KEY (`product_stock_id`) REFERENCES `product_stock` (`product_stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table pos_db.invoice_item: ~0 rows (approximately)
DELETE FROM `invoice_item`;
/*!40000 ALTER TABLE `invoice_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_item` ENABLE KEYS */;

-- Dumping structure for table pos_db.product
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(250) NOT NULL,
  `product_description` text,
  `product_img_path` text,
  `product_status` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_name_UNIQUE` (`product_name`),
  UNIQUE KEY `UK383i0awxqlq7pc33hil7afbgo` (`product_name`),
  KEY `fk_product_category_idx` (`category_id`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table pos_db.product: ~0 rows (approximately)
DELETE FROM `product`;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`product_id`, `product_name`, `product_description`, `product_img_path`, `product_status`, `category_id`) VALUES
	(1, 'Ala', 'Ala 1KG pack', 'https://media.istockphoto.com/id/1475113258/photo/raw-potatoes-freshly-cut-in-half-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=BwgBeKVDEqXSoTbCEtaU2F8PpIVspxCuBPx47hwv_YI=', 1, 1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for table pos_db.product_stock
DROP TABLE IF EXISTS `product_stock`;
CREATE TABLE IF NOT EXISTS `product_stock` (
  `product_stock_id` int NOT NULL AUTO_INCREMENT,
  `selling_price` double DEFAULT NULL,
  `qty` double NOT NULL,
  `unit_of_measure` varchar(45) NOT NULL,
  `product_stock_status` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `pack_size` double DEFAULT NULL,
  PRIMARY KEY (`product_stock_id`),
  KEY `fk_product_stock_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_stock_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table pos_db.product_stock: ~0 rows (approximately)
DELETE FROM `product_stock`;
/*!40000 ALTER TABLE `product_stock` DISABLE KEYS */;
INSERT INTO `product_stock` (`product_stock_id`, `selling_price`, `qty`, `unit_of_measure`, `product_stock_status`, `product_id`, `pack_size`) VALUES
	(1, 100, 110, 'KG', 1, 1, 1);
/*!40000 ALTER TABLE `product_stock` ENABLE KEYS */;

-- Dumping structure for table pos_db.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(150) NOT NULL,
  `user_full_name` varchar(250) NOT NULL,
  `user_password` text,
  `user_status` int NOT NULL,
  `user_role` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table pos_db.user: ~2 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `user_email`, `user_full_name`, `user_password`, `user_status`, `user_role`) VALUES
	(1, 'ravinath@gmail.com', 'Ravinath Perera', '$2a$10$ZKE1RhLLFL7UagVMQ2o/ZO1YOUPvasQtPdBpGTCPyfYLT4cYzMt.S', 1, 'ADMIN'),
	(2, 'dilruwan@gmail.com', 'Dilruwan Perera', '$2a$10$ZKE1RhLLFL7UagVMQ2o/ZO1YOUPvasQtPdBpGTCPyfYLT4cYzMt.S', 1, 'CASHIER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
