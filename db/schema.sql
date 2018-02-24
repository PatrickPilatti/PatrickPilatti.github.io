

USE burgers_db;

CREATE TABLE burgers (
	Id Int (11) auto_increment not null,
    burger_name varchar(255),
    devoured boolean,
    
    PRIMARY KEY ( id) );