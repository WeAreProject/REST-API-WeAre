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

CREATE TABLE owners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    image VARCHAR(500),
    rating DECIMAL(3,1) DEFAULT 0,
    reviews INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
