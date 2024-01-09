const inquirer = require('inquirer');
const main = require('../mainMenu')
const Employee  = require('./db_actions/db_Employee')
const Roles = require('./db_actions/db_Roles')



const addEmployee = () => {
    const roles = new Roles()
    const managers = Employee(

        roles.getAll().then((rolesTables) => {
            managers.getAll().then((employeeTable) => {
                let employeeArray = employeeTable.map(employee => {
                    return `${employee.first_name} ${employee.last_name}`
                })
                employeeArray.push('None');
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the employees first name',
                        name: 'first_name',
                    },
                    {
                        type: 'input',
                        message: 'what is the employees last name',
                        name: 'last_name',
                    },
                    {
                        type: 'list',
                        message: 'what is the employees role',
                        choices: rolesTables.map(role => {
                            return `${role.title}`
                        }),
                        name: 'role',
                    },
                    {
                        type: 'list',
                        message: 'Who is the employees manager?',
                        choices: employeeArray,
                        name: 'manager',
                    },
                ])
                .then(({first_name, last_name, role, manager})=> {
                    const findRole = new Roles(null, role, null, null)
                    if(manager == 'none'){
                        findRole.getRoleID()
                        .then(([r])=> {
                            let role_id = r.id

                            const newEmployee = new Employee(null, first_name, last_name, role_id, null)
                            newEmployee.addEmployee()
                            .then(()=> {
                                console.log(`Employee has been added`)
                                main.mainMenu()
                            })
                        })
                    }
                    else {
                        const man = manager.split(' ')
                        const findManager = new Employee(null, man[0], man[1], null, null)
                        findManager.getManagerID()
                        .then(([m])=> {
                            findRole.getRoleID()
                            .then(([r])=> {
                                let role_id = r.id
                                const newEmployee = new Employee(null, first_name, last_name, role_id, m.id)
                                newEmployee.addEmployee()
                                .then(()=> {
                                    console.log(`
                                    Added employee to database successfully`)
                                    main.mainMenu
                                })
                            })
                        })
                    }
                })
            })
        })
    )
}
const updateEmployee = ()=> {
    const employee = new Employee()
    const roles = new Roles()
    viewAllEmployees.getAll().then((empTable)=> {
        roles.getAll().then((rolesTable) => {
             let roleArray = rolesTable.map((r)=> {
                return `${r.title}`
             });
             let empArray = empTable.map((e)=>{
                return `${e.first_name} ${e.last_name}`
             })
             inquirer.prompt([
                {
                    type: 'list',
                    message: 'Choose an employee to update.',
                    choices: empArray,
                    name: 'employee',
                },
                {
                    type: 'list',
                    message: 'Choose the employees new role.',
                    choices: roleArray,
                    name: 'role',
                },
             ])
             .then(({employee, role})=> {
                const man = employee.split(' ')
                const findEmp = new Employee(null, man[0], man[1], null, null)
                findEmp.getManagerID()
                .then(([empRow])=> {
                    const findRole = new Roles(null, role, null, null)
                    findRole.getRoleID()
                    .then(([roleRow])=> {
                        const updateEmp = new Employee(empRow.id, null, null, roleRow.id, null)
                        updateEmp.updateEmployee()
                        .then(() => {
                            console.log(`Successfully updated Employees role`)
                            main.mainMenu()
                        })
                    })
                })
             })
        })
    })
}
module.exports = { viewAllEmployees, addEmployee, updateEmployee }