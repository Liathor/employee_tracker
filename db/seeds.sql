-- Seed data for departments table--
INSERT INTO department (name) VALUES 
('HR'),
('Engineering'),
('Finance'),
('Legal'),
('Sales'),
('Marketing'),
('Customer Service');

-- Seed data for roles table--
INSERT INTO role (title, salary, department_id) VALUES 
('HR Manager', 100000, 1),
('Recruiter', 80000, 1),
('Software Engineer', 120000, 2),
('QA Engineer', 100000, 2),
('Finance Manager', 120000, 3),
('Accountant', 90000, 3),
('Legal Counsel', 120000, 4),
('Lawyer', 100000, 4),
('Sales Manager', 120000, 5),
('Sales Associate', 90000, 5),
('Marketing Manager', 110000, 6),
('Marketing Associate', 90000, 6),
('Customer Service Manager', 100000, 7),
('Customer Service Rep', 80000, 7);

-- Seed data for employees table--
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Alice', 'Johnson', 3, NULL),
('Bob', 'Brown', 4, 3),
('Charlie', 'White', 5, NULL),
('David', 'Black', 6, 5),
('Eve', 'Green', 7, NULL),
('Frank', 'Blue', 8, 7),
('Grace', 'Purple', 9, NULL),
('Hank', 'Orange', 10, 9),
('Ivy', 'Red', 11, NULL),
('Jack', 'Yellow', 12, 11),
('Kelly', 'Pink', 13, NULL),
('Larry', 'Teal', 14, 13);