DROP DATABASE IF EXISTS myStore_db;
CREATE DATABASE myStore_db;

USE myStore_db;

-- CREATE TABLE [IF NOT EXISTS] table_name 
-- for later in project

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30), 
    salary DECIMAL(35, 2), 
    department_id INT, -- should get number from department table
    FOREIGN KEY (department_id)
    REFERENCES department(id) 
    );

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, -- should get number from role table
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);

