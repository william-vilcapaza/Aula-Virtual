CREATE DATABASE  IF NOT EXISTS `aula_virtual` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aula_virtual`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: aula_virtual
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `aula`
--

DROP TABLE IF EXISTS `aula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aula` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `numero` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aula`
--

LOCK TABLES `aula` WRITE;
/*!40000 ALTER TABLE `aula` DISABLE KEYS */;
INSERT INTO `aula` VALUES (1,'Aula 101','101'),(2,'Aula 202','202'),(3,'Aula Virtual','VRT-01'),(4,'Aula 301','301'),(5,'Aula 302','302'),(6,'Aula 303','303'),(7,'Aula 304','304'),(8,'Aula 305','305'),(9,'Aula de Computación','COMP-01'),(10,'Aula de Innovación','INNOV-01'),(11,'Auditorio Principal','AUD-01'),(12,'Aula 401','401'),(13,'Aula 402','402');
/*!40000 ALTER TABLE `aula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `año`
--

DROP TABLE IF EXISTS `año`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `año` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `id_aula` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_aula` (`id_aula`),
  CONSTRAINT `año_ibfk_1` FOREIGN KEY (`id_aula`) REFERENCES `aula` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `año`
--

LOCK TABLES `año` WRITE;
/*!40000 ALTER TABLE `año` DISABLE KEYS */;
INSERT INTO `año` VALUES (1,'Primer Año',1),(2,'Segundo Año',2),(3,'Tercer Año',3),(4,'Cuarto Año',4),(5,'Quinto Año',5);
/*!40000 ALTER TABLE `año` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `director` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `id_aula` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `id_aula` (`id_aula`),
  CONSTRAINT `director_ibfk_1` FOREIGN KEY (`id_aula`) REFERENCES `aula` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director`
--

LOCK TABLES `director` WRITE;
/*!40000 ALTER TABLE `director` DISABLE KEYS */;
INSERT INTO `director` VALUES (1,'Julio','Torres','987654321','julio@mail.com',3);
/*!40000 ALTER TABLE `director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `año` int NOT NULL,
  `promedio` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante`
--

LOCK TABLES `estudiante` WRITE;
/*!40000 ALTER TABLE `estudiante` DISABLE KEYS */;
INSERT INTO `estudiante` VALUES (1,'Carlos','Quispe','carlosq@mail.com',3,16),(2,'Lucía','Choque','luciach@mail.com',2,18),(3,'Javier','Mamani','javierm@mail.com',4,15),(4,'Rosa','Huamán','rosah@mail.com',1,19),(5,'Fernando','Apaza','fernandoa@mail.com',1,17),(6,'Valeria','Calla','valeriac@mail.com',2,18),(7,'Dante','Choque','dantec@mail.com',3,15),(8,'Andrea','Cusi','andreac@mail.com',4,16),(9,'Javier','Quispe','javierq@mail.com',5,17),(10,'Yuri','Huamaní','yurih@mail.com',1,18),(11,'Laura','Mamani','lauram@mail.com',2,17),(12,'Carlos','Paredes','carlosp@mail.com',3,16),(13,'Claudia','Vilca','claudiav@mail.com',4,18),(14,'Diego','Quispe','diegoq@mail.com',5,19),(15,'Renata','Torres','renatat@mail.com',1,15),(16,'Luciana','Gutiérrez','lucianag@mail.com',2,20),(17,'Piero','Salas','pieros@mail.com',3,14),(18,'Valentina','Zevallos','valentinaz@mail.com',4,17),(19,'Miguel','Puma','miguelp@mail.com',5,16),(20,'Oscar','Choque','oscarc@mail.com',1,18),(21,'Ana','Vega','anav@mail.com',2,15),(22,'Samuel','Apaza','samuela@mail.com',3,17),(23,'Carmen','Quispe','carmenq@mail.com',4,18),(24,'Gabriel','Cusi','gabrielc@mail.com',5,16),(25,'Luisa','Mamani','luisam@mail.com',1,19),(26,'Juan','Ccalla','juanc@mail.com',2,14),(27,'Fátima','Huanca','fatimah@mail.com',3,17),(28,'Sofía','Ramos','sofiar@mail.com',4,16),(29,'Cristian','Flores','cristianf@mail.com',5,18),(30,'Daniela','Vilca','danielav@mail.com',1,17),(31,'Luis','Chura','luisc@mail.com',2,15),(32,'Franco','Torres','francot@mail.com',3,18),(33,'María','Cordero','mariac@mail.com',4,17),(34,'Elena','Choque','elenac@mail.com',5,15),(35,'Jorge','Apaza','jorgea@mail.com',1,19),(36,'Emily','Calla','emilyc@mail.com',2,16),(37,'Pedro','Salas','pedros@mail.com',3,17),(38,'Silvia','Quispe','silviaq@mail.com',4,20),(39,'Marcelo','Huanca','marceloh@mail.com',5,15),(40,'Alejandro','Paredes','alejandrop@mail.com',1,18),(41,'Cecilia','Vega','ceciliav@mail.com',2,16),(42,'Eduardo','Mamani','eduardom@mail.com',3,17),(43,'Marcos','Vilca','marcosv@mail.com',4,14),(44,'Joaquín','Chura','joaquinc@mail.com',5,19),(45,'Diana','Torres','dianat@mail.com',1,18),(46,'Alonso','Flores','alonsof@mail.com',2,16),(47,'Camila','Zevallos','camilaz@mail.com',3,19),(48,'Raúl','Choque','raulc@mail.com',4,17),(49,'Natalia','Ramos','natalia@mail.com',5,16),(50,'Adrián','Apaza','adriana@mail.com',1,14),(51,'Isabela','Gutiérrez','isabelag@mail.com',2,18),(52,'Pablo','Salas','pablos@mail.com',3,16),(53,'Estefanía','Calla','estefaniac@mail.com',4,19),(54,'Felipe','Cusi','felipec@mail.com',5,20),(55,'Melany','Vega','melanyv@mail.com',1,15),(56,'Víctor','Torres','victort@mail.com',2,16),(57,'Nicolás','Quispe','nicolasq@mail.com',3,18),(58,'Martín','Flores','martinf@mail.com',4,19),(59,'Karla','Huamaní','karlah@mail.com',5,17),(60,'Bruno','Vilca','brunov@mail.com',1,20),(61,'Flor','Chura','florc@mail.com',2,15),(62,'Emilio','Torres','emiliot@mail.com',3,18),(63,'Julieta','Cordero','julietac@mail.com',4,14),(64,'Ricardo','Choque','ricardoc@mail.com',5,19),(65,'Sara','Ramos','sarar@mail.com',1,16),(66,'Manuel','Calla','manuelc@mail.com',2,18),(67,'Inés','Gutiérrez','inesg@mail.com',3,15),(68,'Renzo','Salas','renzos@mail.com',4,20),(69,'Aldo','Puma','aldop@mail.com',5,17),(70,'Soledad','Quispe','soledadq@mail.com',1,18),(71,'Kevin','Vilca','kevinv@mail.com',2,16),(72,'Damaris','Mamani','damarism@mail.com',3,19),(73,'Fabián','Chura','fabian@mail.com',4,17),(74,'Rosario','Vega','rosariov@mail.com',5,14),(75,'Emanuel','Paredes','emanuelp@mail.com',1,15),(76,'Esteban','Choque','estebanc@mail.com',2,18),(77,'Lorena','Flores','lorenaf@mail.com',3,17),(78,'Matías','Torres','matiast@mail.com',4,20),(79,'Tania','Huamaní','taniah@mail.com',5,18),(80,'Sebastián','Ramos','sebastianr@mail.com',1,19),(81,'Patricia','Cordero','patriciac@mail.com',2,17),(82,'Liliana','Gutiérrez','lilianag@mail.com',3,16),(83,'Leonardo','Calla','leonardoc@mail.com',4,15),(84,'Gianluca','Puma','gianlucap@mail.com',5,18),(85,'Daniel','Choque','danielc@mail.com',1,16),(171,'Ariana','Rojas','arianar1@mail.com',1,17),(172,'Héctor','Vilca','hectorv2@mail.com',2,18),(173,'Verónica','Mamani','veronicam3@mail.com',3,19),(174,'Sergio','Choque','sergioc4@mail.com',4,16),(175,'Liliana','Paredes','lilianap5@mail.com',5,15),(176,'Juan','Gonzales','juang6@mail.com',1,14),(177,'Brenda','Ramos','brendar7@mail.com',2,17),(178,'Iván','Vega','ivanv8@mail.com',3,20),(179,'Clara','Calla','clarac9@mail.com',4,18),(180,'Matías','Quispe','matiasq10@mail.com',5,16),(181,'Damián','Apaza','damiana11@mail.com',1,17),(182,'Zulema','Huanca','zulemah12@mail.com',2,18),(183,'Rodrigo','Cusi','rodrigoc13@mail.com',3,15),(184,'Vanessa','Salas','vanessas14@mail.com',4,17),(185,'Joaquín','Puma','joaquinp15@mail.com',5,16),(186,'Alexia','Choque','alexiac16@mail.com',1,19),(187,'Marcela','Flores','marcelaf17@mail.com',2,14),(188,'César','Torres','cesart18@mail.com',3,18),(189,'Melisa','Gutiérrez','melisag19@mail.com',4,20),(190,'Romina','Vilca','rominav20@mail.com',1,16),(191,'Renato','Huamaní','renatoh21@mail.com',2,17),(192,'Elisa','Zevallos','elisaz22@mail.com',3,18),(193,'Óscar','Ramos','oscarr23@mail.com',4,14),(194,'Evelyn','Cordero','evelync24@mail.com',5,19),(195,'Lucía','Torres','luciat25@mail.com',1,16),(196,'Mario','Vega','mariov26@mail.com',2,18),(197,'Claudia','Gutiérrez','claudiag27@mail.com',3,15),(198,'Felipe','Chura','felipec28@mail.com',4,17),(199,'Ximena','Flores','ximenaf29@mail.com',5,20),(200,'Santiago','Calla','santiagoc30@mail.com',1,16),(201,'Rosa','Mamani','rosam31@mail.com',2,17),(202,'Carlos','Apaza','carlosa32@mail.com',3,18),(203,'Natalie','Salas','natalies33@mail.com',4,14),(204,'Fabiola','Paredes','fabiolap34@mail.com',5,18),(205,'Leandro','Vilca','leandrov35@mail.com',1,17),(206,'Alejandra','Torres','alejandrat36@mail.com',2,16),(207,'Cristian','Ramos','cristianr37@mail.com',3,15),(208,'Carmen','Choque','carmenc38@mail.com',4,19),(209,'Brianna','Cusi','briannac39@mail.com',5,17),(210,'Gonzalo','Quispe','gonzaloq40@mail.com',1,20),(211,'Florencia','Zevallos','florenciaz41@mail.com',2,18),(212,'Andrea','Apaza','andreaa42@mail.com',3,19),(213,'Daniel','Mamani','danielm43@mail.com',4,14),(214,'Álvaro','Torres','alvarot44@mail.com',5,16),(215,'Julieta','Flores','julietaf45@mail.com',1,18),(216,'Lorenzo','Puma','lorenzop46@mail.com',2,17),(217,'Mauricio','Huanca','mauricioh47@mail.com',3,15),(218,'Susana','Ramos','susanar48@mail.com',4,17),(219,'Enzo','Choque','enzoc49@mail.com',5,18),(220,'Ángela','Mamani','angelam50@mail.com',1,14),(221,'Valeria','Ramos','valeriar51@mail.com',2,19),(222,'Hugo','Cusi','hugoc52@mail.com',3,15),(223,'Patricia','Vilca','patriciav53@mail.com',4,16),(224,'Luis','Paredes','luisp54@mail.com',5,18),(225,'Karla','Huamaní','karlah55@mail.com',1,17),(226,'Tobías','Mamani','tobiasm56@mail.com',2,19),(227,'Bruno','Salas','brunos57@mail.com',3,15),(228,'César','Calla','cesarc58@mail.com',4,20),(229,'Amelia','Apaza','ameliaa59@mail.com',5,16),(230,'Emanuel','Choque','emanuelc60@mail.com',1,19),(231,'Lorena','Torres','lorenat61@mail.com',2,17),(232,'Fabio','Quispe','fabioq62@mail.com',3,14),(233,'Jairo','Huanca','jairoh63@mail.com',4,20),(234,'Diego','Calla','diegoc64@mail.com',5,16),(235,'Antonia','Quispe','antoniaq65@mail.com',1,19),(236,'Mónica','Vilca','monicav66@mail.com',2,17),(237,'Ángel','Ramos','angelr67@mail.com',3,16),(238,'Felipe','Mamani','felipem68@mail.com',4,18),(239,'Isabel','Vega','isabelv69@mail.com',5,15),(240,'Ignacio','Paredes','ignaciop70@mail.com',1,17),(241,'Victoria','Salas','victorias71@mail.com',2,20),(242,'Esteban','Choque','estebanc72@mail.com',3,18);
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante_aula`
--

DROP TABLE IF EXISTS `estudiante_aula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante_aula` (
  `id_estudiante` int NOT NULL,
  `id_aula` int NOT NULL,
  PRIMARY KEY (`id_estudiante`,`id_aula`),
  KEY `id_aula` (`id_aula`),
  CONSTRAINT `estudiante_aula_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`),
  CONSTRAINT `estudiante_aula_ibfk_2` FOREIGN KEY (`id_aula`) REFERENCES `aula` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante_aula`
