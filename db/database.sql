CREATE DATABASE IF NOT EXISTS wearedb;


USE wearedb;

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



CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE businesses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    operation_hours VARCHAR(255) NOT NULL,
    social_media_links JSON DEFAULT NULL, -- Se almacenan como un array JSON (opcional)
    tax_id VARCHAR(50) DEFAULT NULL, -- RFC (Opcional)
    professional_license VARCHAR(500) DEFAULT NULL, -- Licencia profesional (Imagen)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);
