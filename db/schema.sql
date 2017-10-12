drop database if exists diagnoser;
create database diagnoser;

use diagnoser;
create table user(
user_id integer auto_increment not null,
email varchar (255) not null,
password varchar (255) not null,
name varchar (255) not null,
phone integer (9),
gender varchar (1),
age integer (255),
primary key (user_id));

create table requests(
query_id integer auto_increment not null,
time DATETIME Not Null,
fk_user_id integer (255),
search_text varchar (255),
primary key (query_id),
foreign key (fk_user_id) references user(user_id)
);

create table symptoms(
fk_query_id integer (255) not null,
symptom_id integer auto_increment not null,
sID varchar (255),
primary key (symptom_id),
foreign key (fk_query_id) references requests(query_id)
);

create table diagnosis(
diagnosis_id integer auto_increment not null,
fk_query_id integer,
condition_id varchar (255),
primary key (diagnosis_id),
foreign key (fk_query_id) references requests(query_id)
);