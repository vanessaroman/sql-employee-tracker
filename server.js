// required packages
// import inquirer from "inquirer";
import inquirer from 'inquirer';
// const mysql = require('mysql2');
// const cTable = require('console.table');


// inquirer start function code

function start() {
    
  inquirer.prompt([
    {
      type: 'list',
      message: "Welcome to the Employee Tracker!",
      name: 'employeeTracker',
      choices: [ "View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add employee", "Update employee"]
    }
  ]).then(response =>{
  
    if (response.employeeTracker === "View all departments"){
      return allDepartments()
    }else if (response.employeeTracker === "View all roles"){
      return allRoles()
    }else if (response.employeeTracker === "View all employees") {
      return allEmployees()
    }else if (response.employeeTracker === "Add a department") {
        return addDepartment()
    }else if (response.employeeTracker === "Add a role") {
        return addRole()
    }else if (response.employeeTracker === "Add employee") {
        return addEmployee()
    }else if (response.employeeTracker === "Update employee") {
        return updateEmployee()
    }else {
      return finish()
    }
  
  })};

  start();