--

LOCK TABLES `estudiante_aula` WRITE;
/*!40000 ALTER TABLE `estudiante_aula` DISABLE KEYS */;
INSERT INTO `estudiante_aula` VALUES (1,1),(2,2),(3,2),(4,3);
/*!40000 ALTER TABLE `estudiante_aula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante_año`
--

DROP TABLE IF EXISTS `estudiante_año`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante_año` (
  `id_estudiante` int NOT NULL,
  `id_año` int NOT NULL,
  PRIMARY KEY (`id_estudiante`,`id_año`),
  KEY `id_año` (`id_año`),
  CONSTRAINT `estudiante_año_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`),
  CONSTRAINT `estudiante_año_ibfk_2` FOREIGN KEY (`id_año`) REFERENCES `año` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante_año`
--

LOCK TABLES `estudiante_año` WRITE;
/*!40000 ALTER TABLE `estudiante_año` DISABLE KEYS */;
INSERT INTO `estudiante_año` VALUES (4,1),(2,2),(1,3),(3,4);
/*!40000 ALTER TABLE `estudiante_año` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foro`
--

DROP TABLE IF EXISTS `foro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `materia_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `materia_id` (`materia_id`),
  CONSTRAINT `foro_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foro`
--

LOCK TABLES `foro` WRITE;
/*!40000 ALTER TABLE `foro` DISABLE KEYS */;
INSERT INTO `foro` VALUES (1,'Discusión sobre SQL','Este foro está dedicado a discutir conceptos avanzados de SQL y bases de datos.',1),(2,'IA foro','Este foro está dedicado a discutir conceptos avanzados de Ia con bases de datos.',1),(3,'IA foro','Este foro está dedicado a discutir conceptos avanzados de Ia con bases de datos.',2);
/*!40000 ALTER TABLE `foro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `horas` int NOT NULL,
  `horario` varchar(40) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
INSERT INTO `materia` VALUES (1,'Matemáticas',6,'Lunes y Miércoles 08:00 - 10:00','Curso de matemáticas para reforzar conocimientos en álgebra y geometría.'),(2,'Comunicación',5,'Martes y Jueves 10:00 - 12:00','Curso que desarrolla habilidades de expresión oral y escrita.'),(3,'Ciencias Naturales',4,'Viernes 08:00 - 11:00','Estudio de la biología, química y física para entender los procesos naturales.'),(6,'Ciencias Sociales',4,'Viernes 08:00 - 10:00','Estudio de la historia y estructura social de las comunidades.'),(7,'Educación Física',2,'Viernes 10:00 - 11:00','Actividad física y deportiva para el desarrollo corporal.'),(8,'Ciencias Naturales',4,'Lunes 10:00 - 12:00','Estudio de los principios de biología y física aplicada a los fenómenos naturales.'),(9,'Educación Cívica',2,'Martes 12:00 - 13:00','Curso enfocado en los derechos y responsabilidades cívicas y sociales.'),(10,'Educación para el Trabajo',3,'Miércoles 11:00 - 13:00','Introducción a las habilidades para el trabajo, proyectos y emprendimiento.'),(11,'Arte y Cultura',3,'Jueves 11:00 - 13:00','Curso de expresión artística, creatividad y desarrollo cultural.'),(12,'Inglés',2,'Martes 08:00 - 09:00','Desarrollo de habilidades lingüísticas en inglés, tanto orales como escritas.'),(13,'Computación',3,'Viernes 11:00 - 12:00','Curso enfocado en el uso de tecnología para la resolución de problemas y proyectos.'),(14,'Innovación y Emprendimiento',3,'Jueves 09:00 - 10:00','Exploración de ideas innovadoras y desarrollo de emprendimientos.');
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia_estudiante`
--

DROP TABLE IF EXISTS `materia_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia_estudiante` (
  `id_materia` int NOT NULL,
  `id_estudiante` int NOT NULL,
  PRIMARY KEY (`id_materia`,`id_estudiante`),
  KEY `id_estudiante` (`id_estudiante`),
  CONSTRAINT `materia_estudiante_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id`),
  CONSTRAINT `materia_estudiante_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia_estudiante`
--

LOCK TABLES `materia_estudiante` WRITE;
/*!40000 ALTER TABLE `materia_estudiante` DISABLE KEYS */;
INSERT INTO `materia_estudiante` VALUES (1,1),(3,1),(1,2),(2,3),(2,4);
/*!40000 ALTER TABLE `materia_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia_profesor`
--

DROP TABLE IF EXISTS `materia_profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia_profesor` (
  `id_materia` int NOT NULL,
  `id_profesor` int NOT NULL,
  PRIMARY KEY (`id_materia`,`id_profesor`),
  KEY `id_profesor` (`id_profesor`),
  CONSTRAINT `materia_profesor_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id`),
  CONSTRAINT `materia_profesor_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia_profesor`
--

LOCK TABLES `materia_profesor` WRITE;
/*!40000 ALTER TABLE `materia_profesor` DISABLE KEYS */;
INSERT INTO `materia_profesor` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `materia_profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `id_materia` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (1,'Ana','Lopez','984567890','ana@mail.com','Matemática'),(2,'Miguel','Valencia','912345678','miguelv@mail.com','Comunicación'),(3,'Carmen','Ramos','998765432','carmenr@mail.com','Ciencias Naturales'),(4,'Roberto','Medina','932145678','roberto@mail.com','Educación Física'),(5,'Sonia','Palacios','934567890','soniap@mail.com','Inglés'),(6,'Carlos','Huerta','998765432','carlos@mail.com','Arte y Cultura'),(7,'Pedro','Quispe','987654123','pedroq@mail.com','Educación Cívica'),(8,'Lucía','Calle','976543210','luciac@mail.com','Computación'),(9,'Marco','Zegarra','945678321','marcoz@mail.com','Innovación y Emprendimiento'),(10,'Beatriz','Salazar','956789432','beatriz@mail.com','Ciencias Sociales');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor_aula`
--

