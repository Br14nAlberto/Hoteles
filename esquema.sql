SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS gestionh;
CREATE DATABASE IF NOT EXISTS gestionh DEFAULT CHARACTER SET UTF8MB4;
USE gestionh;

CREATE TABLE gerentes(
id_grt						INTEGER NOT NULL AUTO_INCREMENT,
nombre						VARCHAR(80) NOT NULL,
ap_paterno					VARCHAR(15) NOT NULL,
ap_materno					VARCHAR(15) NOT NULL,
telefono					VARCHAR(10) NOT NULL,
PRIMARY KEY(id_grt)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE hoteles(
id_htl						INTEGER NOT NULL AUTO_INCREMENT,
nombre						VARCHAR(40) NOT NULL,
direccion					VARCHAR(100) NOT NULL,
telefono					VARCHAR(10) NOT NULL,
correo						VARCHAR(30) NOT NULL,
id_grt						INTEGER,
PRIMARY KEY(id_htl),
FOREIGN KEY(id_grt) REFERENCES gerentes(id_grt)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE habitaciones(
id_hbt						INTEGER NOT NULL AUTO_INCREMENT,
piso							VARCHAR(10) NOT NULL,
nombre						VARCHAR(30) NOT NULL,
refrigerador					BOOLEAN	NOT NULL,
id_htl						INTEGER,
PRIMARY KEY(id_hbt),
FOREIGN KEY(id_htl) REFERENCES hoteles(id_htl)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE imagenes_hoteles(
  id_imagen int NOT NULL AUTO_INCREMENT,
  imagen mediumblob NOT NULL,
  nombre varchar(30) DEFAULT NULL,
  id_htl int NOT NULL,
  PRIMARY KEY (id_imagen),
  FOREIGN KEY(id_htl) REFERENCES hoteles(id_htl),
  CONSTRAINT UC_Imagen1 UNIQUE (imagen)
) DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE imagenes_habitaciones(
  id_imagen int NOT NULL AUTO_INCREMENT,
  imagen mediumblob NOT NULL ,
  nombre varchar(30) DEFAULT NULL,
  id_hbt int NOT NULL,
  PRIMARY KEY (id_imagen),
  FOREIGN KEY(id_hbt) REFERENCES habitaciones(id_hbt),
  CONSTRAINT UC_Imagen2 UNIQUE (imagen)
) DEFAULT CHARACTER SET UTF8MB4;

alter table gerentes auto_increment=1;
alter table hoteles auto_increment=1;
alter table habitaciones auto_increment=1;
alter table imagenes_hoteles auto_increment=1;
alter table imagenes_habitaciones auto_increment=1;

INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono) VALUES('Erick','Hernandez','Loyola','3433335566');
INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono) VALUES('Brian','Venegas','Rayon','3433335566');
INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono) VALUES('Hector','Bernal','Rodriguez','3433335566');

INSERT INTO hoteles(nombre,direccion,telefono,correo,id_grt) VALUES('Emporio','Av. Central #469','1111111111','emporio@contacto.com',1);
INSERT INTO hoteles(nombre,direccion,telefono,correo,id_grt) VALUES('Fiesta Americana','Av. Constituyentes #376','2222222222','fiestaam@contacto.com',2);
INSERT INTO hoteles(nombre,direccion,telefono,correo,id_grt) VALUES('Royal','Av. Reforma #1224','3333333333','royal@contacto.com',3);

INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('Primero','Suite Doble',TRUE,1);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('Segundo','Suite Sencilla',FALSE,1);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('Segundo','Habitacion Simple',FALSE,2);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('Primero','Suite Imperial',TRUE,2);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('Segundo','Habitacion Doble',FALSE,3);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('Primero','Habitacion Familiar',TRUE,3);