// class Menu {
//     constructor() {
//       this.mainMenu = [
//         {
//           type: "list",
//           message: "\n\nMain Menu - Please choose an option:\n\n",
//           name: "choice",
//           choices: [
//             { name: "View All Employees", value: "viewAllEmployees" },
//             { name: "View All Roles", value: "viewAllRoles" },
//             { name: "View All Departments", value: "viewAllDepartments" },
//             { name: "Add Department", value: "addDepartment" },
//             { name: "Add Role", value: "addRole" },
//             { name: "Add Employee", value: "addEmployee" },
//             { name: "Update Employee Role", value: "updateEmployeeRole" },
//             { name: "Update Employee Manager", value: "updateEmployeeManager" },
//             { name: "View Total Utilization By Department", value: "viewTotalUtilizationByDepartment" },
//             { name: "Quit", value: "quit" },
//           ],
//         },
//       ];
  
//       this.addDepartment = [
//         {
//           type: "input",
//           message: "Enter the name of the new department:",
//           name: "dep_name",
//         },
//       ];
//     }
//   }
  
  // module.exports = Menu;
const connection = require("../config/createConnection"); 
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  viewAllDepartments() {
    return this.connection.promise().query(
      "SELECT * FROM department"
    );
  }
  viewAllRoles() {
    return this.connection.promise().query(
      "SELECT * FROM role"
    );
  }
  viewAllEmployees() {
    return this.connection.promise().query(
      "SELECT * FROM employee"
    );
  }
  addDepartment(departmentName) {
    return this.connection.promise().query(
      "INSERT INTO department (name) VALUES (?)",
      [departmentName]
    );
  }

  addRole(roleName, salary, departmentId) {
    return this.connection.promise().query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [roleName, salary, departmentId]
    );
  }

  addEmployee(firstName, lastName, roleId, managerId) {
    return this.connection.promise().query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId]
    );
  }

  updateEmployeeRole(roleId, employeeId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  updateEmployeeManager(managerId, employeeId) {
    return this.connection.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  viewUtilBudgetByDept() {
    return this.connection.promise().query(
      "SELECT department.name AS department, SUM(role.salary) AS total_budget FROM role INNER JOIN department ON role.department_id = department.id GROUP BY department.id"
    );
  }
}


module.exports = new DB(connection);