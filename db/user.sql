use diagnoser;
create table user(
id integer auto_increment not null,
email varchar (255) not null,
password varchar (255) not null,
name varchar (255) not null,
phone integer (9),
gender varchar (1),
age integer (255),
primary key (id));
