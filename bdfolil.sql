-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: bdfolil
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.18-MariaDB

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`),
  KEY `categoria_FK` (`id_estado`),
  CONSTRAINT `categoria_FK` FOREIGN KEY (`id_estado`) REFERENCES `estado_categoria` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Textiles',NULL,NULL,1),(2,'Joyeria',NULL,NULL,2),(3,'Artesania',NULL,'2021-05-04 02:49:30',1),(4,'Gastronomia',NULL,NULL,1),(5,'Medicinal','2021-05-04 02:53:05','2021-06-24 01:05:31',2);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaborador`
--

DROP TABLE IF EXISTS `colaborador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colaborador` (
  `id_colaborador` int(11) NOT NULL AUTO_INCREMENT,
  `correo_colab` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `password_colab` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_colab` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `apellido_colab` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `id_privilegio` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `token` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono_colab` int(11) NOT NULL,
  PRIMARY KEY (`id_colaborador`),
  KEY `colaborador_privilegio` (`id_privilegio`),
  KEY `colaborador_estado` (`id_estado`),
  CONSTRAINT `colaborador_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado_colaborador` (`id_estado`),
  CONSTRAINT `colaborador_privilegio` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegio` (`id_privilegio`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaborador`
--

LOCK TABLES `colaborador` WRITE;
/*!40000 ALTER TABLE `colaborador` DISABLE KEYS */;
INSERT INTO `colaborador` VALUES (1,'andreapaillao@gmail.com','4c882dcb24bcb1bc225391a602feca7c','Andrea','Paillao',1,1,NULL,'2021-05-02 00:57:21','ba5b676094871e2ec33f7fe98c917f82c7acef206a193522cb1bcb42bcd288c484461ba5b676094871e2ec33f7fe98c917f82c7acef206a193522cb1bcb42bcd288c484461',935772186),(2,'mcastillo@gmail.com','4c882dcb24bcb1bc225391a602feca7c','Maria','Castillo',3,1,NULL,'2021-05-01 00:27:31','42959275655cc41f5d81426670b91cbcc7acef206a193522cb1bcb42bcd288c41938242959275655cc41f5d81426670b91cbcc7acef206a193522cb1bcb42bcd288c419382',983517042),(3,'luisacatalan67@gmail.com','4c882dcb24bcb1bc225391a602feca7c','Luisa','Catalan',2,2,NULL,'2021-04-27 02:43:53','f01022544bcd3a580bbe3602d5b8793dc7acef206a193522cb1bcb42bcd288c471873f01022544bcd3a580bbe3602d5b8793dc7acef206a193522cb1bcb42bcd288c471873',996553132),(4,'KR.F@gmail.com','3be2ad284d07ed6d58089eceeb3a7b47','Karla','Rios',3,1,'2021-05-02 02:22:28','2021-05-02 04:19:46',NULL,972330917),(5,'aravena_belen@gmail.com','5b82ed9e845fd94ef6c2d3361a8bf5c1','Belen','Aravena',2,2,'2021-05-02 03:21:34','2021-05-02 04:19:55',NULL,993557582),(6,'s.v-p@gmail.com','2323e30513d5106f85ffa077cb1615bf','Sandra','Velar',3,2,'2021-06-22 23:27:04','2021-06-22 23:27:31',NULL,983667210),(7,'rosasMirta@gmail.com','6ca6770e31600f21adb785c0acdb71e2','Mirta','Rosas',2,1,'2021-06-24 01:04:11','2021-06-24 01:04:22',NULL,983256671);
/*!40000 ALTER TABLE `colaborador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confirmacion_pedido`
--

DROP TABLE IF EXISTS `confirmacion_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confirmacion_pedido` (
  `id_confirmacion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_confirmacion` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_confirmacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirmacion_pedido`
--

LOCK TABLES `confirmacion_pedido` WRITE;
/*!40000 ALTER TABLE `confirmacion_pedido` DISABLE KEYS */;
INSERT INTO `confirmacion_pedido` VALUES (1,'En espera',NULL,NULL),(2,'Cancelado',NULL,NULL),(3,'Confirmado',NULL,NULL);
/*!40000 ALTER TABLE `confirmacion_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_categoria`
--

DROP TABLE IF EXISTS `estado_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_categoria` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_categoria`
--

LOCK TABLES `estado_categoria` WRITE;
/*!40000 ALTER TABLE `estado_categoria` DISABLE KEYS */;
INSERT INTO `estado_categoria` VALUES (1,'Activo',NULL,NULL),(2,'Inactivo',NULL,NULL);
/*!40000 ALTER TABLE `estado_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_colaborador`
--

DROP TABLE IF EXISTS `estado_colaborador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_colaborador` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_colaborador`
--

LOCK TABLES `estado_colaborador` WRITE;
/*!40000 ALTER TABLE `estado_colaborador` DISABLE KEYS */;
INSERT INTO `estado_colaborador` VALUES (1,'Activo',NULL,NULL),(2,'Desvinculado',NULL,NULL);
/*!40000 ALTER TABLE `estado_colaborador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_pedido`
--

DROP TABLE IF EXISTS `estado_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_pedido` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `estado` int(11) DEFAULT NULL,
  `descripcion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_pedido`
--

LOCK TABLES `estado_pedido` WRITE;
/*!40000 ALTER TABLE `estado_pedido` DISABLE KEYS */;
INSERT INTO `estado_pedido` VALUES (1,1,'Recibido',NULL,NULL),(2,2,'En tienda',NULL,NULL),(3,3,'Atrasado',NULL,NULL),(4,4,'En proceso',NULL,NULL),(5,5,'Cancelado',NULL,NULL);
/*!40000 ALTER TABLE `estado_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_prov`
--

DROP TABLE IF EXISTS `estado_prov`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_prov` (
  `id_estado_prov` int(11) NOT NULL AUTO_INCREMENT,
  `estado_prov` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_estado_prov`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_prov`
--

LOCK TABLES `estado_prov` WRITE;
/*!40000 ALTER TABLE `estado_prov` DISABLE KEYS */;
INSERT INTO `estado_prov` VALUES (1,'Activo',NULL,NULL),(2,'Inactivo',NULL,NULL);
/*!40000 ALTER TABLE `estado_prov` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2014_10_12_200000_add_two_factor_columns_to_users_table',2),(5,'2019_12_14_000001_create_personal_access_tokens_table',2),(6,'2021_04_25_015731_create_sessions_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
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
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_solicitante` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `correo_solicitante` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono_solicitante` int(11) DEFAULT NULL,
  `descripcion_prod` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo_solicitud` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `precio_pedido` int(11) DEFAULT NULL,
  `id_prov` int(11) DEFAULT NULL,
  `id_confirmacion` int(11) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cantidad_producto` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_colaborador` int(11) DEFAULT NULL,
  `pedido_borrado` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_pedido`),
  KEY `pedido_prov` (`id_prov`),
  KEY `pedido_confir` (`id_confirmacion`),
  KEY `pedido_estado` (`id_estado`),
  KEY `pedido_poducto` (`id_producto`),
  KEY `pedido_colab` (`id_colaborador`),
  CONSTRAINT `pedido_colab` FOREIGN KEY (`id_colaborador`) REFERENCES `colaborador` (`id_colaborador`),
  CONSTRAINT `pedido_confir` FOREIGN KEY (`id_confirmacion`) REFERENCES `confirmacion_pedido` (`id_confirmacion`),
  CONSTRAINT `pedido_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado_pedido` (`id_estado`),
  CONSTRAINT `pedido_poducto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `pedido_prov` FOREIGN KEY (`id_prov`) REFERENCES `proveedor` (`id_prov`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'Rosa','rosafigueroa1989@gmail.com',934882104,'Vestido color celeste con flores amarillas','Via Tienda',20000,1,2,5,NULL,'2021-06-23 02:44:41',1,2,2,1),(2,'Gary','GHernandez@gmail.com',931123322,'','Via Tienda',11000,3,1,2,'2021-05-08 01:17:50','2021-06-24 05:26:39',3,1,4,1),(3,'Laura','GarciaL@gmail.com',987556324,'Color amarillo y blanco','Via Correo',15000,1,3,2,'2021-05-08 03:49:38','2021-05-08 03:49:38',1,2,4,0),(4,'David','davidMontoya89@gmail.com',977201954,'','Via Telefono',3500,3,3,1,'2021-05-13 00:38:11','2021-06-23 03:31:37',1,1,2,1),(5,'Helena','Helena08@gmail.com',956885243,'','Via Tienda',4000,2,1,2,'2021-06-23 02:02:29','2021-06-24 00:01:40',2,7,2,1),(6,'Helena','Helena08@gmail.com',956885243,'Jarron color celeste con lineas negras','Via Correo',8500,1,1,4,'2021-06-23 04:32:15','2021-06-23 04:32:15',1,8,2,0),(7,'David','davidMontoya89@gmail.com',977201954,'Largo de color gris con diseños de color negro.','Via Correo',30000,1,1,4,'2021-06-23 20:47:43','2021-06-23 20:56:57',2,3,2,1),(8,'Christian','chrisfv9@gmail.com',963095849,'Forma rectangular color café y detalles en amarillo y verde','Via Feria',8500,1,1,3,'2021-06-24 01:19:57','2021-06-24 01:24:34',1,8,2,1);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegio`
--

DROP TABLE IF EXISTS `privilegio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilegio` (
  `id_privilegio` int(11) NOT NULL AUTO_INCREMENT,
  `privilegio` int(11) NOT NULL,
  `descripcion_privilegio` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_privilegio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegio`
--

LOCK TABLES `privilegio` WRITE;
/*!40000 ALTER TABLE `privilegio` DISABLE KEYS */;
INSERT INTO `privilegio` VALUES (1,1,'Encargada de Local',NULL,NULL),(2,2,'Adm. Proveedor',NULL,NULL),(3,3,'Vendedora',NULL,NULL);
/*!40000 ALTER TABLE `privilegio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `precio_producto` int(11) DEFAULT NULL,
  `precio_tienda` int(11) DEFAULT NULL,
  `id_prov` int(11) DEFAULT NULL,
  `id_ubicacion` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `producto_FK` (`id_prov`),
  KEY `producto_FK_1` (`id_ubicacion`),
  KEY `producto_FK_2` (`id_categoria`),
  CONSTRAINT `producto_FK` FOREIGN KEY (`id_prov`) REFERENCES `proveedor` (`id_prov`),
  CONSTRAINT `producto_FK_1` FOREIGN KEY (`id_ubicacion`) REFERENCES `ubicacion` (`id_ubicacion`),
  CONSTRAINT `producto_FK_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Bolsa de nueces',7,2000,3500,3,1,NULL,'2021-05-13 05:39:47',4),(2,'Vestido',4,15000,20000,1,2,NULL,NULL,1),(3,'Poncho',5,10000,15000,1,3,NULL,'2021-05-13 05:39:21',1),(4,'Bolsa de Almendras',6,2500,5000,3,1,NULL,'2021-05-14 01:00:45',4),(5,'Menta',9,1000,2000,2,2,NULL,NULL,5),(6,'Manzanilla',3,1000,2000,2,3,'2021-05-13 05:31:25','2021-05-13 05:35:07',5),(7,'Harina Tostada',9,1000,2000,2,1,'2021-06-23 01:26:49','2021-06-23 01:29:52',4),(8,'Jarron',4,7000,8500,1,2,'2021-06-23 03:47:32','2021-06-23 03:47:32',3),(9,'Alfombra pequeña',5,5000,6500,5,1,'2021-06-24 01:22:26','2021-06-24 01:22:36',1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedor` (
  `id_prov` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_prov` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellido_prov` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `direccion_prov` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `telefono_prov` int(11) NOT NULL,
  `correo_prov` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cuentarut_prov` varchar(11) COLLATE utf8_spanish_ci DEFAULT NULL,
  `contrato_prov` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_estado_prov` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `calificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_prov`),
  KEY `proveedor_estado` (`id_estado_prov`),
  CONSTRAINT `proveedor_estado` FOREIGN KEY (`id_estado_prov`) REFERENCES `estado_prov` (`id_estado_prov`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Melanie','Rojas','Estacion Boroa',976201943,'melanierojas@gmail.com',NULL,NULL,1,NULL,'2021-06-24 05:26:02',4),(2,'Stefanie','Rojas','Nva. Imperial',974512098,'stefanierojas@gmail.com',NULL,NULL,1,NULL,'2021-06-18 02:07:11',1),(3,'Pamela','Ruiz','Labranza',984320165,'pruiz@gmail.com',NULL,NULL,1,NULL,'2021-06-24 06:05:22',3),(4,'Sara','Opazo','Carahue',953442988,'SO.1989@gmail.com',NULL,NULL,2,'2021-06-23 00:01:36','2021-06-23 03:32:11',5),(5,'Elizabeth','Cariqueo','Nva. Imperial',934809721,'elizaCariqueo@gmail.com',NULL,NULL,1,'2021-06-24 00:59:18','2021-06-24 01:00:56',2);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicacion` (
  `id_ubicacion` int(11) NOT NULL AUTO_INCREMENT,
  `descrip_ubicacion` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_ubicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'En bodega',NULL,NULL),(2,'En vitrina',NULL,NULL),(3,'En feria',NULL,NULL);
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bdfolil'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-24  1:29:13
