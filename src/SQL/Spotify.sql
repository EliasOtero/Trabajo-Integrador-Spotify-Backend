CREATE DATABASE  IF NOT EXISTS `spotify` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spotify`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: spotify
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `id_album` int NOT NULL AUTO_INCREMENT,
  `album` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `imagenportada` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `anio_publicacion` int DEFAULT NULL,
  `id_artista` int NOT NULL,
  `id_discografica` int NOT NULL,
  PRIMARY KEY (`id_album`),
  UNIQUE KEY `id_album_UNIQUE` (`id_album`),
  UNIQUE KEY `unique_artista_album` (`id_artista`,`album`),
  UNIQUE KEY `album_id_artista_album` (`id_artista`,`album`),
  KEY `fk_Album_Artistas1_idx` (`id_artista`),
  KEY `fk_Album_Discografia1_idx` (`id_discografica`),
  CONSTRAINT `album_ibfk_103` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id_artista`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `album_ibfk_104` FOREIGN KEY (`id_discografica`) REFERENCES `discografica` (`id_discografica`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'Is There Anybody Out There','imagenalbum.jpg',NULL,1,4),(2,'Radio sampler [U+200E]2xCD',NULL,NULL,1,4),(3,'Delicate Sound Of Thunder','imagenalbum.jpg',NULL,1,4),(4,'Abbey Road',NULL,NULL,4,5),(5,'Use Your Illusion II',NULL,NULL,5,6),(6,'Appetite for Destruction','imagenalbum.jpg',NULL,5,6),(7,'True Blue',NULL,NULL,7,7),(8,'Like A Virgin','imagenalbum.jpg',NULL,7,7),(9,'Fito Paez',NULL,NULL,8,4),(10,'Antología','imagenalbum.jpg',NULL,8,3),(11,'Diego Torres',NULL,NULL,9,4),(12,'Loba','imagenalbum.jpg',NULL,10,1),(13,'Pies Descalzos',NULL,NULL,10,3),(14,'Papi Juancho','imagenalbum.jpg',NULL,11,1),(15,'Vives',NULL,NULL,12,1),(16,'OCEAN','imagenalbum.jpg',NULL,13,3),(17,'Cello Concertos',NULL,NULL,14,27),(18,'Plays Weir, Finnissy, Newman And Skempton','imagenalbum.jpg',NULL,15,42),(19,'My father Knew Charles Ives and Harmonielehre',NULL,NULL,16,40),(20,'Pied Piper Fantasy','imagenalbum.jpg',NULL,17,46),(21,'Le Secret De La Vie',NULL,NULL,18,52),(22,'Solo Works','imagenalbum.jpg',NULL,19,34),(23,'Charlie Parker Sextet',NULL,NULL,20,32),(24,'Relaxin With The Miles Davis Quintet','imagenalbum.jpg',NULL,21,45),(25,'Dizzy Gillespie And His All-Stars',NULL,NULL,22,39),(26,'King Of The Tenor Sax','imagenalbum.jpg',NULL,23,28),(27,'Distinctive Song Styling',NULL,NULL,24,30),(28,'Yes Indeed!','imagenalbum.jpg',NULL,25,24),(29,'Chet Baker In New York',NULL,NULL,26,48),(30,'Son Con Guaguancó','imagenalbum.jpg',NULL,27,53),(31,'Maestra Vida',NULL,NULL,28,35),(32,'El Malo','imagenalbum.jpg',NULL,29,35),(33,'La Voz',NULL,NULL,30,36),(34,'Tito Rodriguez At The Palladium','imagenalbum.jpg',NULL,31,56),(35,'Amor Y Alegria',NULL,NULL,32,26),(36,'Adios Nonino','imagenalbum.jpg',NULL,33,54),(37,'Así Cantaba Carlitos',NULL,NULL,34,44),(38,'Cuando El Río Suena','imagenalbum.jpg',NULL,35,41),(39,'Alma De Bohemio',NULL,NULL,36,38),(40,'Aura','imagenalbum.jpg',NULL,37,51),(41,'Monton De Vida',NULL,NULL,38,33),(42,'Let Me Ride','imagenalbum.jpg',NULL,39,36),(43,'Kamikaze',NULL,NULL,40,23),(44,'Doggystyle','imagenalbum.jpg',NULL,41,29),(45,'The Black Album',NULL,NULL,42,49),(46,'Check Your Head','imagenalbum.jpg',NULL,43,25),(47,'Late Registration',NULL,NULL,44,50),(48,'Back To Mine','imagenalbum.jpg',NULL,45,43),(49,'Play It Loud!',NULL,NULL,46,37),(50,'Biosfera','imagenalbum.jpg',NULL,47,31),(51,'The Remixes',NULL,NULL,48,47),(52,'Ignition Key','imagenalbum.jpg',NULL,49,55),(53,'Dance Baby',NULL,NULL,50,33),(54,'Test Album',NULL,2000,51,57),(56,'The Poison',NULL,2005,53,58);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artista`
--

DROP TABLE IF EXISTS `artista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artista` (
  `id_artista` int NOT NULL AUTO_INCREMENT,
  `artista` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `imagen` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id_artista`),
  UNIQUE KEY `id_artistas_UNIQUE` (`id_artista`),
  UNIQUE KEY `nombre_UNIQUE` (`artista`),
  UNIQUE KEY `artista` (`artista`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artista`
--

LOCK TABLES `artista` WRITE;
/*!40000 ALTER TABLE `artista` DISABLE KEYS */;
INSERT INTO `artista` VALUES (1,'Pink Floyd','Pink Floyd.jpg'),(2,'AC/DC',NULL),(3,'The Rolling Stones','The Rolling Stones.jpg'),(4,'The Beatles',NULL),(5,'Guns\'n Roses',NULL),(6,'Linkin Park',NULL),(7,'Madonna','Madonna.jpg'),(8,'Fito Paez',NULL),(9,'Diego Torres','Diego Torres.jpg'),(10,'Shakira',NULL),(11,'Maluma','Maluma.jpg'),(12,'Carlos Vives',NULL),(13,'Karol G','Karol G.jpg'),(14,'Yo-Yo Ma',NULL),(15,'Michael Finnissy','Michael Finnissy.jpg'),(16,'John Adams',NULL),(17,'John Corigliano','John Corigliano.jpg'),(18,'Terry Riley',NULL),(19,'Brian John Peter Ferneyhough','Brian John Peter Ferneyhough.jpg'),(20,'Charlie Parker',NULL),(21,'MIles Davis','MIles Davis.jpg'),(22,'Dizzy Gillespie',NULL),(23,'Coleman Hawkins','Coleman Hawkins.jpg'),(24,'Billie Holiday',NULL),(25,'Ray Charles','Ray Charles.jpg'),(26,'Chet Baker',NULL),(27,'Celia Cruz','Celia Cruz.jpg'),(28,'Ruben Blades',NULL),(29,'Willie Colon','Willie Colon.jpg'),(30,'Hector Lavoe',NULL),(31,'Tito Rodriguez','Tito Rodriguez.jpg'),(32,'Luis Enrique',NULL),(33,'Astor Piazzolla','Astor Piazzolla.jpg'),(34,'Carlos Gardel',NULL),(35,'Adriana Varela','Adriana Varela.jpg'),(36,'Alberto Podestá',NULL),(37,'Bajofondo Tango Club','Bajofondo Tango Club.jpg'),(38,'Susana Rinaldi',NULL),(39,'Dr. Dre','Dr. Dre.jpg'),(40,'Eminem',NULL),(41,'Snoop Dogg','Snoop Dogg.jpg'),(42,'Jay-Z',NULL),(43,'Beastie Boys','Beastie Boys.jpg'),(44,'Kanye West',NULL),(45,'Carl Cox','Carl Cox.jpg'),(46,'Marco Carola',NULL),(47,'Oscar Mulero','Oscar Mulero.jpg'),(48,'Nina Kraviz',NULL),(49,'Adam Beyer','Adam Beyer.jpg'),(50,'Solomun',NULL),(51,'Test Artista',NULL),(53,'Bullet For My Valentine',NULL);
/*!40000 ALTER TABLE `artista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancion`
--

DROP TABLE IF EXISTS `cancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancion` (
  `id_cancion` int NOT NULL AUTO_INCREMENT,
  `cancion` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `duracion_seg` int NOT NULL,
  `reproducciones` bigint DEFAULT '0',
  `likes` bigint DEFAULT '0',
  `fecha_agregada` datetime DEFAULT NULL,
  `id_album` int DEFAULT NULL,
  PRIMARY KEY (`id_cancion`),
  KEY `fk_Canciones_Album1_idx` (`id_album`),
  CONSTRAINT `cancion_ibfk_1` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancion`
--

LOCK TABLES `cancion` WRITE;
/*!40000 ALTER TABLE `cancion` DISABLE KEYS */;
INSERT INTO `cancion` VALUES (1,'In The Flesh',195,1000050,7500,'2025-10-11 21:40:48',1),(2,'The Thin Ice',149,850050,7600,'2025-10-11 21:40:48',1),(3,'Gone For Bad',215,1200400,6500,'2025-10-11 21:40:48',2),(4,'Fink Is The King',189,218500,8600,'2025-10-11 21:40:48',2),(5,'Shine On You Crazy Diamond',692,210000,4500,'2025-10-11 21:40:48',3),(6,'Yet Another Movie',246,4500668,1500,'2025-10-11 21:40:48',3),(7,'Oh! Darling',196,1598634,256986,'2025-10-11 21:40:48',4),(8,'Come Together',252,3568946,103569,'2025-10-11 21:40:48',4),(9,'Something',182,628634,5698,'2025-10-11 21:40:48',4),(10,'The End',123,68946,3569,'2025-10-11 21:40:48',4),(11,'4.29',180,1000,8,'2025-10-11 21:40:48',NULL),(12,'Open Your Heart',248,2500245,1785444,'2025-10-11 21:40:48',7),(13,'Material Girl',242,457788,68555,'2025-10-11 21:40:48',7),(14,'Open Your Heart',214,7500277,985444,'2025-10-11 21:40:48',7),(15,'Cancion Sobre Cancion',209,988100,578101,'2025-10-11 21:40:48',9),(16,'11 Y 6',153,1122554,245778,'2025-10-11 21:40:48',9),(17,'Y Dale Alegría A Mi Corazón',309,1985663,658874,'2025-10-11 21:40:48',10),(18,'El Amor Después Del Amor',306,2100358,35456,'2025-10-11 21:40:48',10),(19,'Estamos Juntos',263,389555,12488,'2025-10-11 21:40:48',11),(20,'No Tengas Miedo',255,258456,5247,'2025-10-11 21:40:48',11),(21,'Lo Hecho Esta Hecho',188,986444,657112,'2025-10-11 21:40:48',12),(22,'Loba',185,3150441,1244523,'2025-10-11 21:40:48',12),(23,'Años Luz',205,1335054,485777,'2025-10-11 21:40:48',12),(24,'Estoy Aqui',211,845300,247712,'2025-10-11 21:40:48',13),(25,'Hawai',191,1325450,857400,'2025-10-11 21:40:48',14),(26,'La Cura',154,750425,74856,'2025-10-11 21:40:48',14),(27,'Salida de escape',182,166582,37142,'2025-10-11 21:40:48',14),(28,'Ansiedad',204,500266,25004,'2025-10-11 21:40:48',14),(29,'Baby',241,70052,12488,'2025-10-11 21:40:48',16),(30,'Dices que te vas',187,1122554,35456,'2025-10-11 21:40:48',16),(31,'Hoy tengo tiempo',187,10458,24115,'2025-10-11 21:40:48',15),(32,'La tierra prometida',190,10047,3578,'2025-10-11 21:40:48',15),(33,'Mañana',149,8507,1574,'2025-10-11 21:40:48',15),(34,'In A Minor For Cello And Orchestra, Op',1112,15934,0,'2025-10-11 21:40:48',17),(35,'Prelude: Lento Allegro Maestoso',743,96306,4157,'2025-10-11 21:40:48',17),(36,'Intermezzo',368,95338,41,'2025-10-11 21:40:48',17),(37,'Reels',455,53402,340,'2025-10-11 21:40:48',18),(38,'An Mein Klavier',486,523452,984,'2025-10-11 21:40:48',18),(39,'Le Repos Sur Le Lit',422,589744,891,'2025-10-11 21:40:48',18),(40,'My father Knew Charles Ives and Harmonielehre',565,292364,9236,'2025-10-11 21:40:48',19),(41,'Harmonielehre I',1036,0,0,'2025-10-11 21:40:48',19),(42,'Harmonielehre II .The Anfortas Wound',748,2585604,984,'2025-10-11 21:40:48',19),(43,'Sunrise And The Piper s Song',562,666667,6,'2025-10-11 21:40:48',20),(44,'The Rats',83,5510,54,'2025-10-11 21:40:48',20),(45,'The Children is March',557,4295153,157,'2025-10-11 21:40:48',20),(46,'G. Song',182,535211,5352,'2025-10-11 21:40:48',21),(47,'MIce',127,564916,9,'2025-10-11 21:40:48',21),(48,'In The Summer',380,4701,984,'2025-10-11 21:40:48',21),(49,'Time And Motion Study I',505,673426,642,'2025-10-11 21:40:48',22),(50,'Bone Alphabet',154,578738,54,'2025-10-11 21:40:48',22),(51,'Time And Motion Study II',1339,714249,98,'2025-10-11 21:40:48',22),(52,'My Old Flame',191,811641,1164,'2025-10-11 21:40:48',23),(53,'Air Conditioning',184,592559,5,'2025-10-11 21:40:48',23),(54,'Crazeology',181,89423798,158,'2025-10-11 21:40:48',23),(55,'If I Were A Bell',490,949856,4985,'2025-10-11 21:40:48',24),(56,'You are My Everything',312,606381,54,'2025-10-11 21:40:48',24),(57,'It Could Happen To You',379,133346,0,'2025-10-11 21:40:48',24),(58,'A Hand Fulla Gimme',181,108807,880,'2025-10-11 21:40:48',25),(59,'Groovin High',145,161,95,'2025-10-11 21:40:48',25),(60,'Blue N Boogie',155,842894,39,'2025-10-11 21:40:48',25),(61,'I Surrender Dear',265,122628,4157,'2025-10-11 21:40:48',26),(62,'Smack',148,123,41,'2025-10-11 21:40:48',26),(63,'My Ideal',187,4552442,247,'2025-10-11 21:40:48',26),(64,'Lover Man Oh Where Can You Be?',193,136450,984,'2025-10-11 21:40:48',27),(65,'That Ole Devil Called Love',151,1325,891,'2025-10-11 21:40:48',27),(66,'No More',146,6261991,593,'2025-10-11 21:40:48',27),(67,'What Would I Do Without You',142,150271,545,'2025-10-11 21:40:48',28),(68,'It is All Right',129,666667,984,'2025-10-11 21:40:48',28),(69,'I Want To Know',137,971539,340,'2025-10-11 21:40:48',28),(70,'Fair Weather',420,164093,54,'2025-10-11 21:40:48',29),(71,'Polka Dots And Moonbeams',480,675467,157,'2025-10-11 21:40:48',29),(72,'Hotel 49',572,9681087,9236,'2025-10-11 21:40:48',29),(73,'Bemba Colora',512,177914,9,'2025-10-11 21:40:48',30),(74,'Son Con Guaguanco',151,931067,984,'2025-10-11 21:40:48',30),(75,'Es La Humanidad',135,7139063,6,'2025-10-11 21:40:48',30),(76,'El Velorio',304,100184,5352,'2025-10-11 21:40:48',31),(77,'Jazzy',251,205557,5,'2025-10-11 21:40:48',32),(78,'Willie Baby',145,7169667,158,'2025-10-11 21:40:48',32),(79,'Borinquen',190,4809732,642,'2025-10-11 21:40:48',32),(80,'El Todopoderoso',253,219379,54,'2025-10-11 21:40:48',33),(81,'Emborrachame De Amor',187,730767,0,'2025-10-11 21:40:48',33),(82,'Paraiso De Dulzura',269,266281,1164,'2025-10-11 21:40:48',33),(83,'Satin And Lace',255,233200,95,'2025-10-11 21:40:48',34),(84,'Mama Guela',142,15518541,39,'2025-10-11 21:40:48',34),(85,'Te Comiste Un Pan',142,210,4985,'2025-10-11 21:40:48',34),(86,'Desesperado',210,247022,41,'2025-10-11 21:40:48',35),(87,'Tu No Le Amas Le Temes',256,1582509,247,'2025-10-11 21:40:48',35),(88,'Comprendelo',312,145,880,'2025-10-11 21:40:48',35),(89,'Adiós Nonino',484,260843,891,'2025-10-11 21:40:48',36),(90,'Otoño Porteño',306,161387638,593,'2025-10-11 21:40:48',36),(91,'Michelangelo 70',192,27647926,4157,'2025-10-11 21:40:48',36),(92,'Chorra',130,274665,984,'2025-10-11 21:40:48',37),(93,'Dicen Que Dicen',133,1644186,340,'2025-10-11 21:40:48',37),(94,'Ebrio',136,54575,984,'2025-10-11 21:40:48',37),(95,'Aquello',260,288486,157,'2025-10-11 21:40:48',38),(96,'Don Carlos',215,167593735,9236,'2025-10-11 21:40:48',38),(97,'Milongón Del Guruyú',268,245,0,'2025-10-11 21:40:48',38),(98,'Alma De Bohemio',203,302308,984,'2025-10-11 21:40:48',39),(99,'Al Compas Del Corazon',132,3523283,6,'2025-10-11 21:40:48',39),(100,'Temblando',142,7657,54,'2025-10-11 21:40:48',39),(101,'solari yacumenza',390,316129,98,'2025-10-11 21:40:48',40),(102,'flor de piel',263,1738831,5352,'2025-10-11 21:40:48',40),(103,'Clueca la Cueca',370,1215,9,'2025-10-11 21:40:48',40),(104,'Soy Un Circo',271,329951,158,'2025-10-11 21:40:48',41),(105,'La Chanson Des Vieux Amants',309,1738,642,'2025-10-11 21:40:48',41),(106,'Gabbiani ',210,2315,54,'2025-10-11 21:40:48',41),(107,'Let Me Ride',661,343772,0,'2025-10-11 21:40:48',42),(108,'One Eight Seven',251,1801928,1164,'2025-10-11 21:40:48',42),(109,'The Ringer',322,357594,39,'2025-10-11 21:40:48',43),(110,'Greatest',208,11261476,4985,'2025-10-11 21:40:48',43),(111,'Lucky You',242,297944,54,'2025-10-11 21:40:48',43),(112,'E Side',321,714156,247,'2025-10-11 21:40:48',44),(113,'Bathtub',249,216025,880,'2025-10-11 21:40:48',44),(114,'G Funk Intro',135,30112,95,'2025-10-11 21:40:48',44),(115,'Encore',246,385271,593,'2025-10-11 21:40:48',45),(116,'Change Clothes',246,7557119,4157,'2025-10-11 21:40:48',45),(117,'Dirt Off Your Shoulder',251,3041,41,'2025-10-11 21:40:48',45),(118,'Jimmy James',187,990586,340,'2025-10-11 21:40:48',46),(119,'Funky Boss',137,291527,984,'2025-10-11 21:40:48',46),(120,'Pass The Mic',242,307209,891,'2025-10-11 21:40:48',46),(121,'Wake Up Mr. West',25,412880,9236,'2025-10-11 21:40:48',47),(122,'Heard Em Say',194,472110856,545,'2025-10-11 21:40:48',47),(123,'Touch The Sky',214,452957,984,'2025-10-11 21:40:48',47),(124,'Give Me Your Love',509,267016,6,'2025-10-11 21:40:48',48),(125,'Pacific 212',201,30755,54,'2025-10-11 21:40:48',48),(126,'Why Can not We Live Together',268,2162505,157,'2025-10-11 21:40:48',48),(127,'The Jingle',263,440523,5352,'2025-10-11 21:40:48',49),(128,'Magic Tribe',202,42540796,9,'2025-10-11 21:40:48',49),(129,'Kimbo',272,938720,984,'2025-10-11 21:40:48',49),(130,'Cova Rosa',319,543440,642,'2025-10-11 21:40:48',50),(131,'Oscos',324,310024,54,'2025-10-11 21:40:48',50),(132,'Doiras',313,319672,98,'2025-10-11 21:40:48',50),(133,'Aus ',555,481667,1164,'2025-10-11 21:40:48',51),(134,'Working',423,65968,5,'2025-10-11 21:40:48',51),(135,'Pain In The Ass',541,3227,158,'2025-10-11 21:40:48',51),(136,'Ignition Key',483,4819876,4985,'2025-10-11 21:40:48',52),(137,'The Convertion',137,1421912,54,'2025-10-11 21:40:48',52),(138,'Triangle',361,3200699,524545,'2025-10-11 21:40:48',52),(139,'Country Song',386,49580,880,'2025-10-11 21:40:48',53),(140,'Boys In The Hood',319,477856,95,'2025-10-11 21:40:48',53),(141,'Cloud Dancer',246,710247,39,'2025-10-11 21:40:48',53),(142,'Cancion de Prueba 1',442,0,0,NULL,54),(143,'Cancion de Prueba 2',348,0,0,NULL,54),(144,'Tears Don\'t Fall',348,12395532,67000,'2025-10-22 17:53:36',56);
/*!40000 ALTER TABLE `cancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancion_genero`
--

DROP TABLE IF EXISTS `cancion_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancion_genero` (
  `id_cancion` int NOT NULL,
  `id_genero` int NOT NULL,
  PRIMARY KEY (`id_cancion`,`id_genero`),
  KEY `fk_cancion_has_genero_genero1_idx` (`id_genero`),
  KEY `fk_cancion_has_genero_cancion1_idx` (`id_cancion`),
  CONSTRAINT `fk_cancion_has_genero_cancion1` FOREIGN KEY (`id_cancion`) REFERENCES `cancion` (`id_cancion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cancion_has_genero_genero1` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancion_genero`
--

LOCK TABLES `cancion_genero` WRITE;
/*!40000 ALTER TABLE `cancion_genero` DISABLE KEYS */;
INSERT INTO `cancion_genero` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(16,1),(17,1),(3,2),(6,3),(7,3),(8,3),(9,3),(12,3),(13,3),(14,3),(15,3),(18,3),(19,3),(20,3),(21,3),(22,3),(23,3),(24,3),(25,3),(77,3),(83,3),(127,3),(130,3),(34,4),(35,4),(36,4),(37,4),(38,4),(39,4),(40,4),(41,4),(42,4),(43,4),(44,4),(45,4),(46,4),(47,4),(48,4),(49,4),(50,4),(51,4),(52,5),(53,5),(54,5),(55,5),(56,5),(57,5),(58,5),(59,5),(60,5),(61,5),(62,5),(63,5),(64,5),(65,5),(66,5),(67,5),(68,5),(69,5),(70,5),(71,5),(72,5),(73,6),(74,6),(75,6),(76,6),(77,6),(78,6),(79,6),(80,6),(81,6),(82,6),(83,6),(84,6),(85,6),(86,6),(87,6),(88,6),(89,7),(90,7),(91,7),(92,7),(93,7),(94,7),(95,7),(96,7),(97,7),(98,7),(99,7),(100,7),(101,7),(102,7),(103,7),(104,7),(105,7),(106,7),(107,8),(108,8),(109,8),(110,8),(111,8),(112,8),(113,8),(114,8),(115,8),(116,8),(117,8),(118,8),(119,8),(120,8),(121,8),(122,8),(123,8),(124,9),(125,9),(126,9),(127,9),(128,9),(129,9),(130,9),(131,9),(132,9),(133,9),(134,9),(135,9),(136,9),(137,9),(138,9),(139,9),(140,9),(141,9),(144,12),(144,14);
/*!40000 ALTER TABLE `cancion_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datos_pago_usuario`
--

DROP TABLE IF EXISTS `datos_pago_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_pago_usuario` (
  `id_datos_pago` int NOT NULL AUTO_INCREMENT,
  `cbu` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `banco_codigo` varchar(15) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `nro_tarjeta_masc` varchar(4) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `mes_caduca` tinyint DEFAULT NULL,
  `anio_caduca` smallint DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `id_tipo_forma_pago` int NOT NULL,
  PRIMARY KEY (`id_datos_pago`),
  KEY `fk_Datos_pago_usuarios_Usuarios1_idx` (`id_usuario`),
  KEY `fk_datos_pago_usuario_tipo_forma_pago2_idx` (`id_tipo_forma_pago`),
  CONSTRAINT `datos_pago_usuario_ibfk_103` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `datos_pago_usuario_ibfk_104` FOREIGN KEY (`id_tipo_forma_pago`) REFERENCES `tipo_forma_pago` (`id_tipo_forma_pago`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_pago_usuario`
--

LOCK TABLES `datos_pago_usuario` WRITE;
/*!40000 ALTER TABLE `datos_pago_usuario` DISABLE KEYS */;
INSERT INTO `datos_pago_usuario` VALUES (1,NULL,NULL,NULL,NULL,NULL,1,1),(2,NULL,'1','1881',1,21,1,2),(3,NULL,'2','8181',10,30,2,3),(4,NULL,'17','0087',10,28,3,3),(5,NULL,NULL,NULL,NULL,NULL,4,1),(6,'3748',NULL,NULL,NULL,NULL,5,4),(7,'2854',NULL,NULL,NULL,NULL,6,4),(8,NULL,NULL,NULL,NULL,NULL,7,1),(9,NULL,'15','8431',8,24,8,2),(10,NULL,NULL,NULL,NULL,NULL,9,1),(11,'0002',NULL,NULL,NULL,NULL,10,4),(12,NULL,NULL,NULL,NULL,NULL,11,1),(13,NULL,'12','3237',12,21,12,2),(14,NULL,'19','5904',11,25,13,2),(15,'2077',NULL,NULL,NULL,NULL,14,4),(16,NULL,'10','8431',5,29,15,3),(17,NULL,'7','0005',4,20,16,3),(18,NULL,'12','0007',2,20,17,2),(19,NULL,'15','0009',3,30,18,2),(20,'4096',NULL,NULL,NULL,NULL,19,4),(21,NULL,'4','6300',1,21,11,2),(22,NULL,'2','1117',10,31,2,4),(23,NULL,'1','0000',12,21,3,2),(24,NULL,'1','5824',11,21,5,2),(25,NULL,'1','4654',11,21,5,3),(26,NULL,'5','4454',12,21,7,4),(27,NULL,'17','7879',11,25,15,2),(28,NULL,NULL,NULL,NULL,NULL,16,1),(29,'5478',NULL,NULL,NULL,NULL,16,4),(30,NULL,'17','5645',10,24,17,2),(31,NULL,'7','4654',10,22,11,2),(32,NULL,'7','6545',10,22,11,3),(33,NULL,NULL,NULL,NULL,NULL,18,1),(34,NULL,'7','7987',11,25,18,2),(35,NULL,'5','5454',10,23,7,2),(36,NULL,'2','8485',5,22,9,3),(37,NULL,'17','5645',10,24,10,2),(38,NULL,'7','4654',10,22,8,2),(39,NULL,'7','6545',10,22,6,3),(40,NULL,'4','6300',1,21,4,2),(41,NULL,'2','1117',10,31,3,3),(42,NULL,'1','0000',12,21,19,3),(43,'9485',NULL,NULL,NULL,NULL,11,4),(44,NULL,'BANK01','1234',12,2027,23,3),(45,NULL,'BANKO','1234',12,2030,24,3);
/*!40000 ALTER TABLE `datos_pago_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discografica`
--

DROP TABLE IF EXISTS `discografica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discografica` (
  `id_discografica` int NOT NULL AUTO_INCREMENT,
  `discografica` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `id_pais` int NOT NULL,
  PRIMARY KEY (`id_discografica`),
  UNIQUE KEY `unique_discografica_pais` (`discografica`,`id_pais`),
  UNIQUE KEY `discografica_discografica_id_pais` (`discografica`,`id_pais`),
  KEY `fk_discografica_Pais2_idx` (`id_pais`),
  CONSTRAINT `discografica_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discografica`
--

LOCK TABLES `discografica` WRITE;
/*!40000 ALTER TABLE `discografica` DISABLE KEYS */;
INSERT INTO `discografica` VALUES (23,'Aftermath Entertainment',1),(5,'Apple Records',2),(24,'Atlantic',1),(11,'Atlantic Recording Corporation',1),(10,'Atlantic Recording Corporation',4),(16,'BigHit Entertainment',6),(25,'Capitol Records',6),(26,'CBS',3),(27,'CBS Masterworks',7),(15,'Columbia Records',5),(28,'Commodore',1),(29,'Death Row Records',5),(30,'Decca',1),(31,'Detroit Underground',1),(32,'Dial Records',1),(57,'DISCOGRAFICA DE PRUEBA',10),(33,'Diynamic Music',7),(9,'Elektra Records LLC',2),(4,'EMI',2),(21,'Epic Records.',4),(34,'Etcetera Records B.V.',8),(35,'Fania Records',1),(6,'Geffen Records',1),(36,'Inca Records',9),(22,'Internet Money Records',5),(17,'Interscope Records',3),(37,'M nus',6),(18,'Ministry of Sound Recordings Limited',5),(38,'Music Hall',10),(39,'Musicraft',1),(40,'Naxos Records',1),(41,'ND Nueva Direccion En La Cultura',10),(42,'NMC',2),(43,'Octave',2),(44,'Odeon',10),(45,'Prestige',1),(13,'RCA Records',3),(46,'RCA Victor Red Seal',7),(47,'REKIDS',7),(12,'Rimas Entertainment LLC',5),(48,'Riverside Records',1),(49,'Roc-A-Fella Records',6),(50,'Roc-A-Fella Records, Universal Music',5),(7,'Sire Warner Bros',1),(51,'Sony Music',11),(1,'Sony Music Entertainment',1),(52,'Stip Record',12),(53,'Tico Records',1),(54,'Trova',13),(55,'Truesoul',14),(56,'UA Latino',3),(8,'UMG Recordings',3),(14,'Universal International Music BV',2),(2,'Universal Music Group',1),(58,'Visible Noise',15),(3,'Warner Music Group',1),(20,'White World Music',3),(19,'WK Records',1);
/*!40000 ALTER TABLE `discografica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `genero` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id_genero`),
  UNIQUE KEY `genero_UNIQUE` (`genero`),
  UNIQUE KEY `genero` (`genero`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (12,'Heavy metal'),(8,'Hip Hop'),(5,'Jazz'),(14,'Metalcore'),(4,'Música Clasica'),(3,'Pop'),(1,'Rock'),(6,'Salsa'),(2,'Soul'),(7,'Tango'),(9,'Techno');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id_pagos` int NOT NULL AUTO_INCREMENT,
  `fechaPago` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `importe` decimal(10,2) NOT NULL,
  `id_usuario` int NOT NULL,
  `id_suscripcion` int DEFAULT NULL,
  `id_datos_pago` int DEFAULT NULL,
  `id_tipo_forma_pago` int NOT NULL,
  PRIMARY KEY (`id_pagos`),
  KEY `fk_Pagos_Usuarios1_idx` (`id_usuario`),
  KEY `fk_pagos_tipo_forma_pago2_idx` (`id_tipo_forma_pago`),
  KEY `fk_pagos_suscripcion_idx` (`id_suscripcion`),
  KEY `fk_pagos_datos_pago_idx` (`id_datos_pago`),
  CONSTRAINT `pagos_ibfk_203` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_204` FOREIGN KEY (`id_suscripcion`) REFERENCES `suscripcion` (`id_suscripcion`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_205` FOREIGN KEY (`id_datos_pago`) REFERENCES `datos_pago_usuario` (`id_datos_pago`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_206` FOREIGN KEY (`id_tipo_forma_pago`) REFERENCES `tipo_forma_pago` (`id_tipo_forma_pago`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,'2020-01-01 00:00:00',0.00,1,NULL,NULL,1),(2,'2020-02-01 00:00:00',0.00,1,NULL,NULL,1),(3,'2020-02-01 00:00:00',100.00,2,NULL,NULL,3),(4,'2020-03-01 00:00:00',0.00,1,NULL,NULL,1),(5,'2020-03-01 00:00:00',100.00,6,NULL,NULL,3),(6,'2020-03-01 00:00:00',0.00,2,NULL,NULL,3),(7,'2020-03-01 00:00:00',0.00,3,NULL,NULL,3),(8,'2020-03-01 00:00:00',0.00,4,NULL,NULL,1),(9,'2020-03-01 00:00:00',100.00,7,NULL,NULL,1),(10,'2020-03-01 00:00:00',100.00,8,NULL,NULL,2),(11,'2020-03-01 00:00:00',500.00,9,NULL,NULL,1),(12,'2020-03-01 00:00:00',0.00,10,NULL,NULL,4),(13,'2020-03-01 00:00:00',100.00,11,NULL,NULL,2),(14,'2020-04-01 00:00:00',0.00,1,NULL,NULL,1),(15,'2020-04-01 00:00:00',100.00,2,NULL,NULL,4),(16,'2020-04-01 00:00:00',100.00,3,NULL,NULL,2),(17,'2020-04-01 00:00:00',100.00,4,NULL,NULL,2),(18,'2020-04-01 00:00:00',100.00,5,NULL,NULL,4),(19,'2020-04-01 00:00:00',500.00,6,NULL,NULL,3),(20,'2020-04-01 00:00:00',500.00,7,NULL,NULL,2),(21,'2020-04-01 00:00:00',500.00,1,NULL,NULL,2),(22,'2020-04-01 00:00:00',500.00,9,NULL,NULL,1),(23,'2020-04-01 00:00:00',0.00,10,NULL,NULL,4),(24,'2020-04-01 00:00:00',100.00,11,NULL,NULL,3),(25,'2020-05-01 00:00:00',0.00,1,NULL,NULL,1),(26,'2020-05-01 00:00:00',100.00,2,NULL,NULL,4),(27,'2020-05-01 00:00:00',100.00,3,NULL,NULL,2),(28,'2020-05-01 00:00:00',100.00,4,NULL,NULL,2),(29,'2020-05-01 00:00:00',100.00,5,NULL,NULL,4),(30,'2020-05-01 00:00:00',500.00,6,NULL,NULL,3),(31,'2020-05-01 00:00:00',500.00,7,NULL,NULL,2),(32,'2020-05-01 00:00:00',500.00,1,NULL,NULL,2),(33,'2020-05-01 00:00:00',500.00,9,NULL,NULL,1),(34,'2020-05-01 00:00:00',0.00,10,NULL,NULL,4),(35,'2020-05-01 00:00:00',100.00,11,NULL,NULL,3),(36,'2020-05-01 00:00:00',800.00,12,NULL,NULL,2),(37,'2020-05-01 00:00:00',800.00,13,NULL,NULL,2),(38,'2020-05-01 00:00:00',200.00,14,NULL,NULL,4),(39,'2020-05-01 00:00:00',0.00,15,NULL,NULL,2),(40,'2020-06-01 00:00:00',200.00,16,NULL,NULL,4),(41,'2020-06-01 00:00:00',200.00,17,NULL,NULL,2),(42,'2020-06-01 00:00:00',200.00,18,NULL,NULL,1),(43,'2020-07-01 00:00:00',500.00,19,NULL,NULL,3),(44,'2020-05-01 00:00:00',0.00,1,NULL,NULL,1),(45,'2020-08-01 00:00:00',100.00,2,NULL,NULL,4),(46,'2020-08-01 00:00:00',100.00,3,NULL,NULL,2),(47,'2020-08-01 00:00:00',100.00,4,NULL,NULL,2),(48,'2020-08-01 00:00:00',100.00,5,NULL,NULL,4),(49,'2020-08-01 00:00:00',500.00,6,NULL,NULL,3),(50,'2020-08-01 00:00:00',500.00,7,NULL,NULL,2),(51,'2020-08-01 00:00:00',500.00,1,NULL,NULL,2),(52,'2020-08-01 00:00:00',500.00,9,NULL,NULL,1),(53,'2020-08-01 00:00:00',0.00,10,NULL,NULL,4),(54,'2020-08-01 00:00:00',100.00,11,NULL,NULL,3),(55,'2020-08-01 00:00:00',800.00,12,NULL,NULL,2),(56,'2020-08-01 00:00:00',800.00,13,NULL,NULL,2),(57,'2020-09-01 00:00:00',200.00,16,NULL,NULL,4),(58,'2020-09-01 00:00:00',200.00,17,NULL,NULL,2),(59,'2020-09-01 00:00:00',200.00,18,NULL,NULL,1),(60,'2020-10-01 00:00:00',500.00,19,NULL,NULL,3),(61,'2020-10-01 00:00:00',0.00,1,NULL,NULL,1),(62,'2020-10-01 00:00:00',100.00,2,NULL,NULL,4),(63,'2020-10-01 00:00:00',100.00,3,NULL,NULL,2),(64,'2020-10-01 00:00:00',100.00,4,NULL,NULL,2),(65,'2020-10-01 00:00:00',100.00,5,NULL,NULL,4),(66,'2020-10-01 00:00:00',500.00,6,NULL,NULL,3),(67,'2020-10-01 00:00:00',500.00,7,NULL,NULL,2),(68,'2020-10-01 00:00:00',500.00,1,NULL,NULL,2),(69,'2020-10-01 00:00:00',500.00,9,NULL,NULL,1),(70,'2020-10-01 00:00:00',0.00,10,NULL,NULL,4),(71,'2020-10-01 00:00:00',100.00,11,NULL,NULL,3),(72,'2020-10-01 00:00:00',800.00,12,NULL,NULL,2),(73,'2020-10-01 00:00:00',800.00,13,NULL,NULL,2),(74,'2020-12-01 00:00:00',200.00,16,NULL,NULL,4),(75,'2020-12-01 00:00:00',200.00,17,NULL,NULL,2),(76,'2020-12-01 00:00:00',200.00,18,NULL,NULL,1),(77,'2021-01-01 00:00:00',500.00,19,NULL,NULL,3),(78,'2021-02-01 00:00:00',0.00,1,NULL,NULL,1),(79,'2021-02-01 00:00:00',100.00,2,NULL,NULL,4),(80,'2021-02-01 00:00:00',100.00,3,NULL,NULL,2),(81,'2021-02-01 00:00:00',100.00,4,NULL,NULL,2),(82,'2021-02-01 00:00:00',100.00,5,NULL,NULL,4),(83,'2021-02-01 00:00:00',500.00,6,NULL,NULL,3),(84,'2021-02-01 00:00:00',500.00,7,NULL,NULL,2),(85,'2021-02-01 00:00:00',500.00,1,NULL,NULL,2),(86,'2021-02-01 00:00:00',500.00,9,NULL,NULL,1),(87,'2021-02-01 00:00:00',0.00,10,NULL,NULL,4),(88,'2021-02-01 00:00:00',100.00,11,NULL,NULL,3),(89,'2021-02-01 00:00:00',800.00,12,NULL,NULL,2),(90,'2021-02-01 00:00:00',800.00,13,NULL,NULL,2),(91,'2021-03-01 00:00:00',200.00,17,NULL,NULL,2),(92,'2021-03-01 00:00:00',200.00,18,NULL,NULL,1),(93,'2021-03-01 00:00:00',500.00,19,NULL,NULL,3),(94,'2025-09-30 21:00:00',100.00,23,94,44,3),(95,'2025-11-21 21:00:00',500.00,23,97,44,3),(96,'2025-11-21 21:00:00',1000.00,24,98,45,3);
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id_pais` int NOT NULL AUTO_INCREMENT,
  `pais` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id_pais`),
  UNIQUE KEY `pais_UNIQUE` (`pais`),
  UNIQUE KEY `pais` (`pais`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (7,'Alemania'),(10,'Argentina'),(5,'Brasil'),(6,'Canadá'),(4,'Chile'),(9,'Colombia'),(3,'España'),(1,'Estados Unidos'),(12,'Francia'),(8,'Holanda'),(2,'Inglaterra'),(11,'Mexico'),(15,'Reino Unido'),(14,'Suecia'),(13,'Uruguay');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id_playlist` int NOT NULL AUTO_INCREMENT,
  `playlist` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `estado` enum('activa','eliminada') COLLATE utf8mb4_unicode_520_ci DEFAULT 'activa',
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_eliminada` datetime DEFAULT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_playlist`),
  KEY `fk_Playlist_Usuarios1_idx` (`id_usuario`),
  CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (1,'Para correr','activa','2020-02-27 00:00:00',NULL,1),(2,'Para Estudiar','activa','2019-05-07 00:00:00',NULL,2),(3,'Para Gym','eliminada','2020-03-07 00:00:00','2020-04-10 00:00:00',4),(4,'Las mejores canciones','activa','2017-06-06 00:00:00',NULL,5),(5,'Mis canciones favoritos','activa','2016-09-29 00:00:00',NULL,2),(6,'Top 20','eliminada','2016-04-12 00:00:00','2016-06-06 00:00:00',12),(7,'Mi top 10','activa','2017-06-16 00:00:00',NULL,11),(8,'Lo mejor del Rock','activa','2018-07-11 00:00:00',NULL,17),(9,'Musica Latina','eliminada','2016-02-19 00:00:00','2016-12-11 00:00:00',15),(10,'Pop','activa','2016-06-23 00:00:00',NULL,15),(11,'Test Playlist','activa','2025-10-19 18:27:05',NULL,22),(12,'Test soft delete','eliminada','2025-10-19 18:30:19','2025-10-19 19:29:00',22),(13,'Bullet','activa','2025-10-22 17:58:35',NULL,24);
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_cancion`
--

DROP TABLE IF EXISTS `playlist_cancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_cancion` (
  `id_playlist` int NOT NULL,
  `id_cancion` int NOT NULL,
  `orden` int NOT NULL,
  `fecha_agregada` datetime DEFAULT NULL,
  PRIMARY KEY (`id_playlist`,`id_cancion`),
  KEY `fk_playlist_has_cancion_cancion1_idx` (`id_cancion`),
  KEY `fk_playlist_has_cancion_playlist1_idx` (`id_playlist`),
  CONSTRAINT `fk_playlist_has_cancion_cancion1` FOREIGN KEY (`id_cancion`) REFERENCES `cancion` (`id_cancion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_playlist_has_cancion_playlist1` FOREIGN KEY (`id_playlist`) REFERENCES `playlist` (`id_playlist`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_cancion`
--

LOCK TABLES `playlist_cancion` WRITE;
/*!40000 ALTER TABLE `playlist_cancion` DISABLE KEYS */;
INSERT INTO `playlist_cancion` VALUES (1,1,1,'2025-10-12 01:12:47'),(1,22,3,'2025-10-12 01:12:47'),(1,75,4,'2025-10-12 01:12:47'),(1,135,2,'2025-10-12 01:12:47'),(2,39,1,'2025-10-12 01:12:47'),(2,42,2,'2025-10-12 01:12:47'),(2,43,3,'2025-10-12 01:12:47'),(3,1,5,'2025-10-12 01:12:47'),(3,22,3,'2025-10-12 01:12:47'),(3,46,1,'2025-10-12 01:12:47'),(3,62,2,'2025-10-12 01:12:47'),(3,73,4,'2025-10-12 01:12:47'),(4,1,1,'2025-10-12 01:12:47'),(4,2,2,'2025-10-12 01:12:47'),(4,3,3,'2025-10-12 01:12:47'),(4,5,4,'2025-10-12 01:12:47'),(5,18,1,'2025-10-12 01:12:47'),(5,26,2,'2025-10-12 01:12:47'),(5,30,3,'2025-10-12 01:12:47'),(6,2,11,'2025-10-12 01:12:47'),(6,5,1,'2025-10-12 01:12:47'),(6,6,6,'2025-10-12 01:12:47'),(6,8,7,'2025-10-12 01:12:47'),(6,12,2,'2025-10-12 01:12:47'),(6,16,14,'2025-10-12 01:12:47'),(6,17,15,'2025-10-12 01:12:47'),(6,19,19,'2025-10-12 01:12:47'),(6,30,10,'2025-10-12 01:12:47'),(6,33,8,'2025-10-12 01:12:47'),(6,36,18,'2025-10-12 01:12:47'),(6,41,9,'2025-10-12 01:12:47'),(6,44,17,'2025-10-12 01:12:47'),(6,54,4,'2025-10-12 01:12:47'),(6,57,20,'2025-10-12 01:12:47'),(6,62,5,'2025-10-12 01:12:47'),(6,78,13,'2025-10-12 01:12:47'),(6,87,16,'2025-10-12 01:12:47'),(6,98,12,'2025-10-12 01:12:47'),(6,106,3,'2025-10-12 01:12:47'),(7,12,4,'2025-10-12 01:12:47'),(7,19,9,'2025-10-12 01:12:47'),(7,32,8,'2025-10-12 01:12:47'),(7,37,5,'2025-10-12 01:12:47'),(7,49,7,'2025-10-12 01:12:47'),(7,51,10,'2025-10-12 01:12:47'),(7,55,1,'2025-10-12 01:12:47'),(7,59,6,'2025-10-12 01:12:47'),(7,83,3,'2025-10-12 01:12:47'),(7,99,2,'2025-10-12 01:12:47'),(8,1,2,'2025-10-12 01:12:47'),(8,4,3,'2025-10-12 01:12:47'),(8,5,1,'2025-10-12 01:12:47'),(8,10,4,'2025-10-12 01:12:47'),(8,16,5,'2025-10-12 01:12:47'),(8,17,6,'2025-10-12 01:12:47'),(9,15,2,'2025-10-12 01:12:47'),(9,19,1,'2025-10-12 01:12:47'),(9,20,3,'2025-10-12 01:12:47'),(9,23,5,'2025-10-12 01:12:47'),(9,24,4,'2025-10-12 01:12:47'),(10,12,1,'2025-10-12 01:12:47'),(10,20,2,'2025-10-12 01:12:47'),(10,21,5,'2025-10-12 01:12:47'),(10,83,3,'2025-10-12 01:12:47'),(10,130,4,'2025-10-12 01:12:47'),(11,142,1,'2025-10-19 19:24:23'),(13,144,1,'2025-10-22 17:59:28');
/*!40000 ALTER TABLE `playlist_cancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suscripcion`
--

DROP TABLE IF EXISTS `suscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suscripcion` (
  `id_suscripcion` int NOT NULL AUTO_INCREMENT,
  `fecha_inicio` datetime NOT NULL,
  `fecha_renovacion` datetime DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `id_tipo_usuario` int NOT NULL,
  PRIMARY KEY (`id_suscripcion`),
  UNIQUE KEY `unique_usuario_fecha_inicio` (`id_usuario`,`fecha_inicio`),
  UNIQUE KEY `suscripcion_id_usuario_fecha_inicio` (`id_usuario`,`fecha_inicio`),
  KEY `fk_Suscripcion_Usuarios_idx` (`id_usuario`),
  KEY `fk_suscripcion_tipo_usuario2_idx` (`id_tipo_usuario`),
  CONSTRAINT `suscripcion_ibfk_103` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `suscripcion_ibfk_104` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`) ON UPDATE CASCADE,
  CONSTRAINT `chk_fechas_suscripcion` CHECK (((`fecha_renovacion` is null) or (`fecha_renovacion` > `fecha_inicio`)))
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suscripcion`
--

LOCK TABLES `suscripcion` WRITE;
/*!40000 ALTER TABLE `suscripcion` DISABLE KEYS */;
INSERT INTO `suscripcion` VALUES (1,'2020-01-01 00:00:00','2020-02-01 00:00:00',1,1),(2,'2020-02-01 00:00:00','2020-03-01 00:00:00',1,1),(3,'2020-02-01 00:00:00','2020-03-01 00:00:00',6,2),(4,'2020-03-01 00:00:00','2020-04-01 00:00:00',1,1),(5,'2020-03-01 00:00:00','2020-04-01 00:00:00',6,2),(6,'2020-03-01 00:00:00','2020-04-01 00:00:00',2,1),(7,'2020-03-01 00:00:00','2020-04-01 00:00:00',3,1),(8,'2020-03-01 00:00:00','2020-04-01 00:00:00',4,1),(9,'2020-03-01 00:00:00','2020-04-01 00:00:00',7,2),(10,'2020-03-01 00:00:00','2020-04-01 00:00:00',8,2),(11,'2020-03-01 00:00:00','2020-04-01 00:00:00',9,3),(12,'2020-03-01 00:00:00','2020-04-01 00:00:00',10,1),(13,'2020-03-01 00:00:00','2020-04-01 00:00:00',11,2),(14,'2020-04-01 00:00:00','2020-05-01 00:00:00',1,1),(15,'2020-04-01 00:00:00','2020-05-01 00:00:00',2,1),(16,'2020-04-01 00:00:00','2020-05-01 00:00:00',3,1),(17,'2020-04-01 00:00:00','2020-05-01 00:00:00',4,1),(18,'2020-04-01 00:00:00','2020-05-01 00:00:00',5,1),(19,'2020-04-01 00:00:00','2020-05-01 00:00:00',6,2),(20,'2020-04-01 00:00:00','2020-05-01 00:00:00',7,2),(21,'2020-04-01 00:00:00','2020-05-01 00:00:00',8,2),(22,'2020-04-01 00:00:00','2020-05-01 00:00:00',9,3),(23,'2020-04-01 00:00:00','2020-05-01 00:00:00',10,1),(24,'2020-04-01 00:00:00','2020-05-01 00:00:00',11,2),(25,'2020-05-01 00:00:00','2020-08-01 00:00:00',1,1),(26,'2020-05-01 00:00:00','2020-08-01 00:00:00',2,1),(27,'2020-05-01 00:00:00','2020-08-01 00:00:00',3,1),(28,'2020-05-01 00:00:00','2020-08-01 00:00:00',4,1),(29,'2020-05-01 00:00:00','2020-08-01 00:00:00',5,1),(30,'2020-05-01 00:00:00','2020-08-01 00:00:00',6,2),(31,'2020-05-01 00:00:00','2020-08-01 00:00:00',7,2),(32,'2020-05-01 00:00:00','2020-08-01 00:00:00',8,2),(33,'2020-05-01 00:00:00','2020-08-01 00:00:00',9,3),(34,'2020-05-01 00:00:00','2020-08-01 00:00:00',10,1),(35,'2020-05-01 00:00:00','2020-08-01 00:00:00',11,2),(36,'2020-05-01 00:00:00','2020-08-01 00:00:00',12,3),(37,'2020-05-01 00:00:00','2020-08-01 00:00:00',13,3),(38,'2020-05-01 00:00:00','2020-08-01 00:00:00',14,2),(39,'2020-05-01 00:00:00','2020-08-01 00:00:00',15,1),(40,'2020-06-01 00:00:00','2020-09-01 00:00:00',16,2),(41,'2020-06-01 00:00:00','2020-09-01 00:00:00',17,2),(42,'2020-06-01 00:00:00','2020-09-01 00:00:00',18,2),(43,'2020-07-01 00:00:00','2020-10-01 00:00:00',19,3),(44,'2020-08-01 00:00:00','2020-11-01 00:00:00',1,1),(45,'2020-08-01 00:00:00','2020-11-01 00:00:00',2,1),(46,'2020-08-01 00:00:00','2020-11-01 00:00:00',3,1),(47,'2020-08-01 00:00:00','2020-11-01 00:00:00',4,1),(48,'2020-08-01 00:00:00','2020-11-01 00:00:00',5,1),(49,'2020-08-01 00:00:00','2020-11-01 00:00:00',6,2),(50,'2020-08-01 00:00:00','2020-11-01 00:00:00',7,2),(51,'2020-08-01 00:00:00','2020-11-01 00:00:00',8,2),(52,'2020-08-01 00:00:00','2020-11-01 00:00:00',9,3),(53,'2020-08-01 00:00:00','2020-11-01 00:00:00',10,1),(54,'2020-08-01 00:00:00','2020-11-01 00:00:00',11,2),(55,'2020-08-01 00:00:00','2020-11-01 00:00:00',12,3),(56,'2020-08-01 00:00:00','2020-11-01 00:00:00',13,3),(57,'2020-09-01 00:00:00','2020-12-01 00:00:00',16,2),(58,'2020-09-01 00:00:00','2020-12-01 00:00:00',17,2),(59,'2020-09-01 00:00:00','2020-12-01 00:00:00',18,2),(60,'2020-10-01 00:00:00','2021-01-01 00:00:00',19,3),(61,'2020-11-01 00:00:00','2021-02-01 00:00:00',1,1),(62,'2020-11-01 00:00:00','2021-02-01 00:00:00',2,1),(63,'2020-11-01 00:00:00','2021-02-01 00:00:00',3,1),(64,'2020-11-01 00:00:00','2021-02-01 00:00:00',4,1),(65,'2020-11-01 00:00:00','2021-02-01 00:00:00',5,1),(66,'2020-11-01 00:00:00','2021-02-01 00:00:00',6,2),(67,'2020-11-01 00:00:00','2021-02-01 00:00:00',7,2),(68,'2020-11-01 00:00:00','2021-02-01 00:00:00',8,2),(69,'2020-11-01 00:00:00','2021-02-01 00:00:00',9,3),(70,'2020-11-01 00:00:00','2021-02-01 00:00:00',10,1),(71,'2020-11-01 00:00:00','2021-02-01 00:00:00',11,2),(72,'2020-11-01 00:00:00','2021-02-01 00:00:00',12,3),(73,'2020-11-01 00:00:00','2021-02-01 00:00:00',13,3),(74,'2020-12-01 00:00:00','2021-03-01 00:00:00',16,2),(75,'2020-12-01 00:00:00','2021-03-01 00:00:00',17,2),(76,'2020-12-01 00:00:00','2021-03-01 00:00:00',18,2),(77,'2021-01-01 00:00:00','2021-04-01 00:00:00',19,3),(78,'2021-02-01 00:00:00','2021-04-01 00:00:00',1,1),(79,'2021-02-01 00:00:00','2021-04-01 00:00:00',2,1),(80,'2021-02-01 00:00:00','2021-04-01 00:00:00',3,1),(81,'2021-02-01 00:00:00','2021-04-01 00:00:00',4,1),(82,'2021-02-01 00:00:00','2021-04-01 00:00:00',5,1),(83,'2021-02-01 00:00:00','2021-04-01 00:00:00',6,2),(84,'2021-02-01 00:00:00','2021-04-01 00:00:00',7,2),(85,'2021-02-01 00:00:00','2021-04-01 00:00:00',8,2),(86,'2021-02-01 00:00:00','2021-04-01 00:00:00',9,3),(87,'2021-02-01 00:00:00','2021-04-01 00:00:00',10,1),(88,'2021-02-01 00:00:00','2021-04-01 00:00:00',11,2),(89,'2021-02-01 00:00:00','2021-04-01 00:00:00',12,3),(90,'2021-02-01 00:00:00','2021-04-01 00:00:00',13,3),(91,'2021-03-01 00:00:00','2021-05-01 00:00:00',16,2),(92,'2021-03-01 00:00:00','2021-05-01 00:00:00',17,2),(93,'2021-03-01 00:00:00','2021-05-01 00:00:00',18,2),(94,'2025-09-30 21:00:00','2025-10-31 21:00:00',23,3),(97,'2025-10-31 21:00:00','2025-11-22 21:00:00',23,1),(98,'2024-11-13 21:00:00','2025-12-30 21:00:00',24,2);
/*!40000 ALTER TABLE `suscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_forma_pago`
--

DROP TABLE IF EXISTS `tipo_forma_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_forma_pago` (
  `id_tipo_forma_pago` int NOT NULL AUTO_INCREMENT,
  `forma_pago` varchar(30) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id_tipo_forma_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_forma_pago`
--

LOCK TABLES `tipo_forma_pago` WRITE;
/*!40000 ALTER TABLE `tipo_forma_pago` DISABLE KEYS */;
INSERT INTO `tipo_forma_pago` VALUES (1,'Efectivo'),(2,'Tarjeta de Debito'),(3,'Tarjeta de credito'),(4,'Debito Automatico x Banco');
/*!40000 ALTER TABLE `tipo_forma_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int NOT NULL AUTO_INCREMENT,
  `tipoUsuario` varchar(20) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'Premium'),(2,'standard'),(3,'free');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'usuario_temp',
  `nyap` varchar(150) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'Nombre Temporal',
  `fecha_nac` date NOT NULL DEFAULT '2000-01-01',
  `sexo` char(1) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'O',
  `cp` varchar(10) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `fecha_mod_password` datetime DEFAULT NULL,
  `id_pais` int NOT NULL DEFAULT '1',
  `id_tipo_usuario` int NOT NULL DEFAULT '3',
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_usuario_Pais2_idx` (`id_pais`),
  KEY `fk_usuario_tipo_usuario2_idx` (`id_tipo_usuario`),
  CONSTRAINT `usuario_ibfk_105` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`) ON UPDATE CASCADE,
  CONSTRAINT `usuario_ibfk_106` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'MORTIZ','MARIA ORTIZ','1975-09-27','F','1001','mortiz@spotify.com','spotify123','2025-10-10 23:43:23',10,3,1),(2,'IBALLESTEROS','ISABEL BALLESTEROS','1987-10-17','F','1001','iballesteros@spotify.com','spotify123','2025-10-10 23:43:23',10,3,1),(3,'CRAMIREZ','CARMEN RAMIREZ','1994-08-26','F','1001','cramirez@spotify.com','spotify123','2025-10-10 23:43:23',10,3,1),(4,'MGONZALEZ','MARIA PAULA GONZALEZ','1981-03-27','F','118942','mgonzalez@spotify.com','spotify123','2025-10-10 23:45:19',9,3,1),(5,'EHERDEZ','EMILY HERDEZ','2001-02-10','F','118942','eherdez@spotify.com','spotify123','2025-10-10 23:45:19',9,3,1),(6,'LGOMEZ','LUISA GOMEZ','1971-12-12','F','118942','lgomez@spotify.com','spotify123','2025-10-10 23:45:19',9,3,1),(7,'MSOSA','MARIA CARMEN SOSA','1981-07-16','F','3','msosa@spotify.com','spotify123','2025-10-10 23:45:19',3,2,1),(8,'MSMITH','MARY SMITH','2000-05-04','F','B24','msmith@spotify.com','spotify123','2025-10-10 23:45:19',2,2,1),(9,'PSOTO','PATRICIA SOTO','1974-07-12','F','832 0000','psoto@spotify.com','spotify123','2025-10-10 23:45:19',4,1,1),(10,'AGARCIA','ANTONIO GARCIA','1995-08-30','M','1001','agarcia@spotify.com','spotify123','2025-10-10 23:45:19',10,3,1),(11,'JMARTINEZ','JOSE MARTINEZ','1987-11-22','M','1001','jmartinez@spotify.com','spotify123','2025-10-10 23:45:19',10,2,1),(12,'FLOPEZ','FRANCISCO LOPEZ','1988-02-16','M','1001','flopez@spotify.com','spotify123','2025-10-10 23:45:19',10,1,1),(13,'JSANCHEZ','JUAN SANCHEZ','2003-03-23','M','1001','jsanchez@spotify.com','spotify123','2025-10-10 23:45:19',10,1,1),(14,'MRODRIGUEZ','MIGUEL ANGEL RODRIGUEZ','2003-10-16','M','118942','mrodriguez@spotify.com','spotify123','2025-10-10 23:45:19',9,2,1),(15,'JDIAZ','JUAN ESTEBAN DIAZ','1973-05-23','M','118942','jdiaz@spotify.com','spotify123','2025-10-10 23:45:19',9,3,1),(16,'JLOPEZ','JUAN SEBASTIAN LOPEZ','1974-03-15','M','118942','jlopez@spotify.com','spotify123','2025-10-10 23:45:19',9,2,1),(17,'SMARTINEZ','SANTIAGO MARTINEZ','1977-07-18','M','118942','smartinez@spotify.com','spotify123','2025-10-10 23:45:19',9,2,1),(18,'DRUBIO','DAVID RUBIO','2001-01-17','M','60000','drubio@spotify.com','spotify123','2025-10-10 23:45:19',13,2,1),(19,'JWATSON','JHON WATSON','2003-10-22','M','10029','jwatson@spotify.com','spotify123','2025-10-10 23:45:19',1,1,1),(20,'test_softdelete','Usuario Test Soft Delete','2000-01-01','O',NULL,'test.softdelete@actualizado','$2b$10$CkaJLNTRQ2F8tbv7Jb9xfuPWKiJxJAcRcbfjjC9aP9bOi.Dy/Tn.6','2025-10-18 11:22:13',1,3,0),(21,'test_vencida','Usuario Test Password Vencida','2000-01-01','O',NULL,'test.passwordvencida@actualizado','$2b$10$Gr2UhEa5zzaaStpm2/gSZO98e.D289nUFQNi8RH1Qmo/3Df9y3Zl6','2023-06-09 00:00:00',1,3,1),(22,'test_playlist','Usuario Test Playlist','2000-01-01','O',NULL,'test.playlist@example.com','$2b$10$33VB41Xcbj2mCQPSZHHb/uQaILS4cxiUNvoDHnk28UBSppzb9hsam','2025-10-19 18:15:53',1,3,1),(23,'test_suscripciones','Usuario Test Suscripciones','2000-01-01','O',NULL,'test.suscripciones@example.com','$2b$10$I8k93Dhbk/IaD4DVeuP3Hed0jMiq4PB48hGJURZ4GVItNiMSp0u96','2025-10-19 21:33:01',1,1,1),(24,'UltimoUser','Usuario Test Final','1999-11-14','M','2800','test.ultimotest@example.com','$2b$10$g.TS/5I4eWD8ntMt42dUsuyzvUVA6g0CiNUlgt6ip9B/Z8EhSfqdK','2025-10-22 16:47:17',10,1,1),(26,'UltimoUser2','Usuario Test Final2','2000-12-23','O','5000','test.ultimotest2@example.com','$2b$10$w8QKDtrphHNdRvWCYRbqp.e60wJfHKT.80X.VEKvhsF19aEbwnXn6','2025-10-22 16:59:22',10,3,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-22 21:21:19
