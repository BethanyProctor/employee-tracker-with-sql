require('dotenv').config();
const inquirer = require('inquirer');
const pool = require('./db/connection.sql');

function userOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'listItem',
            message: 'What would you like to do?',
            choices: [
                'Add Employee',
                'View All Employees',
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
};

//add to any of the three databases
async function addEmployee() {
    const { rows: role } = await pool.query('SELECT * FROM role')
    const { rows: manager } = await pool.query('SELECT * FROM employee')
    const roleOptions = role.map((role) => ({
        name: role.name, 
        value: role.id
    }))
    const managerOptions = manager.map((manager) => ({ 
        value: manager.id
    }))

    inquirer.prompt([
      {
          type: 'input',
          message: 'Please enter the first name of the employee.',
          name: 'firstName'
      },
      {
        type: 'input',
        message: 'Please enter the last name of the employee.',
        name: 'lastName'
      },
      {
        type: 'list',
        message: 'Please select the role of the employee:',
        choices: roleOptions,
        name: 'role'
      },
      {
        type: 'list',
        message: 'Please select the manager of the employee:',
        choices: managerOptions,
        name: 'manager'
      }
    ]) 
    .then((answer) => {
        if (!answer.firstName || !answer.lastName || !answer.role || !answer.manager){
            console.error('Please fill out every field.')
            return;
        } 
        const sql = `INSERT INTO Employee(first_name, last_name, role_id, manager_id) 
                       VALUES($1, $2, $3, $4);`

        pool.query(sql, [answer.firstName, answer.lastName, answer.role, answer.manager], (error, result) => {
            if(error){
                console.error(error)
            } else {
                console.log(result)
            }
        })
    })
};

async function addRole() {
    const { rows } = await pool.query('SELECT * FROM department;')
    const departmentOptions = rows.map(({ id, name }) => ({
        name: name,
        value: id
    })) 
    inquirer
    .prompt([
      {
          type: 'input',
          message: 'Please enter the name of the new role.',
          name: 'name'
      },
      {
        type: 'input',
        message: 'Please enter the salary of the new role.',
        name: 'salary'
      },
      {
        type: 'list',
        message: 'Please enter which department will this role fall under.',
        choices: departmentOptions,
        name: 'department'
      }
    ])
    .then((answer) => {
        console.log(answer);
        if (!answer.name || !answer.salary || !answer.department) {
            console.error("Please fill out every field.");
            return;
        }
        const query = 'INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3)'
        pool.query(query, [answer.name, answer.salary, answer.department], (error, result) => {
            if(error){
                console.error(error)
            } else {
                console.log(result)
            }
        })
    })
};

function addDepartment() {
   inquirer.prompt([
    {
        type: 'input',
        message: 'Please enter the name of the new department.',
        name: 'newDepartnemtName'
    }
   ])
   .then((answer) => {
    if (!answer.newDepartmentName) {
        console.error('Please enter the department name.');
        return;
    }
    const sql = 'INSERT INTO department (name) VALUES($1)'
    {
        pool.query(sql, (error, result) => {
            if(error){
                console.error(error)
            } else {
                console.log(result)
            }
        })
    }
   }) 
};

userOptions();