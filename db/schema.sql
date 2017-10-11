drop database if exists diagnoser;
create database diagnoser;
use diagnoser;
create table trending(
id varchar (255) not null,
sym_name varchar (255));


select sym_name, count(id) from trending   
group by sym_name
order by count(id) desc
limit 2;