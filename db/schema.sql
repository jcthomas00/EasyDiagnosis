drop database if exists diagnoser;
create database diagnoser;
use diagnoser;
create table trending(
id varchar (255) not null,
sym_name varchar (255));

insert into trending(
id, sym_name)
values 
("s101", "sneezing"),
("s101", "sneezing"),
("s102", "coughing");

select sym_name, count(id) from trending   
group by sym_name
order by count(id) desc
limit 2;