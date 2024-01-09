const db = require('../../../config/createConnection')
const cTable = require('console.table')
const Roles = require('./db_Roles')

class Employee {
    constructor(id, first_name, last_name, role_Id, manager_Id){
        this.id = id;
        this.first_Name = first_Name;
        this.last_Name = last_Name;
        this.role_Id = role_Id;
        this.manager_Id = manager_Id;
    }

    viewAll() {
        const sql = `SELECT 
        e.first_name AS 'First name',
        e.last_name AS 'Last name',
        r.title AS 'Role',
        CONCAT(g.first_name, '  ',g.last_name) AS Manager
        FROM employee e
        LEFT JOIN roles r ON r.id = e.role_id
        LEFT JOIN employee g ON g.id = e.manager_id`;
        return db
            .promise()
            .query(sql)
            .then(([table]) => {
                return table
            })
        }

        getAll() {
            const sql = `SELECT * FROM employee`
            return db.promise().query(sql).then(([table]) => {
                return table
            })
        } 
        getManagerID() {
            const sql = `SELECT * FROM employee WHERE first_name='${this.first_Name}' AND last_name='${this.last_Name}'`
            return db
            .promise()
            .query(sql)
            .then(([manager]) => {
                return manager;
            })
        }

        addEmployee() {
            const sql = `INSERT INTO employee(first_name,last_name,role_id,manager_id)
            VALUES ('${this.first_Name}', '${this.last_Name}', '${this.role_Id}', ${this.manager_Id})`
            return db 
            .promise()
            .query(sql)
        }
        
        updateEmployee(){
            const sql = `UPDATE employee
            SET role_id='${this.role_Id}'
            WHERE id='${this.id}';`
            return db.promise().query(sql)
        }
}

module.exports = Employee