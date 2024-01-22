const inquirer = require("inquirer");
const figlet = require("figlet");
const db = require("./db/database.js");
// const { addDepartment } = require("./helpers/menu.js");
function choiceArray(results, name_key, value_key) {
  return results.map((row) => ({
    name: row[name_key],
    value: row[value_key],
  }));
}
function welcome() {
  let welcome_message = "Staff Commander";
  return figlet.text(
    welcome_message,
    {
      font: "Big",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    }
  );
}

async function handleDeleteAction() {
  const deleteAnswers = await inquirer.prompt([
    {
      type: "list",
      message: "Choose the item to delete:",
      name: "deleteChoice",
      choices: [
        { name: "Delete Department", value: "deleteDepartment" },
        { name: "Delete Role", value: "deleteRole" },
        { name: "Delete Employee", value: "deleteEmployee" },
        { name: "Cancel", value: "cancel" },
      ],
    },
  ]);
  try {
      switch (deleteAnswers.deleteChoice) {
        case "deleteDepartment":
          const [deptResults2] = await db.viewAllDepartments();
          const deptChoices2 = choiceArray(deptResults2, "name", "id");
          const deptAnswer = await inquirer.prompt([
            {
              type: "list",
              message: "Choose the department to delete:",
              name: "department_id",
              choices: deptChoices2,
            },
          ]);
          await db.deleteDepartment(deptAnswer.department_id);
          console.log("Department deleted");
          mainMenu();
          break;
  
        case "deleteRole":
          const [roleResults3] = await db.viewAllRoles();
          const roleDeleteChoices = choiceArray(roleResults3, "title", "id");
          const roleDeleteAnswer = await inquirer.prompt([
            {
              type: "list",
              message: "Choose the role to delete:",
              name: "role_id",
              choices: roleDeleteChoices,
            },
          ]);
          await db.deleteRole(roleDeleteAnswer.role_id);
          console.log("Role deleted");
          mainMenu();
          break;
  
        case "deleteEmployee":
          const [empResults3] = await db.viewAllEmployees();
          const empDeleteChoices = choiceArray(empResults3, "last_name", "id");
          const deleteEmpAnswer = await inquirer.prompt([
            {
              type: "list",
              message: "Choose the employee to delete:",
              name: "employee_id",
              choices: empDeleteChoices,
            },
          ]);
          await db.deleteEmployee(deleteEmpAnswer.employee_id);
          console.log("Employee deleted");
          mainMenu();
          break;
  
        case "cancel":
          mainMenu();
          break;
  
        default:
          throw new Error(`Invalid action: ${answers}}`);
      }
    } catch (error) {
      console.error("Error during delete:", error.message);
    } finally {
      mainMenu();
    }
  }

function mainMenu() {
  inquirer.prompt(menuItems).then(async (answers) => {
    switch (answers.choice) {
      case "viewAllEmployees":
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
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the name of the new department:",
              name: "dep_name",
            },
          ])
          .then(async (answers) => {
            await db.addDepartment(answers.dep_name);
            console.log(`Added ${answers.dep_name} to the database.`);
            mainMenu();
          });
        break;

      case "addRole":
        const [deptResults] = await db.viewAllDepartments();
        const deptChoices = choiceArray(deptResults, "name", "id");
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the name of the new role:",
              name: "role_name",
            },
            {
              type: "input",
              message: "Enter the salary for this role:",
              name: "salary",
            },
            {
              type: "list",
              message: "Choose the department for this role:",
              name: "department_id",
              choices: deptChoices,
            },
          ])
          .then(async (answers) => {
            await db.addRole(
              answers.role_name,
              answers.salary,
              answers.department_id
            );
            console.log(`Added ${answers.role_name} to the database.`);
            mainMenu();
          });
        break;

      case "addEmployee":
        const [roleResults] = await db.viewAllRoles();
        const roleChoices = choiceArray(roleResults, "title", "id");
        const [employeeResults] = await db.viewAllEmployees();
        const managerChoices = choiceArray(employeeResults, "last_name", "id");
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter their first name:",
              name: "first_name",
            },
            {
              type: "input",
              message: "Enter their last name",
              name: "last_name",
            },
            {
              type: "list",
              message: "Choose the department for this role:",
              name: "role_id",
              choices: roleChoices,
            },
            {
              type: "list",
              message: "Choose the manager for this employee:",
              name: "manager_id",
              choices: managerChoices,
            },
          ])
          .then(async (answers) => {
            await db.addEmployee(
              answers.first_name,
              answers.last_name,
              answers.role_id,
              answers.manager_id
            );
            console.log(`Added ${answers.first_name} to the database.`);
            mainMenu();
          });
        break;

      case "updateEmployeeRole":
        const [empResults] = await db.viewAllEmployees();
        const empChoices = choiceArray(empResults, "last_name", "id");
        const [roleResults2] = await db.viewAllRoles();
        const roleChoices2 = choiceArray(roleResults2, "title", "id");
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose the employee to update:",
              name: "employee_id",
              choices: empChoices,
            },
            {
              type: "list",
              message: "Choose the new role for this employee:",
              name: "role_id",
              choices: roleChoices2,
            },
          ])
          .then(async (answers) => {
            await db.updateEmployeeRole(answers.role_id, answers.employee_id);
            console.log(`Updated employee role.`);
            mainMenu();
          });
        break;

      case "updateEmployeeManager":
        const [empResults2] = await db.viewAllEmployees();
        const empChoices2 = choiceArray(empResults2, "last_name", "id");
        const [managerResults] = await db.viewAllEmployees();
        const managerChoices2 = choiceArray(managerResults, "last_name", "id");
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose the employee to update:",
              name: "employee_id",
              choices: empChoices2,
            },
            {
              type: "list",
              message: "Choose the new manager for this employee:",
              name: "manager_id",
              choices: managerChoices2,
            },
          ])
          .then(async (answers) => {
            await db.updateEmployeeManager(
              answers.manager_id,
              answers.employee_id
            );
            console.log(`Updated employee manager.`);
            mainMenu();
          });
        break;
        return mainMenu();

      case "viewTotalUtilizationByDepartment":
        db.viewUtilBudgetByDept().then(([results]) => {
          console.table(results);
          mainMenu();
        });
        break;

        case "delete":
          handleDeleteAction();
          break; 
           

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
      {
        name: "View Total Utilization By Department",
        value: "viewTotalUtilizationByDepartment",
      },
      { name: "Delete", value: "delete" },
      { name: "Quit", value: "quit" },
    ],
  },
];

welcome().then((message) => {
  console.log(message);
  mainMenu();
});
