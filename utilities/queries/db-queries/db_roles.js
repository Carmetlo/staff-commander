const db = require('../../../config/createConnection');
const cTable = require('console.table');

class Roles {
    constructor(id, title, salary, department_id) { 
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    viewAll() {
        const sql = `SELECT
        r.title,
        r.salary,
        d.dep_name AS Department
        FROM roles r
        LEFT JOIN department d ON d.id = r.department_id`;
        return db
        .promise()
        .query(sql)
        .then(([table])=> {
            return table;
        })
    }
    getAll(){
        const sql = `SELECT * FROM roles`
        return db.promise().query(sql).then(([table])=> {
            return table
        })
    }

    addRole(){
        const sql = `INSERT INTO roles(title, salary, department_id)
        VALUES ('${this.title}', '${this.salary}', '${this.department_id}')`
        return db
        .promise()
        .query(sql);
    }

    getRoleID(){
        const sql = `SELECT * FROM roles WHERE roles.title ='${this.title}'`
        return db
        .promise()
        .query(sql)
        .then(([role])=>{
            return role;
        })
    }
}

module.exports = Roles;