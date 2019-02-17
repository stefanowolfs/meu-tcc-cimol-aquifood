-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: aquifood
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drivers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `veiculo` enum('moto','carro') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpf` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `long` decimal(10,7) NOT NULL,
  `lat` decimal(10,7) NOT NULL,
  `restaurant_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `drivers_restaurant_id_index` (`restaurant_id`),
  CONSTRAINT `drivers_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES (1,'Charlotte Boyle','carro','4308693739464',64.3936520,-39.8739120,1,'2018-08-25 19:16:42','2018-08-25 19:16:42'),(2,'Janie Bruen','carro','6373388009403',88.8954630,-88.8334970,2,'2018-08-25 19:16:42','2018-08-25 19:16:42'),(3,'Dr. Eleanora Cronin Jr.','carro','7379338626835',-42.4029280,-68.0577710,3,'2018-08-25 19:16:42','2018-08-25 19:16:42'),(4,'Mattie Hackett','carro','5042890077804',53.5516520,-20.9535090,4,'2018-08-25 19:16:43','2018-08-25 19:16:43'),(5,'Ms. Lauretta Simonis I','carro','7434205357226',53.5458680,-46.7931750,5,'2018-08-25 19:16:43','2018-08-25 19:16:43'),(6,'Prof. Juwan Hettinger','carro','0816514701346',68.1308660,-28.4318310,6,'2018-08-25 19:16:43','2018-08-25 19:16:43'),(7,'Twila Beier III','carro','2954187861252',131.3981110,-66.3203850,7,'2018-08-25 19:16:43','2018-08-25 19:16:43'),(8,'Shaylee Bauch','carro','0559582396273',-114.0032300,-36.0189680,8,'2018-08-25 19:16:43','2018-08-25 19:16:43'),(9,'Gilda Kohler','carro','0140653512236',5.3529570,-21.6932320,9,'2018-08-25 19:16:43','2018-08-25 19:16:43'),(10,'Alvera Sporer','carro','8205489125585',-80.7700950,-78.1004350,10,'2018-08-25 19:16:44','2018-08-25 19:16:44');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `foods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
