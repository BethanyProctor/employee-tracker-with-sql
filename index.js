require('dotenv').config();
const inquirer = require('inquirer');
const pool = require('./db/connection');

function userOptions() {
    inquirer.createPromptModule([
        {
            type: 'list',
            name: 'listItem',
            message: 'What would you like to do?',
            choices: [
                'Add Employee',
                'View All Employees',
                'Update Employee Role',
                'Add Role',
                'View All Roles',
                'Add Department',
                'View All Departments',
            ]
        }
    ])
    .then(userOptions => {
        switch(userOptions.initialRequest) {
            case 'Add Employee':
                addEmployee();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
        }
    })
};

//view all from the three databases
function viewAllEmployees() {
    const sql = 'SELECT * from employee';

    pool.query(sql, (error, result) => {
        if(error) {
            console.error(error)
        } else {
            console.table(result.rows)
        }
    })
};

function viewAllRoles() {
    const sql = 'SELECT * from role';

    pool.query(sql, (error, result) => {
        if(error) {
            console.error(error)
        } else {
            console.table(result.rows)
        }
    })
};

function viewAllDepartments() {
    const sql = 'SELECT * from department';

    pool.query(sql, (error, result) => {
        if(error) {
            console.error(error)
        } else {
            console.table(result.rows)
        }
    })
}





userOptions();