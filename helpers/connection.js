class Menu {
    constructor() {
      this.mainMenu = [
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
  
      this.addDepartment = [
        {
          type: "input",
          message: "Enter the name of the new department:",
          name: "dep_name",
        },
      ];
    }
  }
  
  module.exports = Menu;
  
