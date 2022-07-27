// required packages
// import inquirer from "inquirer";
const inquirer = require( 'inquirer');
const mysql = require('mysql2')
const cTable = require('console.table');
require ('dotenv').config()


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

      });
}

// function showing all roles
function allRoles() {
    
    db.query("SELECT * FROM employee_role", (err, response) => {
        if (err) {
          throw err
          return;
        }
        
        console.table(response);

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

      });
}