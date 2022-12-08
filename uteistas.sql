
-- -----------------------------------------------------
-- Table `uteistas`.`estudiantes`
-- ----------------------------------------------------- 
CREATE TABLE `campo` (
 `campo_id` int(11) NOT NULL AUTO_INCREMENT,
 `campo_nombre` varchar(80) COLLATE utf8mb4_bin NOT NULL,
 PRIMARY KEY (`campo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `carrera` (
 `carrera_id` int(11) NOT NULL AUTO_INCREMENT,
 `carrera_nombre` varchar(60) COLLATE utf8mb4_bin NOT NULL,
 PRIMARY KEY (`carrera_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `docente` (
 `docente_id` int(11) NOT NULL AUTO_INCREMENT,
 `docente_cedula` varchar(15) COLLATE utf8mb4_bin NOT NULL,
 `docente_nombre` varchar(60) COLLATE utf8mb4_bin NOT NULL,
 `docente_sexo` varchar(1) COLLATE utf8mb4_bin NOT NULL,
 PRIMARY KEY (`docente_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


CREATE TABLE `estudiante` (
 `estudiante_id` int(11) NOT NULL AUTO_INCREMENT,
 `estudiante_img` varchar(200) COLLATE utf8mb4_bin,
 `estudiante_cedula` varchar(10) COLLATE utf8mb4_bin NOT NULL,
 `estudiante_nombre` varchar(60) COLLATE utf8mb4_bin NOT NULL,
 `estudiante_sexo` varchar(1) COLLATE utf8mb4_bin NOT NULL,
 `estudiante_jornada` varchar(20) COLLATE utf8mb4_bin NOT NULL,
 `estudiante_promedio` float NOT NULL,
 `campo_id` int(11) NOT NULL,
 PRIMARY KEY (`estudiante_id`),
 KEY `campo_id` (`campo_id`),
 CONSTRAINT `estudiante_ibfk_1` FOREIGN KEY (`campo_id`) REFERENCES `campo` (`campo_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `materia` (
 `materia_id` int(11) NOT NULL AUTO_INCREMENT,
 `materia_nombre` varchar(60) COLLATE utf8mb4_bin NOT NULL,
 `docente_id` int(11) NOT NULL,
 `carrera_id` int(11) NOT NULL,
 PRIMARY KEY (`materia_id`),
 KEY `docente_id` (`docente_id`),
 KEY `carrera_id` (`carrera_id`),
 CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`docente_id`) REFERENCES `docente` (`docente_id`) ON UPDATE CASCADE,
 CONSTRAINT `materia_ibfk_2` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`carrera_id`) ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `matricula` (
 `matricula_id` int(11) NOT NULL AUTO_INCREMENT,
 `matricula_fecha` date NOT NULL,
 `carrera_id` int(11) NOT NULL,
 `estudiante_id` int(11) NOT NULL,
 PRIMARY KEY (`matricula_id`),
 KEY `carrera_id` (`carrera_id`),
 UNIQUE KEY `estudiante_id` (`estudiante_id`),
 CONSTRAINT `matricula_ibfk_1` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`carrera_id`) ON UPDATE CASCADE,
 CONSTRAINT `matricula_ibfk_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiante` (`estudiante_id`) ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
