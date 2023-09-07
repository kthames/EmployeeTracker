INSERT INTO department (name) 
VALUES ("Accounting"), 
       ("Research"), 
       ("Sales"),
       ("Operations");


INSERT INTO role (title, salary, department_id)
VALUES ("Senior Accountant", 100000, 1),
       ("Junior Accountant", 80000, 1),
       ("Assistant Accountant", 60000, 1),
       ("Senior Researcher", 100000, 2),
       ("Junior Researcher", 80000, 2),
       ("Assistant Researcher", 60000, 2),
       ("Senior Marketing Advisor", 100000, 3),
       ("Assistant Marketing Advisor", 60000, 3),
       ("Senior Operations Manager", 100000, 4),
       ("Junior Operations Manager", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mario", "Mckenzie", 7, null), 
       ("Millie", "Lucas", 8, 1), 
       ("Ela", "Richardson", 1, null), 
       ("Chantelle", "Levy", 2, 3),
       ("Clarence", "Woodward", 3, 4), 
       ("Lana", "Buchanan", 9, null),
       ("Gideon", "Herrera", 10, 6),
       ("Ava", "Bass", 4, null), 
       ("Annalise", "Brooks", 5, 8),
       ("Serena", "Campbell", 6, 9);

 
