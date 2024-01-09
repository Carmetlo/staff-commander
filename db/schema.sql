Drop DATABASE if EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  salary DECIMAL(10, 2),
  department_id INT
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) on DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id) on DELETE SET NULL
);
