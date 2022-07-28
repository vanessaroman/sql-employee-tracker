// required packages
// import inquirer from "inquirer";
const inquirer = require( 'inquirer');
const mysql = require('mysql2')
const cTable = require('console.table');
require ('dotenv').config()

// connecting server to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: process.env.mysql,
        database: 'employeeTracker_db'
    },
    console.log(`Connected to the employeeTracker_db database.`)
);



// inquirer start function code
function start() {
    
    inquirer.prompt([
        {
            type: 'list',
            message: "Welcome to the Employee Tracker!",
            name: 'employeeTracker',
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add employee", "Update employee"]
        }
    ]).then(response => {
        
        if (response.employeeTracker === "View all departments") {
            return allDepartments()
        } else if (response.employeeTracker === "View all roles") {
            return allRoles()
        } else if (response.employeeTracker === "View all employees") {
            return allEmployees()
        } else if (response.employeeTracker === "Add a department") {
            return addDepartment()
        } else if (response.employeeTracker === "Add a role") {
            return addRole()
        } else if (response.employeeTracker === "Add employee") {
            return addEmployee()
        } else if (response.employeeTracker === "Update employee") {
            return updateEmployee()
        } else {
            return finish()
        }
        
    })
};

start();

// function showing all departments on selection
function allDepartments() {
    
    db.query("SELECT * FROM department", (err, response) => {
        if (err) {
          throw err
          return;
        }
        
        console.table(response);

        return start();

      });
}

// function showing all roles
function allRoles() {
    
    db.query("SELECT * FROM employee_role", (err, response) => {
        if (err) {
          throw err
          return;
        }
        
        console.log('Departments Guide: 1=Sales, 2=Engineering, 3=Finance, 4=Legal')
        console.table(response);
        return start();

      });
}

// function showing all employees
function allEmployees() {
    
    db.query("SELECT * FROM employee", (err, response) => {
        if (err) {
          throw err
          return;
        }
        
        console.table(response);
        return start();

      });
}


// function to add a department
function addDepartment() {

    inquirer.prompt([
        {
            type: 'input',
            message: "What's the department name?",
            name: 'departmentName',
        }

    ]).then((response) => {

        const newDepartment = [response.departmentName];

        db.query("INSERT INTO department (name) VALUES (?)", newDepartment, (err, result) => {
            if (err) {
              throw err
              return;
            }
            console.log ('New department added!')
            // console.table(result);
            return start();
    
          });

    })
    
}

// function to add a role
function addRole() {

    inquirer.prompt([
        {
            type: 'input',
            message: "What's the role title?",
            name: 'roleTitle',
        },
        {
            type: 'input',
            message: "What's the salary?",
            name: 'roleSalary',
        },
        {
            type: 'list',
            message: "What's the department id? (Hint: 1=Sales, 2=Engineering, 3=Finance, 4=Legal",
            name: 'roleDepartment',
            choices: ["1", "2", "3", "4"]
        },

    ]).then((response) => {

        const newRole = [response.roleTitle, response.roleSalary, response.roleDepartment];

        db.query("INSERT INTO employee_role (title, salary, department_id) VALUES (?, ?, ?)", newRole, (err, result) => {
            if (err) {
              throw err
              return;
            }
            console.log ('New role added!')
            // console.table(result);
            return start();
    
          });

    })
    
}

// function to add an employee
function addEmployee() {

    inquirer.prompt([
        {
            type: 'input',
            message: "What's the employee's id?",
            name: 'employeeID',
        },
        {
            type: 'input',
            message: "What's the employee's first name?",
            name: 'employeeFirst',
        },
        {
            type: 'input',
            message: "What's the employee last name?",
            name: 'employeeLast',
        },
        // {
        //     type: 'input',
        //     message: "Is this employee a manager? (if answer is YES insert manager id number. If answer is NO hit enter)",
        //     name: 'employeeManager',
        // },

    ]).then((response) => {

        const newEmployee = [response.employeeID, response.employeeFirst, response.employeeLast];

        db.query("INSERT INTO employee (id, first_name, last_name) VALUES (?, ?, ?)", newEmployee, (err, result) => {
            if (err) {
              throw err
              return;
            }
            console.log ('New employee added!')
            // console.table(result);
            return start();
    
          });

    })
    
}

// Function to update employee
// function updateEmployee() {

//     const getEmployees = () =>{
//         db.query("SELECT first_name FROM employee")
//     }

//     inquirer.prompt([
//         {
//             type: 'input',
//             message: "What's the employee's id?",
//             name: 'employeeID',
//         },
//         {
//             type: 'input',
//             message: "What's the employee's first name?",
//             name: 'employeeFirst',
//         },
//         {
//             type: 'input',
//             message: "What's the employee last name?",
//             name: 'employeeLast',
//         },
//         // {
//         //     type: 'input',
//         //     message: "Is this employee a manager? (if answer is YES insert manager id number. If answer is NO hit enter)",
//         //     name: 'employeeManager',
//         // },

//     ]).then((response) => {

//         const newEmployee = [response.employeeID, response.employeeFirst, response.employeeLast];

//         db.query("INSERT INTO employee (id, first_name, last_name) VALUES (?, ?, ?)", newEmployee, (err, result) => {
//             if (err) {
//               throw err
//               return;
//             }
//             console.log ('New employee added!')
//             // console.table(result);
//             return start();
    
//           });

//     })
    
// }