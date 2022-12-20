/**Note didnt use bower install console.table ask about this in class */
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
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
      } else if (response.mainMenu == "View All Departments") {
        viewDeps();
      } else if (response.mainMenu == "Add Department") {
        addDep();
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
      db.query("INSERT INTO role (title, salary, department_id) VALUES (?,?)", [
        response.roleTitle,
        response.roleSalary,
      ]);
      console.log(response.roleTitle + "Has been added to thr Role table");
      mainMenu();
    });
}
/**test out # 2 */
function addDep() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDep",
        message: "What is the new department?",
      },
    ])
    .then((response) => {
      let newDep = response.newDep

      db.promise().query("INSERT INTO department VALUES (?)", newDep);
      console.log(response.newDep);
      mainMenu();
    }).catch((err) => console.log(err));
}


/**test out */
// function addDep() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "newDep",
//         message: "What is the new department?",
//       },
//     ])
//     .then((response) => {
//       db.promise().query("INSERT INTO department SET ?", [response.newDep]);
//       console.log(response.newDep);
//       mainMenu();
//     });
// }
/** original */
// function addDep() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "newDep",
//         message: "What is the name of the new Department?",
//         default: "Power Armor Station",
//       },
//     ])
//     .then((response) => {
//       // let nDepart = new Department(response.newDep);
//       // newDepo.push(nDepart);
//       console.log(response)
//       db.query("INSERT INTO department (name) VALUES (?)", response.newDep );
//       // // console.log(depResponse.newDep);
//       // console.log(
//       //   "\n " + response.newDep + " Has been added to the Department table \n "
//       // );
//       // mainMenu();
//     });
// }

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
  db.query("SELECT * FROM role", function (err, results) {
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
  // removeEmpLogic()
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
  // Object.values(JSON.parse(JSON.stringify(result)))
  // console.log(result);
  // console.log(result[i]);
}

// function removeEmpLogic() {
//   let myQuery = db.query(
//     "SELECT id, first_name, last_name FROM employee",
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         myQuery = result;
//         // console.log(myQuery);
//         console.log("\n");
//         console.table(myQuery);
//       }
//     }
//   );
// }

// not working // will want this to work
// function quit() {
//   db.query("exit;", function (err, results) {
//     console.table(results);
//   });
// }

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

/**other set up  */
// function removeEmp() {
//   db.query(
//     "SELECT first_name, last_name FROM employee",
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         then((result) => {
//           console.log("\n ");
//           for (i = 0; i < result.length; i++) {
//             console.log("loop ran");

//           }
//         },
//         inquirer
//         .prompt([
//           {
//             type: "list",
//             name: "removeEmp",
//             message: "Which Employee would you like to remove?",
//             choices: [empDb[i]],
//           },
//         ])
//         .then((response) => {

//           db.query("DELETE FROM employee WHERE first_name = (?)", [name2Delete]);
//           console.log("Deleted" + name2Delete + "From table");
//         })
//         );
//         // Object.values(JSON.parse(JSON.stringify(result)))
//         // console.log(result);
//         console.log(result[i]);
//       }
//     }
//   );

// }
