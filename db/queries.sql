USE employee_db;

-- Retrieve a list of all departments
SELECT
    name AS "Department Name",
    id AS "Department ID"
FROM 
    department;

-- Obtain a detailed overview of available job roles
SELECT
    role.title AS "Job Title",
    role.id AS "Role ID",
    department.name AS "Department",
    role.salary AS "Salary"
FROM 
    role
JOIN 
    department ON role.department_id = department.id;

-- Retrieve comprehensive information about all employees
SELECT
    employee.id AS "Employee ID", 
    CONCAT(employee.first_name, " ", employee.last_name) AS "Employee Name",
    role.title AS "Job Title",
    department.name AS "Department",
    role.salary AS "Salary",
    CONCAT(manager.first_name, " ", manager.last_name) AS "Manager Name"
FROM 
    employee
LEFT JOIN 
    employee AS manager ON employee.manager_id = manager.id
JOIN 
    role ON employee.role_id = role.id
JOIN 
    department ON role.department_id = department.id;

-- Add a new department to the organization
INSERT INTO 
    department (name) 
VALUES 
    ("Quantum Engineering"),
    ("Astro Marketing"),
    ("Project Constellation Management"),
    ("Financial Celestial Affairs");

-- Create a new role within the organization
INSERT INTO 
    role (title, salary, department_id)    
VALUES 
    ("Quantum Engineer", 150000, 1);

-- Employ a new team member and assign a role
INSERT INTO 
    employee (first_name, last_name, role_id, manager_id) 
VALUES 
    ("Nova", "Explorer", 5, 3);

-- Promote an existing employee to a leadership role
UPDATE 
    employee
SET 
    role_id = 1
WHERE 
    id = 11;