INSERT INTO `foods` VALUES (1,'Ea in.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(2,'Tempora.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(3,'Molestiae.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(4,'Voluptate.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(5,'Omnis.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(6,'Quasi.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(7,'Autem.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(8,'Vitae.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(9,'Quidem.','2018-08-25 19:16:41','2018-08-25 19:16:41'),(10,'Et.','2018-08-25 19:16:41','2018-08-25 19:16:41');
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods_orders`
--

DROP TABLE IF EXISTS `foods_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `foods_orders` (
  `food_id` int(10) unsigned NOT NULL,
  `order_id` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  KEY `foods_orders_food_id_foreign` (`food_id`),
  KEY `foods_orders_order_id_foreign` (`order_id`),
  CONSTRAINT `foods_orders_food_id_foreign` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`),
  CONSTRAINT `foods_orders_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods_orders`
--

LOCK TABLES `foods_orders` WRITE;
/*!40000 ALTER TABLE `foods_orders` DISABLE KEYS */;
INSERT INTO `foods_orders` VALUES (5,1,3),(2,1,3),(7,1,2),(10,2,3),(7,3,1),(5,3,2),(10,3,3),(1,4,3),(5,4,3),(10,5,2),(10,6,2),(1,6,2),(10,7,2),(9,8,1),(10,8,3),(8,9,3),(1,10,1);
/*!40000 ALTER TABLE `foods_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods_restaurants`
--

DROP TABLE IF EXISTS `foods_restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `foods_restaurants` (
  `food_id` int(10) unsigned NOT NULL,
  `restaurant_id` int(10) unsigned NOT NULL,
  `price` decimal(6,2) NOT NULL,
  KEY `foods_restaurants_food_id_foreign` (`food_id`),
  KEY `foods_restaurants_restaurant_id_foreign` (`restaurant_id`),
  CONSTRAINT `foods_restaurants_food_id_foreign` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`),
  CONSTRAINT `foods_restaurants_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods_restaurants`
--

LOCK TABLES `foods_restaurants` WRITE;
/*!40000 ALTER TABLE `foods_restaurants` DISABLE KEYS */;
INSERT INTO `foods_restaurants` VALUES (10,1,6.00),(10,1,6.00),(7,1,15.00),(9,1,15.00),(4,1,11.00),(10,1,11.00),(8,2,11.00),(9,2,11.00),(1,2,17.00),(3,2,17.00),(5,2,15.00),(2,2,15.00),(4,2,11.00),(10,2,11.00),(10,2,8.00),(2,2,8.00),(6,3,5.00),(9,3,5.00),(9,3,10.00),(9,3,10.00),(10,3,19.00),(9,3,19.00),(7,3,16.00),(8,3,16.00),(1,4,17.00),(9,4,17.00),(7,4,8.00),(4,4,8.00),(2,5,20.00),(6,5,20.00),(6,5,9.00),(1,5,9.00),(4,5,18.00),(7,5,18.00),(7,5,17.00),(4,5,17.00),(7,6,10.00),(2,6,10.00),(2,6,13.00),(6,6,13.00),(3,6,7.00),(6,6,7.00),(9,7,16.00),(2,7,16.00),(6,8,15.00),(5,8,15.00),(7,8,10.00),(7,8,10.00),(5,8,20.00),(8,8,20.00),(8,8,10.00),(2,8,10.00),(9,9,15.00),(8,9,15.00),(8,9,15.00),(10,9,15.00),(9,10,13.00),(9,10,13.00),(2,10,7.00),(3,10,7.00),(8,10,15.00),(1,10,15.00),(2,10,13.00),(4,10,13.00),(10,10,13.00),(1,10,13.00);
/*!40000 ALTER TABLE `foods_restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2018_08_04_171415_create_articles_table',1),(4,'2018_08_07_180222_create-restaurant-table',1),(5,'2018_08_07_180917_create-food-table',1),(6,'2018_08_07_223328_create-driver-table',1),(7,'2018_08_07_230831_create-order-table',1),(8,'2018_08_11_163855_added_foods_restaurants',1),(9,'2018_08_11_211329_added_foods_orders',1),(10,'2018_08_11_235550_added_orders_restaurants',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` enum('pendente','em andamento','entregue','cancelado') COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `driver_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_index` (`user_id`),
  KEY `orders_driver_id_index` (`driver_id`),
  CONSTRAINT `orders_driver_id_foreign` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'pendente',1,2,'2018-08-25 19:16:44','2018-08-25 19:16:44'),(2,'pendente',2,4,'2018-08-25 19:16:45','2018-08-25 19:16:45'),(3,'pendente',3,4,'2018-08-25 19:16:45','2018-08-25 19:16:45'),(4,'pendente',4,3,'2018-08-25 19:16:45','2018-08-25 19:16:45'),(5,'pendente',5,10,'2018-08-25 19:16:45','2018-08-25 19:16:45'),(6,'pendente',6,8,'2018-08-25 19:16:45','2018-08-25 19:16:45'),(7,'pendente',7,5,'2018-08-25 19:16:46','2018-08-25 19:16:46'),(8,'pendente',8,5,'2018-08-25 19:16:46','2018-08-25 19:16:46'),(9,'pendente',9,3,'2018-08-25 19:16:46','2018-08-25 19:16:46'),(10,'pendente',10,3,'2018-08-25 19:16:46','2018-08-25 19:16:46');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_restaurants`
--

DROP TABLE IF EXISTS `orders_restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_restaurants` (
  `restaurant_id` int(10) unsigned NOT NULL,
  `order_id` int(10) unsigned NOT NULL,
  KEY `orders_restaurants_restaurant_id_foreign` (`restaurant_id`),
  KEY `orders_restaurants_order_id_foreign` (`order_id`),
  CONSTRAINT `orders_restaurants_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orders_restaurants_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_restaurants`
--

LOCK TABLES `orders_restaurants` WRITE;
/*!40000 ALTER TABLE `orders_restaurants` DISABLE KEYS */;
INSERT INTO `orders_restaurants` VALUES (7,1),(3,2),(7,3),(1,4),(1,5),(8,6),(7,7),(8,8),(5,9),(1,10);
/*!40000 ALTER TABLE `orders_restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurants` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `long` decimal(10,7) NOT NULL,
  `lat` decimal(10,7) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `restaurants_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Mueller Group','waino.franecki@boehm.com',127.1679310,-20.5202190,'2018-08-25 19:16:41','2018-08-25 19:16:41'),(2,'Moore, Lind and Keebler','mohr.timmothy@yahoo.com',-93.4338290,-74.5142790,'2018-08-25 19:16:41','2018-08-25 19:16:41'),(3,'Shanahan, Will and Lebsack','tabitha67@gmail.com',-9.4011170,73.8805950,'2018-08-25 19:16:41','2018-08-25 19:16:41'),(4,'Wilkinson, Mayer and Pfannerstill','melissa09@hotmail.com',142.9307990,-60.9118360,'2018-08-25 19:16:41','2018-08-25 19:16:41'),(5,'Gusikowski-Wisoky','katarina25@ankunding.com',18.3378940,59.2247210,'2018-08-25 19:16:42','2018-08-25 19:16:42'),(6,'Schaden-Gutmann','khessel@gmail.com',153.2717830,-55.5765270,'2018-08-25 19:16:42','2018-08-25 19:16:42'),(7,'Smitham, Gutkowski and Batz','bechtelar.marlon@schuppe.com',57.1119960,17.4811990,'2018-08-25 19:16:42','2018-08-25 19:16:42'),(8,'Yundt PLC','gbradtke@rohan.org',-125.9777510,-16.9152310,'2018-08-25 19:16:42','2018-08-25 19:16:42'),(9,'Schiller-Beer','adooley@stroman.com',-110.4734560,-19.8390080,'2018-08-25 19:16:42','2018-08-25 19:16:42'),(10,'Quigley-Donnelly','sage08@predovic.info',-126.8190020,16.2962620,'2018-08-25 19:16:42','2018-08-25 19:16:42');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Malika Steuber PhD','jerrell.schiller@example.org','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','ciXSShKnZ6','2018-08-25 19:16:44','2018-08-25 19:16:44'),(2,'Miss Theresa Mills Jr.','thomas83@example.com','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','0vCqK6OmZE','2018-08-25 19:16:44','2018-08-25 19:16:44'),(3,'Mrs. Candace Ondricka PhD','mohammad37@example.net','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','eU5aX1zVto','2018-08-25 19:16:44','2018-08-25 19:16:44'),(4,'Ernestine Kulas','woodrow.will@example.net','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','HdTv3gW6my','2018-08-25 19:16:44','2018-08-25 19:16:44'),(5,'Clinton Mraz','nkuvalis@example.com','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','PIL7ZRSDgf','2018-08-25 19:16:44','2018-08-25 19:16:44'),(6,'Prof. Buford Harvey','mariah.kunze@example.net','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','MD5r8OTMhf','2018-08-25 19:16:44','2018-08-25 19:16:44'),(7,'Nina Bosco','fadel.eino@example.com','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','iVp4Y0umYo','2018-08-25 19:16:44','2018-08-25 19:16:44'),(8,'Nellie Collier','graham.eleonore@example.com','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','32a7LIyJJB','2018-08-25 19:16:44','2018-08-25 19:16:44'),(9,'Colby Funk PhD','vilma.weber@example.com','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','kE2yP1bvBG','2018-08-25 19:16:44','2018-08-25 19:16:44'),(10,'Prof. Alice Rohan DVM','simone16@example.com','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm','ZzMYt71PTZ','2018-08-25 19:16:44','2018-08-25 19:16:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-30 21:37:53
