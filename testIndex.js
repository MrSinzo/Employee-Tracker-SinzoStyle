/**Note didnt use bower install console.table ask about this in class */
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department")
const Roles = require("./lib/Roles");
// const { QueryInterface } = require("sequelize");
// const { UPDATE } = require("sequelize/types/query-types");
/** line 7 and 8 Came out of no where */
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
mainMenu();
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Delete Employee",
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
      if (response.mainMenu == "View All Employees") {

        viewEmps();
        mainMenu();
      } else if (response.mainMenu == "Add Employee") {
        addEmpl();
      } else if (response.mainMenu == "Delete Employee") {
        removeEmp()
      } else if (response.mainMenu == "Update Employee Role") {
        updateEmp();
      } else if (response.mainMenu == "View all roles") {
        viewRoles();
        mainMenu();
      } else if (response.mainMenu == "Add Role") {
        addRole();
      } else if (response.mainMenu == "View All Departments") {
        viewDeps();
        mainMenu();
      } else if (response.mainMenu == "Add Department") {
        addDep()
      } else {
        quit(); /** I need help with this method */
      }
    });
}

function addEmpl() {
  inquirer
    .prompt([
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
        name: "empRoleId",
        message: "What is the new Employee's Role?",
        choices: [
          1,
          2,
          3,
          4,
        ],
      },
      {
        type: "list",
        name: "empManagerName",
        message: "Who is the new Employees Manager?",
        choices: [1, 2, 3, 4],
      },
    ])
    .then((response) => {
      let employee = new Employee(
        response.empId,
        response.empFirst_Name,
        response.empLast_Name,
        response.empRoleId,
        response.empManagerName
      );
      newEmp.push(employee); // pushes new Employee to newEmp array
      console.log(employee.empFirst_Name);
      console.log(employee.empLast_Name);
      console.log(employee.empRoleId);
      console.log(employee.empManagerName);
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [response.empFirst_Name, response.empLast_Name, response.empRoleId, response.empManagerName]);
      mainMenu();
  })
      
}

function addRole(){
  inquirer.prompt ([
    {
      type: "input",
      name: "roleTitle",
      message: "What is the name of the new Role?", 
      default: "Power Armorer"
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the Salary of the new Role?", 
      default: "26.99"
    }
  ])
  .then()
}

function addDep(){
  inquirer.prompt ([
    {
      type: "input",
      name: "newDep",
      message: "What is the name of the new Role?", 
      default: "Power Armor Station"
    }
  ])
  .then((response) => {
    let department = new Department(
      response.newDep
    );
    db.query(
      "INSERT INTO department (name) VALUES (?)", [response.newDep]);
    mainMenu();
  })
}

function viewEmps() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      return console.table(results);
    }
  });
}

function viewDeps() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      return console.table(results);
    }
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      return console.table(results);
    }
  });
}



function removeEmp(){
  inquirer.prompt([
    {
      type: "list",
      name: "newDep",
      message: "Which Employee would you like to remove?", 
      choices: [db.database.employee.empFirst_Name]
    }
  ])
  let deleteFrom = db.query("DELETE FROM employee WHERE first_name = (?)", [response.empFirst_Name] )
  console.log("Deleted" + response.empFirst_Name + "From table")
  return deleteFrom;
}



function quit() {
  db.query("exit;", function (err, results) {
    console.table(results);
  });
}



// function getRandomInt() {
//   let rngNum = Math.floor(Math.random() * 999);
//   console.log(rngNum);
//   return rngNum;
// }


// db.query(
//   "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (" +
//     `${employee.getEmplId()}` +
//     "," +
//     `${employee.getFirstName()}` +
//     "," +
//     `${employee.getLastName()}` +
//     "," +
//     `${employee.getRoleID()}` +
//     "," +
//     `${employee.getManagerName()}` +
//     ")",
//   function (err, results) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(results);
//     console.table(results);
//   }
// );