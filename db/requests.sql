use diagnoser;
create table requests(
query_Id integer auto_increment not null,
time DATETIME Not Null,
user_id varchar (255),
search_text varchar (255),
primary key (query_Id),
foreign key requests(user_id) references users(user_id)
);