const inquirer = require('inquirer')
const main = require('../mainMenu')
const db = require('/config/connection')
const mainMenu = require('../mainMenu')

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the department.',
            name: 'department',
        },
    ])
    .then(({department}) => {
        const addDep = new Department(null, department)
        addDepartment.addDepartment()
        .then(() => {
            console.log('Department added.')
            main.mainMenu()
        })
    })
    }

    module.exports = {viewAllDepartments, addDepartment}