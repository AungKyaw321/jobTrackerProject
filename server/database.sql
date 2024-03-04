DROP TABLE IF EXISTS UserApplication;
DROP TABLE IF EXISTS JobApplication;
DROP TABLE IF EXISTS AppUser;

CREATE TABLE AppUser(
    user_id SERIAL,
    first_name varchar(255) not null,
    middle_name varchar(255),
    last_name varchar(255) not null,
    email varchar(255) unique,
    password varchar(255),
    primary key(user_id)
);

CREATE TABLE JobApplication(
    user_id int,
    application_id  SERIAL,
    company_name VARCHAR(255) not null,
    application_status VARCHAR(255) not null,
    application_date date,
    role_description VARCHAR (255),
    foreign key (user_id) references AppUser(user_id),
    primary key (user_id, application_id)
);




