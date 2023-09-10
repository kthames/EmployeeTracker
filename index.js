const inquirer = require('inquirer');
const { view, addRole, addDepartment, updateEmployee, addEmployee } = require('./lib/index');

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

main();




