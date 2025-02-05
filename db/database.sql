CREATE DATABASE IF NOT EXISTS wearedb;


USE wearedb;

CREATE TABLE services(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name Varchar (54) DEFAULT NULL,
    description TEXT(200)DEFAULT NULL,
    PRIMARY KEY (id)
);


DESCRIBE services;

INSERT INTO services VALUES
(1, 'Diseño Gráfico', 'Servicio profesional de diseño de logotipos '),
(2, 'Consultoría Financiera' , 'Asesoramiento en inversiones y planificación financiera');
