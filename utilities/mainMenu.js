const inquirer = require('inquirer');
const db = require('../config/createConnection')

const mainMenu = ()  => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose an action.',
            name: 'mainMenu',
            choices: [
                'View employees',
                'View roles',
                'View departments',
                'Add employee',
                'Add role',
                'Add department',
                'Update employees',
                'Exit'
            ],
        },
    ])
   .then(({mainMenu}) => {
    console.log(mainMenu)
    switch(mainMenu) {
        case  'View employees':
          viewAllEmployees();
          break;
          case  'View departments':
          viewAllDepartments();
          break;
          case  'View roles':
          viewAllRoles();
          break;
          case  'Add employee':
          addAnEmployee();
          break;
          case  'Add department':
          addDepartment();
          break;
          case  'Add role':
          addRole();
          break;
          case  'Update employees':
          updateEmployee();
          break;
          case 'Exit':

          console.log(`Quit application`);
          process.exit(0)
        }
   }
   )
}
const viewAllDepartments = () => {
    db.promise().query('SELECT * FROM department').then(([data]) => {
    console.table(data);
    mainMenu()
   })
}

const viewAllEmployees = () => {
    db.promise().query('SELECT * FROM employee')
    .then(([empTable]) => {
        console.log(``)
        console.table(empTable)
        console.log('')
    })
    .then(() => {
        mainMenu()

    })
}

const viewAllRoles = () => {
    db.promise().query('SELECT * FROM roles')
    .then(([roleTable]) => {
        console.log(``)
        console.table(roleTable)
        console.log('')
    })
    .then(() => {
        mainMenu()
    })
}

module.exports = mainMenu;