require('dotenv').config();
const inquirer = require('inquirer');
const pool = require('./db/connection');

const userOptions = () => {
    inquirer.createPromptModule([
        {
            type: 'list',
            name: 'listItem',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'Add Role',
                'View All Departments',
                'Add Department',
                'View All Employees',
                'Quit'
            ]
        }
    ])
}