/**To do still;
 * update employee role function 
 * get video walkthrough 
 * */
/**Note didnt use bower install console.table ask about this in class */
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
// const Employee = require("./lib/Employee");
// const Department = require("./lib/Department");
// const Roles = require("./lib/Roles"); // not in use yet
// const { QueryInterface } = require("sequelize");
// const { UPDATE } = require("sequelize/types/query-types");
/** line 7 and 8 Came out of no where */

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Munc4k*n",
    database: "myStore_db",
  },
  console.log(`Connected to the myStore_db database.`)
);

// let newEmp = [];
// let newDepo = [];
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
          "View All Roles",
          "Add Role",
          "Remove a Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      if (response.mainMenu == "View All Employees") {
        viewEmps();
        // mainMenu();
      } else if (response.mainMenu == "Add Employee") {
        addEmpl();
      } else if (response.mainMenu == "Delete Employee") {
        // removeEmpLogic();
        let myQuery = db.query(
          "SELECT id, first_name, last_name FROM employee",
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              myQuery = result;
              // console.log(myQuery);
              console.log("\n");
              console.table(myQuery);
            }
          }
        );
        removeEmp();
      } else if (response.mainMenu == "Update Employee Role") {
        updateEmp(); // not sure how to do this one yet
      } else if (response.mainMenu == "View All Roles") {
        viewRoles();
      } else if (response.mainMenu == "Add Role") {
        addRole();
      } else if (response.mainMenu == "Remove a Role") {
        db.query("SELECT * FROM roles", function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log("\nRole table successfully accessed\n");
            console.table(results);
          }
        });
        removeRoles();
      } else if (response.mainMenu == "View All Departments") {
        viewDeps();
      } else if (response.mainMenu == "Add Department") {
        addDeps();
      } else {
        // quit(); /** I need help with this method */
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
        choices: [1, 2, 3, 4],
      },
      {
        type: "list",
        name: "empManagerName",
        message: "Who is the new Employees Manager?",
        choices: [1, 2, 3, 4],
      },
    ])
    .then((response) => {
      //dont need any of this, but keep just in case
      // let employee = new Employee(
      //   response.empId,
      //   response.empFirst_Name,
      //   response.empLast_Name,
      //   response.empRoleId,
      //   response.empManagerName
      // );
      // newEmp.push(employee); // pushes new Employee to newEmp array
      // console.log(employee.empFirst_Name);
      // console.log(employee.empLast_Name);
      // console.log(employee.empRoleId);
      // console.log(employee.empManagerName);
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          response.empFirst_Name,
          response.empLast_Name,
          response.empRoleId,
          response.empManagerName,
        ]
      );
      console.log(
        "Added " +
          response.empFirst_Name +
          " " +
          response.empLast_Name +
          " to Table"
      );
      mainMenu();
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the name of the new Role?",
        default: "Power Armorer",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the Salary of the new Role?",
        default: "26.99",
      },
    ])
    .then((response) => {
      db.query("INSERT INTO roles (title, salary) VALUES (?,?)", [
        response.roleTitle,
        response.roleSalary,
      ]);
      console.log(response.roleTitle + "Has been added to the Roles table");
      mainMenu();
    });
}

function addDeps() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDep",
        message: "What is the new department?",
      },
    ])
    .then((response) => {
      let newDep = response.newDep;

      db.promise().query(
        "INSERT INTO department (department_name) VALUES (?)",
        newDep
      );
      console.log("line 184");
      console.log(response.newDep);
      mainMenu();
    })
    .catch((err) => console.log(err));
}

function viewEmps() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("\nEmployee table successfully accessed\n");
      console.table(results);
      mainMenu();
    }
  });
}

function viewDeps() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("\nDepartment table successfully accessed\n");
      console.table(results);
      mainMenu();
    }
  });
}

function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("\nRole table successfully accessed\n");
      console.table(results);
      mainMenu();
    }
  });
}

function removeEmp() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "removeEmp",
        message: "Which Employee would you like to remove(input an ID #)?",
      },
    ])
    .then((response) => {
      let name2Delete = response.removeEmp;
      db.query("DELETE FROM employee WHERE id = (?)", [response.removeEmp]);
      console.log(" \n Deleted " + name2Delete + " From table \n ");
      mainMenu();
    });
}

function removeRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "removeRoles",
        message: "Which Role would you like to remove(input an ID #)?",
      },
    ])
    .then((response) => {
      let role2Delete = response.removeRoles;
      db.query("DELETE FROM roles WHERE id = (?)", [response.removeRoles]);
      console.log(" \n Deleted " + role2Delete + " From table \n ");
      mainMenu();
    });
}

// not working // will want this to work
// function quit() {
//   db.query("exit;", function (err, results) {
//     console.table(results);
//   });
// }
