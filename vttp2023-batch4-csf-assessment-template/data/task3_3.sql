-- TODO Task 3

create database emart;
use emart;

create table order (
    name varchar(128) not null,
    address varchar(128) not null,
    priority boolean not null,
    comments varchar(128) not null,

    primary key (address)
);

create table cart (
    

);


