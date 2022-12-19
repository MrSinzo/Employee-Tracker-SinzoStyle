class Employee {
  constructor(empId ,empFirst_Name, empLast_Name, empRoleId, empManagerName) {
    this.empId = empId;
    this.empFirst_Name = empFirst_Name;
    this.empLast_Name = empLast_Name;
    this.empRoleId = empRoleId;
    this.empManagerName = empManagerName
  }
  getEmplId(){
    return this.empId;
  }
  getFirstName() {
    return this.empFirst_Name;
  }
  getLastName() {
    return this.empLast_Name;
  }
  getRoleID() {
    return this.empRoleId;
  }
  getManagerName() {
    return this.empManagerName;
  }
}
module.exports = Employee;