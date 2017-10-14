drop database if exists diagnoser;
create database diagnoser;

use diagnoser;
create table users(
user_id integer auto_increment not null,
email varchar (255) not null,
password varchar (255) not null,
name varchar (255) not null,
phone varchar(20),
gender varchar (20),
age integer,
primary key (user_id)
);

create table requests(
request_id integer auto_increment not null,
time bigint Not Null,
fk_user_id integer,
search_text varchar (255),
primary key (request_id),
foreign key (fk_user_id) references users(user_id)
);

create table symptoms(
symptom_id integer auto_increment not null,
fk_request_id integer not null,
sID varchar (255),
primary key (symptom_id),
foreign key (fk_request_id) references requests(request_id)
);

create table diagnosis(
diagnosis_id integer auto_increment not null,
fk_request_id integer,
condition_id varchar (255),
primary key (diagnosis_id),
foreign key (fk_request_id) references requests(request_id)
);

select * from users;
select * from symptoms;
select * from requests;