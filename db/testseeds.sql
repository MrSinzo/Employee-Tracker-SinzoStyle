INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Ammo Vendor", 30.99, 1),
       (2, "Food Vendor", 17.99, 2),
       (3, "Armor Vendor", 22.99, 3),
       (4, "Weapons Vendor", 24.99, 4);

SELECT * FROM role;

INSERT INTO employee (id, first_name, last_name, manager_id)
VALUES (1, "Jake", "Hornady", 1),
       (2, "Betty", "Crocket", 0),
       (3, "Vulcan", "Ironsides", 0),
       (4, "Jason", "Borne", 1);

SELECT * FROM employee;

INSERT INTO department (id, name)
VALUES (1, "Ammunition Depo"),
       (2, "Food Outlet"),
       (3, "Armor Emporium"),
       (4, "Weapons Gallery");

SELECT * FROM department;