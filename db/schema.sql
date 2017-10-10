drop database if exists diagnoser;
use diagnoser;
create table trending(
id integer auto_increment not null,
sym_name varchar (255),
primary key (id));

select from sym_name from trending 
where count(id) as "instances" 
group by sym_name
order by "instances" desc
limit 1;