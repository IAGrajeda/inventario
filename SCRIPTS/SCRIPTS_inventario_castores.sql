
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS inventario_castores;
USE inventario_castores;

-- Crear tabla roles
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

-- Crear tabla usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- Crear tabla productos
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT DEFAULT 0,
    estatus VARCHAR(20) DEFAULT 'activo'
);

-- Crear tabla movimientos
CREATE TABLE movimientos (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_movimiento ENUM('entrada', 'salida') NOT NULL,
    cantidad_movida INT NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Eliminar llave foránea y columna id_usuario en movimientos (si aplica)
ALTER TABLE movimientos DROP FOREIGN KEY movimientos_ibfk_2;
ALTER TABLE movimientos DROP COLUMN id_usuario;

-- Consulta para verificar productos
SELECT * FROM productos;

-- Permitir updates sin clave
SET SQL_SAFE_UPDATES = 0;

-- Limpiar datos
DELETE FROM movimientos;
DELETE FROM productos;

-- Restaurar safe updates
SET SQL_SAFE_UPDATES = 1;
