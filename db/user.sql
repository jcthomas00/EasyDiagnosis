use diagnoser;
create table user(
id integer auto_increment not null,
email varchar (255),
password varchar (255),
name varchar (255),
gender varchar (1),
primary key (id));