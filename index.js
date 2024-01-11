const inquirer = require("inquirer");
const figlet = require("figlet");
const db = require("./helpers/database.js");
const { addDepartment } = require("./helpers/menu.js");

function welcome() {
  
    let welcome_message = "Staff Commander";
    return figlet.text(
      welcome_message,
      // {
      //   font: "Ghost",
      // },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
        return data  
        
        }
      }
      
    );
    
  }
  function mainMenu () {
    inquirer.prompt(menuItems).then(async(answers) => {
        switch (answers.choice) {
          case "viewAllEmployees":
            // const [empResults] = await db.viewAllEmployees();
            // console.table(empResults);
            // return mainMenu();
            db.viewAllEmployees().then(([results]) => {
                console.table(results);
                mainMenu();
            });
            break;
          case "viewAllRoles":
            db.viewAllRoles().then(([results]) => {
                console.table(results);
                mainMenu();
            });
            break;
          case "viewAllDepartments":
            db.viewAllDepartments().then(([results]) => {
                console.table(results);
                mainMenu();
            });
            break;
          case "addDepartment":
            inquirer.prompt(addDepartment).then(async(answers) => {
                await db.addDepartment(answers.dep_name);
                console.log(`Added ${answers.dep_name} to the database.`);
                mainMenu();
            });
            break;
    
          case "addRole":
            return mainMenu();
      
          case "addEmployee":
            return mainMenu();
      
          case "updateEmployeeRole":
            return mainMenu();
      
          case "updateEmployeeManager":
            return mainMenu();
      
          case "viewTotalUtilizationByDepartment":
            return mainMenu();
      
          case "quit":
            return process.exit();
      
          default:
            throw new Error(`Invalid action: ${answers.choice}`);
        }
      });
  }
  const menuItems = [
    {
      type: "list",
      message: "\n\nMain Menu - Please choose an option:\n\n",
      name: "choice",
      choices: [
        { name: "View All Employees", value: "viewAllEmployees" },
        { name: "View All Roles", value: "viewAllRoles" },
        { name: "View All Departments", value: "viewAllDepartments" },
        { name: "Add Department", value: "addDepartment" },
        { name: "Add Role", value: "addRole" },
        { name: "Add Employee", value: "addEmployee" },
        { name: "Update Employee Role", value: "updateEmployeeRole" },
        { name: "Update Employee Manager", value: "updateEmployeeManager" },
        { name: "View Total Utilization By Department", value: "viewTotalUtilizationByDepartment" },
        { name: "Quit", value: "quit" },
      ],
    },
  ];

  welcome().then((message) => {
    console.log(message); 
    mainMenu()
})