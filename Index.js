/**To do still;
 * fill out readme
 * get video walkthrough
 * */
/**Note didnt use bower install console.table ask about this in class*/
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
// const Department = require("./lib/Department");
// const Employee = require("./lib/Employee");
// const Department = require("./lib/Department");
// const Roles = require("./lib/Roles"); // not in use yet
// const { QueryInterface } = require("sequelize");
// const { UPDATE } = require("sequelize/types/query-types");
/** const { QueryInterface } and const { UPDATE } Came out of no where */

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
          "View Managers",
          "View All Employees",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "Remove a Role",
          "View All Departments",
          "Add Department",
          "Remove Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      if (response.mainMenu == "View Managers") {
        viewMangers();
      } else if (response.mainMenu == "View All Employees") {
        viewEmps();
      } else if (response.mainMenu == "Add Employee") {
        db.query("SELECT id, title FROM roles", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("\n \nRoles List \n"), console.table(result);
          }
        });
        db.query(
          "SELECT * FROM employee where manager_id != 0",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Manager List \n ");
              console.table(result);
              console.log("Type A Name....");
            }
          }
        );
        addEmpl();
      } else if (response.mainMenu == "Remove Employee") {
        let myQuery = db.query(
          "SELECT id, first_name, last_name FROM employee",
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              myQuery = result;
              console.log("\n");
              console.table(myQuery);
            }
          }
        );
        removeEmp();
      } else if (response.mainMenu == "Update Employee Role") {
        db.query("SELECT * FROM employee", function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log("\n\nEmployee List\n");
            console.table(results);
          }
        });
        db.query("SELECT * FROM roles", function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log("\nRoles List\n");
            console.table(results);
          }
        });
        updateEmp();
      } else if (response.mainMenu == "View All Roles") {
        viewRoles();
      } else if (response.mainMenu == "Add Role") {
        db.query("SELECT * FROM department", function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log("\nDepartment table successfully accessed\n");
            console.table(results);
          }
        });
        addRole();
      } else if (response.mainMenu == "Remove a Role") {
        db.query("SELECT * FROM roles", function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log("\nRoles List : \n");
            console.table(results);
          }
        });
        removeRoles();
      } else if (response.mainMenu == "View All Departments") {
        viewDeps();
      } else if (response.mainMenu == "Add Department") {
        addDeps();
      } else if (response.mainMenu == "Remove Department") {
        db.query("SELECT * FROM department", function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log("\n\nDepartment List : \n");
            console.table(results);
          }
        });
        removeDep();
      } else {
        console.log("\n Please Hold Ctrl+C to quit \n");
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
        type: "input",
        name: "empRoleId",
        message:
          "What is the new Employee's Role? \n (choose respective ID # correlating to the Role List)",
      },
      {
        type: "input",
        name: "empManagersId",
        message:
          "Does This new Employee have a Manager? \n (choose respective ID # correlating to the Manager List to select a Manager, or type null for No Manager)",
      },
    ])
    .then((response) => {
      if (response.empManagersId == "null") {
        response.empManagersId = null;
      }
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          response.empFirst_Name,
          response.empLast_Name,
          response.empRoleId,
          response.empManagersId,
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

function updateEmp() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "empChoice",
        message:
          "Which Employee would you like to assign a new Role to? \n (choose respective ID # correlating to the Employee List)",
      },
      {
        type: "input",
        name: "empRoleUpdate",
        message:
          "Which Role would you like to assign the Employee to? \n (choose respective ID # correlating to the Roles List)",
      },
    ])
    .then((response) => {
      db.query("UPDATE employee SET role_id = ? WHERE id = ? ", [
        response.empRoleUpdate,
        response.empChoice,
      ]);
      console.log("\n Updated the Employee role!!");
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
        default: "Power Armor Mechanic",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the Salary of the new Role?",
        default: "26.99",
      },
      {
        type: "input",
        name: "roleDep",
        message:
          "What Department does this role belong too? \n (choose respective ID # correlating to the Department)",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
        [response.roleTitle, response.roleSalary, response.roleDep]
      );
      console.log(response.roleTitle + " Has been added to the Roles table");
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
      console.log(
        "\n" + response.newDep + " Has been added to the Department table"
      );
      mainMenu();
    })
    .catch((err) => console.log(err));
}

function viewMangers() {
  db.query(
    "SELECT first_name, last_name, manager_id FROM employee WHERE manager_id != 'null'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("\nHere is a list of the Managers\n");
        console.table(result);
        mainMenu();
      }
    }
  );
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

function removeDep() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "destroyDep",
        message:
          "Which Department would you like to delete? \n (choose respective ID # correlating to the Department)",
      },
    ])
    .then((response) => {
      let dep2Delete = response.destroyDep;
      db.query("DELETE FROM department WHERE id = (?)", [response.destroyDep]);
      console.log(" \n Deleted " + dep2Delete + " From table \n ");
      mainMenu();
    });
}

// /**Type 1 not working */
// function listDepart(){
//   db.query("SELECT department_name FROM department", async (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.table(result)
//       result.forEach();
//     }
//   }).then((response) => {
//     const depoList = new Department(
//       response.result[i]
//     );
//     newDepo.push(depoList)
//     for(let i = 0 ; i < newDepo.length; i++) {
//       let seperator = ",";
//       newDepo[i] += seperator
//       console.log(newDepo[i])
//     }
//   })
// }

// UPDATE employee SET role_id = 4 WHERE id =4;
