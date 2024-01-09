const inquirer = require('inquirer')
const Roles = require('./db_actions/db_Department')
const Department = require('./db_actions/db_Department')
const main = require('../mainMenu')

const viewAllRoles = () => {
    const roleMenu = new Roles()
    roleMenu
    .viewAll()
    .then((roleTable) => {
        console.log(``)
        console.table(roleTable)
        console.log('')
    })
    .then(()=> {
        main.mainMenu()
    })
}

const addRole = () => {
    const dep = new Department()

    dep.getAll().then((depTable)=> {
        let depArray = depTable.map((d) => {
            return `${d.dep_name}`
        })
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'role',
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'What department does the role belong to?',
                choices: depArray,
                name: 'department',
            },
        ])
        .then(({role, salary, department})=> {
            const getDep = new Department(null, department)
            getDep.getDepartmentId()
            .then(([d])=> {

                const addRole = new Roles(null, role, salary, d.id)
                addRole.addRole()
                .then(()=> {
                    console.log(`
                    Successfully added ${role} to the database`)
                    main.mainMenu
                })
            })
        })
    })
}
module.exports = {viewAllRoles, addRole}