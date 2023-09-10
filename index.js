const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

function main() {
    inquirer.prompt([
      {
          type: 'list', 
          name: 'choice',
          message: 'What would you like to do?', 
          choices: [
              'View All Employees', 
              'Add Employee', 
              'Update Employee Role', 
              'View All Roles', 
              'Add Role', 
              'View All Departments', 
              'Add Department',
              'Exit'
          ]
      }
    ])
    .then((answers) => {

      const task = answers.choice;

      if (task=== 'View All Employees' || task=== 'View All Roles' || task=== 'View All Departments'){
        view(task);
      } 
      if (task=== 'Update Employee Role'){
        updateEmployee();      
      }
      if (task=== 'Add Employee'){
        addEmployee();
      } 
      if (task=== 'Add Role'){
        addRole();
      }
      if (task=== 'Add Department'){
        addDepartment();
      }
      if (task === "Exit") {
          process.exit();
      }; 
    })
    .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
    });
} 

const view = (task) => {
  let sql = "";

  switch(task) {
      case 'View All Employees':
          sql = `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name,
                        role.title AS title,
                        role.salary AS salary,
                        department.name AS department,
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager 
                  FROM employee
                  LEFT JOIN role ON employee.role_id = role.id
                  LEFT JOIN department ON role.department_id = department.id
                  LEFT JOIN employee manager ON employee.manager_id = manager.id`;
        break;
      case 'View All Departments':
         sql = `SELECT * FROM department`;
        break;
      case 'View All Roles':
          sql = `SELECT role.title,
                        role.id, 
                        role.salary, 
                        department.name AS department
                  FROM role
                  LEFT JOIN department ON role.department_id = department.id`;
          break;
      default:
        console.log('View not completed');
        return
    }

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
        return main();
    }); 
};

const addRole = async () => {
  let [departments] = await db.promise().query('SELECT name, id AS value FROM department');

  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of this role?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Invalid name!");
          return false;
        };
      }
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
      validate: salaryInput => {
        if (isNaN(salaryInput)) {
          console.log("Invalid salary");
          return false;
        } else {
          return true;
        };
      }
    }, 
    {
      type: "list",
      name: "department_id",
      message: "What is department does this role belong to?",
      choices: departments
    }
  ]).then(answer => {
    console.log(answer);

    db.promise().query(`INSERT INTO role SET ?`, [answer]);
    view('View All Roles');
  })
};

const addDepartment = () => {

  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of this department?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a department name");
          return false;
        };
      }
    }
  ])
  .then(answer => {
    const sql = `INSERT INTO department (name)
      VALUES (?)`;
    const params = answer.name;
    db.query(sql, params, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Department ${answer.name} added!`);
      return view('View All Departments');
    });
  });
};

const updateEmployee = async () => {
  
  let [roles] = await db.promise().query('SELECT title AS name, id AS value FROM role');
  let [employees] = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee');
  let [managers] = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee');

  console.log(employees);

  inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Which employee's role would you like to update?",
      choices: employees
    }, 
    {
      type: "list",
      name: "role_id",
      message: "What is the employee's new role?",
      choices: roles
    }, 
    {
      type: "list",
      name: "manager_id",
      message: "Who is the employee's manager?",
      choices: managers
    }
  ]).then(answer => {
    console.log(answer);

    db.promise().query(`UPDATE employee SET role_id = ${answer.role_id}, manager_id = ${answer.manager_id} WHERE id = ${answer.id}`);
    view('View All Employees');
  })
};

const addEmployee = async () => {
  var params = [];

  let [roles] = await db.promise().query('SELECT title AS name, id AS value FROM role');
  let [managers] = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee');

  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Invalid name!");
          return false;
        };
      }
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Invalid name!");
          return false;
        };
      }
    }, 
    {
      type: "list",
      name: "role_id",
      message: "What is the role for this employee?",
      choices: roles
    }, 
    {
      type: "list",
      name: "manager_id",
      message: "Who is the employee's manager?",
      choices: managers
    }
  ]).then(answer => {
    console.log(answer);

    db.promise().query(`INSERT INTO employee SET ?`, [answer]);
    view('View All Employees');

  })
};

main();





