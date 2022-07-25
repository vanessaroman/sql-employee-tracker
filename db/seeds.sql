-- tables here
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO employee_role (id, title, salary, department)
VALUES ("201", "Sales Lead", "100000", "Sales"),
       ("202", "Salesperson", "80000", "Sales"),
       ("203", "Lead Engineer", "150000", "Engineering"),
       ("204", "Software Engineer", "120000", "Engineering"),
       ("204", "Account Manager", "160000", "Finance"),
       ("204", "Accountant", "125000", "Finance"),
       ("204", "Legal Team Lead", "250000", "Legal"),
       ("204", "Lawyer", "190000", "Legal");