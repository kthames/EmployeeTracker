const db = require('./db/connection');
const inquirer = require('inquirer');

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
        //update(task);
      }
      if (task=== 'Add Employee' || task=== 'Add Role' || task=== 'Add Department'){
        //add(task);
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

const view = (viewItem) => {
  let sql = "";

  switch(viewItem) {
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
        sql = 'SELECT * FROM department';
        break;
      case 'View All Roles':
          sql = 'SELECT * FROM role';
          break
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
}

main();