DROP TABLE IF EXISTS `profesor_aula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor_aula` (
  `id_profesor` int NOT NULL,
  `id_aula` int NOT NULL,
  PRIMARY KEY (`id_profesor`,`id_aula`),
  KEY `id_aula` (`id_aula`),
  CONSTRAINT `profesor_aula_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`),
  CONSTRAINT `profesor_aula_ibfk_2` FOREIGN KEY (`id_aula`) REFERENCES `aula` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor_aula`
--

LOCK TABLES `profesor_aula` WRITE;
/*!40000 ALTER TABLE `profesor_aula` DISABLE KEYS */;
INSERT INTO `profesor_aula` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `profesor_aula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor_estudiante`
--

DROP TABLE IF EXISTS `profesor_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor_estudiante` (
  `id_profesor` int NOT NULL,
  `id_estudiante` int NOT NULL,
  PRIMARY KEY (`id_profesor`,`id_estudiante`),
  KEY `id_estudiante` (`id_estudiante`),
  CONSTRAINT `profesor_estudiante_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`),
  CONSTRAINT `profesor_estudiante_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor_estudiante`
--

LOCK TABLES `profesor_estudiante` WRITE;
/*!40000 ALTER TABLE `profesor_estudiante` DISABLE KEYS */;
INSERT INTO `profesor_estudiante` VALUES (1,1),(2,2),(3,3),(1,4);
/*!40000 ALTER TABLE `profesor_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_entrega` datetime NOT NULL,
  `estado` enum('Pendiente','Entregado') DEFAULT 'Pendiente',
  `curso_id` int NOT NULL,
  `archivo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `materia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` VALUES (1,'Calidad de software proyecto','Proyecto final de la asignatura de bases de datos','2024-12-20 23:59:00','Pendiente',1,'uploads\\b53f054d54574342bd1406bb7c5fe953'),(4,'Mate','Una tarea mas','2024-11-17 12:12:00','Entregado',1,NULL),(5,'Ciencias Naturales','Ciencias Naturales','2024-12-20 12:00:00','Pendiente',3,NULL);
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('estudiante','profesor','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'estudiante','$2a$2a$10$peHb.3xfB.uJ5NbnQLGT9OqzWG6JipWPysGFTR87GuD3IrZCM/.9K','estudiante@gmail.com','estudiante'),(2,'profesor','$2a$10$peHb.3xfB.uJ5NbnQLGT9OqzWG6JipWPysGFTR87GuD3IrZCM/.9K','profesor@gmail.com','profesor'),(3,'admin','$2a$10$peHb.3xfB.uJ5NbnQLGT9OqzWG6JipWPysGFTR87GuD3IrZCM/.9K','admin@gemail.com','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('estudiante','profesor','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Yoel Coila','yoel.coila@correo.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(2,'Alodia Flores','alodia@correo.com','$2a$10$ivtvWwoGayN4vmU.01P9iOzODCg3AxQU5vvU2zByFrd/0djyFXKGi','profesor'),(3,'William Vilcapaza','william@correo.com','$2a$10$fBphSc3bQKZMIs1fgCUOI.DxcEJ2opWexgmkCfGUQlfrYVHzVK4y.','estudiante'),(4,'admin','admin@correo.com','$2a$10$LS8DPHAQPMxBSPmGOsylq.X6Y90Nnp6M8Ejvthru5vf0VyttHKbde','admin'),(8,'Fidel Huanco','fidel@correo.com','$2a$10$coPQPGQaAA9ts6LwBPSs2uJH8p1bgBpYovut8zv4Qy7HuzsqIn1li','profesor'),(9,'Carlos Quispe','carlosq@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(10,'Lucía Choque','luciach@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(11,'Javier Mamani','javierm@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(12,'Rosa Huamán','rosah@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(13,'Fernando Apaza','fernandoa@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(14,'Valeria Calla','valeriac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(15,'Dante Choque','dantec@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(16,'Andrea Cusi','andreac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(17,'Javier Quispe','javierq@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(18,'Yuri Huamaní','yurih@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(19,'Laura Mamani','lauram@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(20,'Carlos Paredes','carlosp@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(21,'Claudia Vilca','claudiav@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(22,'Diego Quispe','diegoq@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(23,'Renata Torres','renatat@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(24,'Luciana Gutiérrez','lucianag@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(25,'Piero Salas','pieros@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(26,'Valentina Zevallos','valentinaz@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(27,'Miguel Puma','miguelp@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(28,'Oscar Choque','oscarc@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(29,'Ana Vega','anav@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(30,'Samuel Apaza','samuela@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(31,'Carmen Quispe','carmenq@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(32,'Gabriel Cusi','gabrielc@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(33,'Luisa Mamani','luisam@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(34,'Juan Ccalla','juanc@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(35,'Fátima Huanca','fatimah@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(36,'Sofía Ramos','sofiar@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(37,'Cristian Flores','cristianf@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(38,'Daniela Vilca','danielav@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(39,'Luis Chura','luisc@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(40,'Franco Torres','francot@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(41,'María Cordero','mariac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(42,'Valeria Herrera','valeriah@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(43,'Carlos Mendoza','carlosm@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(44,'Rebeca Choque','rebecac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(45,'Eduardo Vilca','eduardov@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(83,'Karla Chura','karlac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(84,'Julio Mendoza','juliom@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(85,'Sofía Flores','sofiaf@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(86,'Rafael Torres','rafaelt@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(87,'Marcela Apaza','marcelaa@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(88,'Gustavo Chura','gustavoc@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(89,'Natalia Huanca','nataliah@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(90,'Jorge Apaza','jorgea@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(91,'Beatriz Mendoza','beatrizm@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(92,'Roberto Choque','robertoc@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(93,'Cecilia Cordero','ceciliac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(94,'Iván Ramos','ivanr@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(95,'Laura Vilca','laurav@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(96,'Simón Puma','simonp@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(97,'Andrea Ramos','andrear@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(98,'Luis Mamani','luismm@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(99,'Paola Choque','paolac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(100,'Valeria Ramos','valeriar@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(101,'Ricardo Mamani','ricardom@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(102,'Felipe Quispe','felipeq@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(103,'Carmen Flores','carmenf@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(104,'Javier Vega','javierv@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(105,'Luciana Choque','lucianac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(106,'Fernando Mamani','fernandom@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(107,'Carolina Salas','carolinas@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(108,'Jorge Mendoza','jorgem@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(109,'Sofía Quispe','sofiaq@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(110,'José Huanca','joseh@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(111,'Renato Choque','renatoch@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(112,'Juan Ramos','juanr@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(113,'Rocío Vega','rociov@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(114,'Martín Apaza','martina@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(115,'Ricardo Ramos','ricardor@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(116,'Valentina Choque','valentinac@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(117,'Camila Quispe','camilaq@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(118,'Oscar Mendoza','oscarm@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(119,'Esteban Choque','estebanc@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(120,'Samuel Ramos','samuelr@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(121,'Héctor Vega','hectorv@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante'),(122,'Luz Ccalla','luzc@mail.com','$2a$10$4Rj5OTGCHDUkAvi6xg0fTuizcwlP3KRgQStHBx88oNym6y2a/gff2','estudiante');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'aula_virtual'
--

--
-- Dumping routines for database 'aula_virtual'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-16 14:50:44
