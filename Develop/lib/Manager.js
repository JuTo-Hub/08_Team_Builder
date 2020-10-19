// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
'use strict';
const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, id, email, github){
        super(name, id, email)
    }
    
    getRole(){
        return "Manager";
    }

}
module.exports = Manager;