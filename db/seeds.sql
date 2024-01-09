INSERT INTO department (dep_name)
VALUES ("Engineering"),
        ("Marketing"),
        ("Project Management"),
        ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Head of Marketing", 250000, 2),
        ("Lead Software Developer", 150000, 1),
        ("Junior Developer", 80000, 1),
        ("Project Manager", 200000, 3),
        ("Lawyer", 200000, 4),
        ("Accountant", 150000, 2),
        ("Graphic Designer", 120000, 2),
        ("Sales Manager", 180000, 2);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES ("Johnson", "Alice", 1, NULL),
        ("Williams", "Michael", 1, NULL),
        ("Brown", "Emily", 2, 1),
        ("Davis", "Christopher", 2, 3),
        ("Taylor", "Olivia", 2, 4),
        ("Martinez", "Ryan", 3, 1),
        ("Hernandez", "Sophia", 3, 5),
        ("Smith", "Brandon", 4, 2),
        ("Anderson", "Emma", 4, 3),
        ("Jones", "Matthew", 4, 6);