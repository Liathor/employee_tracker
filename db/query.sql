--Queries for the sql database--
-- Insert a department--
INSERT INTO department (name) VALUES ('Executive');
-- Insert a role--
INSERT INTO role (title, salary, department_id) VALUES ('President', 400000, 8);
-- Insert an employee--
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mr.', 'President', 15, NULL);
-- Select all employees--
SELECT * FROM employee;
-- Select all roles--
SELECT * FROM role;
-- Select all departments--
SELECT * FROM department;
-- Select all employees by department--
SELECT employee.first_name, employee.last_name, department.name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;
-- Select all employees by manager--
SELECT e.first_name, e.last_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id;
-- Update an employee's role--
UPDATE employee
SET role_id = 2
WHERE id = 1;