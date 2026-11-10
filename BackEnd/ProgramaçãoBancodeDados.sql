CREATE TABLE cargo(
id_car SERIAL,
nome_car VARCHAR(50)
);
CREATE TABLE pessoa(
id_pess SERIAL,
nome_pess VARCHAR(50)
);
SELECT * FROM cargo;
SELECT * FROM pessoa;
INSERT INTO cargo(nome_car) VALUES ('Gerente');
INSERT INTO pessoa(nome_pess) VALUES ('Adalberto');
