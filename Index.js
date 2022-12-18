/**Note didnt use bower install console.table ask about this in class */
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const Employee = require("./lib/Employee");
const Roles = require("./lib/Roles");
// const SchemaFuncs = require('./db/SchemaFuncs')

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Munc4k*n",
    database: "myStore_db",
  },
  console.log(`Connected to the myStore_db database.`)
);

let newEmp = [];
start();
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View all roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      if (response.start == "View All Employees") {
        viewEmps();
        start();
      } else if (response.start == "Add Employee") {
        addEmpl();
      } else if (response.start == "Update Employee Role") {
        // sql read and add?
      } else if (response.start == "View all roles") {
        viewRoles()
        start();
      } else if (response.start == "Add Role") {
        //sql add function to table?
      } else if (response.start == "View All Departments") {
        viewDeps()
        start();
      } else if (response.start == "Add Department") {
        //sql add function to table?
      } else {
        db.query("EXIT", function (err, results) {
          console.table(results);
        });
      }
    });
}

function addEmpl() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "empId",
        message: "What is the new Employee's ID number?",
      },
      {
        type: "input",
        name: "empFirst_Name",
        message: "What is the new Employee's First name?",
        default: "Jimmy",
      },

      {
        type: "input",
        name: "empLast_Name",
        message: "What is the new Employee's Last name?",
        default: "Johns",
      },
      {
        type: "list",
        name: "empRole",
        message: "What is the new Employee's Role?",
        choices: [
          "Food Vendor",
          "Ammo Vendor",
          "Armor Vendor",
          "Weapons Vendor",
        ],
      },
    ])
    .then((response) => {
      let employee = new Employee(
        response.empId,
        response.empFirst_Name,
        response.empLast_Name,
        response.empRoleId
      );
      console.log(employee.empId);
      console.log(employee.empFirst_Name);
      console.log(employee.empLast_Name);
        db.query(
          "INSERT INTO employee (first_Name, last_Name) VALUES (" +
            `${employee.getFirstName()}` +
            "),(" +
            `${employee.getLastName()}` +
            ")",
          function (err, results) {
            if (err) {
              console.log(err)
            }
            console.log(results);
            console.table(results);
          }
        );
    });
}

function viewEmps() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}

function viewDeps() {
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}
// function getRandomInt() {
//   let rngNum = Math.floor(Math.random() * 999);
//   console.log(rngNum);
//   return rngNum;
// }
