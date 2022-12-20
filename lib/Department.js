class Department {
  constructor(newDep) {
    this.newDep = newDep;
  }
  getNewDep(){
    return this.newDep;
  }
}

module.exports = Department;

/**maybe instead of needing a class file i can just - let departmentList = [] in index.js?*/