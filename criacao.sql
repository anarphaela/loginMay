create database login;
use login;

create table user(
iduser INT primary key,
username varchar(20) not null,
password varchar (8) not null);
insert into user values (1, 'ana.rapha', '12345');
SELECT * FROM user;