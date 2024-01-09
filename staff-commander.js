const inquirer = require("inquirer");
const figlet = require("figlet");
const Database = require("./helpers/connection.js");
const menu = require("./helpers/menu.js");


const db = new Database();

function welcome() {
    welcome_message = "Staff Commander";
    figlet(
        welcome_message,
    {
        font: "alligator",
    },
    function (err, data) {
        if (err) {
            return console.dir(err);
        } else {
            console.log(data);
            return new Database();
        }
    });
}


function choiceArray(results, name_key, value_key) {
    return results.map((row) => ({
      name: row[name_key],
      value: row[value_key]
    }));
  }
  
  async function mainMenu() {
    const answers = await inquirer.prompt(Database.menu);
    switch (answers.choice) {
      case "viewAllEmployees":
        const empResults = await db.viewAllEmployees();
        console.table(empResults);
        return mainMenu();
      
      case "viewAllRoles":
        const roleResults = await db.viewAllRoles();
        console.table(roleResults);
        return mainMenu();
  
      case "viewAllDepartments":
        const deptResults = await db.viewAllDepartments();
        console.table(deptResults);
        return mainMenu();
  
      case "addDepartment":
        return addDepartmentMenu();
      
      case "addRole":
        return addRoleMenu();
      
      case "addEmployee":
        return addEmployeeMenu();
  
      case "updateEmployeeRole":
        return updateEmployeeRole();
  
      case "updateEmployeeManager":
        return updateEmployeeManager();
  
      case "viewUtilBudgetByDept":
        const budgetResults = await db.viewUtilBudgetByDept();
        console.table(budgetResults);
        return mainMenu();
  
      case "quit":
        console.log("Connection closed.");
        db.end();
        process.exit();
    }
  }
  
  async function addDepartmentMenu() {
    const answers = await inquirer.prompt(Database.addDepartment);
    const results = await db.addDepartment(answers.department_name);
    console.table(results);
    return mainMenu();
  }
  
  async function addRoleMenu() {
    const rolesResults = await db.viewAllDepartments();
    const answers = await inquirer.prompt(Database.addRole(rolesResults));
    const results = await db.addRole(answers.role_name, answers.salary, answers.department);
    console.table(results);
    return mainMenu();
  }
  
  async function addEmployeeMenu() {
    const rolesResults = await db.viewAllRoles();
    const empsResults = await db.viewAllEmployees();
    const roleChoices = choiceArray(rolesResults, 'Job Title', 'Role ID');
    const managerChoices = choiceArray(empsResults, 'Name', 'ID');
  
    const answers = await inquirer.prompt(Database.addEmployee(roleChoices, managerChoices));
    const results = await db.addEmployee(
      answers.first_name,
      answers.last_name,
      answers.flip_name,
      answers.role,
      answers.manager
    );
    console.table(results);
    return mainMenu();
  }
  
  async function updateEmployeeRole() {
    const rolesResults = await db.viewAllRoles();
    const empsResults = await db.viewAllEmployees();
    const roleChoices = choiceArray(rolesResults, 'Job Title', 'Role ID');
    const empChoices = choiceArray(empsResults, 'Name', 'ID');
  
    const answers = await inquirer.prompt(Database.updateEmployeeRole(empChoices, roleChoices));
    const results = await db.updateEmployeeRole(answers.role, answers.employee);
    console.table(results);
    return mainMenu();
  }
  
  async function updateEmployeeManager() {
    const empsResults = await db.viewAllEmployees();
    const empChoices = choiceArray(empsResults, 'Name', 'ID');
    
    const answers = await inquirer.prompt(Database.updateEmployeeManager(empChoices));
    const results = await db.updateEmployeeManager(answers.manager, answers.employee);
    console.table(results);
    return mainMenu();
  }
  
  module.exports = welcome;