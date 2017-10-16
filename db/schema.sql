drop database if exists diagnoser;
create database diagnoser;

use diagnoser;
drop table if exists symptoms;
drop table if exists diagnosis;
drop table if exists requests;
drop table if exists users;

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
foreign key (fk_user_id) references users(user_id) ON DELETE CASCADE
);

create table symptoms(
symptom_id integer auto_increment not null,
fk_request_id integer not null,
sID varchar (255),
symptom_name varchar(255),
primary key (symptom_id),
foreign key (fk_request_id) references requests(request_id) ON DELETE CASCADE
);

create table diagnosis(
diagnosis_id integer auto_increment not null,
fk_request_id integer,
condition_id varchar (255),
condition_name varchar(255),
primary key (diagnosis_id),
foreign key (fk_request_id) references requests(request_id) ON DELETE CASCADE
);

select * from users;
select * from symptoms;
select * from requests;
select * from diagnosis;

select diagnosis.condition_name, requests.time, requests.request_id, requests.search_text from users left join requests on users.user_id=requests.fk_user_id left join diagnosis on requests.request_id= diagnosis.fk_request_id where users.user_id =1 order by time desc;
select symptoms.symptom_name from symptoms left join requests on symptoms.fk_request_id=requests.request_id where requests.request_id=2;


SELECT symptom_name, AVG(time) as avgtime, COUNT(symptom_id) AS Count FROM symptoms LEFT JOIN requests on symptoms.fk_request_id =requests.request_id GROUP BY symptom_name ORDER BY avgtime LIMIT 5;
SELECT symptom_name, AVG(time) as avgtime, COUNT(symptom_id) AS Count FROM symptoms LEFT JOIN requests on symptoms.fk_request_id =requests.request_id GROUP BY symptom_name ORDER BY avgtime LIMIT 10;
