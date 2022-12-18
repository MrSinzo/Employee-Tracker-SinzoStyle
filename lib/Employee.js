class Employee {
  constructor(empId ,empFirst_Name, empLast_Name, empRoleId, manager_id) {
    this.empId = empId;
    this.empFirst_Name = empFirst_Name;
    this.empLast_Name = empLast_Name;
    this.empRoleId = empRoleId;
    this.manager_id = manager_id
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
  getManagerId() {
    return this.manager_id;
  }
}
module.exports = Employee;