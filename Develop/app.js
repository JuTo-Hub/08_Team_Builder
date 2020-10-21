const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const EmpType = [
    {
   type : "Intern",
    },
    {
    type : "Engineer",
    },
    {
    type : "Manager",
    },
];
const startQ =[
    {
        type: "list",
        message: "Please choose your employee type",
        name: "employeeType",
        choices: EmpType.map((o) => o.type)
    },
]
const employeeQs =[
    {
      type: "input",
      message: "Please insert your first and last name.",
      name: "name"
    },
    {
      type: "input",
      message: "Please insert your ID number.",
      name: "id"
  },
  {
      type: "input",
      message: "Please insert your email.",
      name: "email"
  },
];
const internQs =[
    ...employeeQs,
    {
        type: "input",
        message: "Please insert your school name",
        name: "school",
    },
]
const engineerQs =[
    ...employeeQs,
    {
        type: "input",
        message: "Please insert your GitHub username",
        name: "github",
    },
]
const managerQs =[
    ...employeeQs,
    {
        type: "input",
        message: "Please insert your office number",
        name: "officeNumber",
    },
]
const askAgain = [
    {
        type: 'confirm',
        message: 'Would you like to add another employee?',
        name: "askAgain",
        default: true,
      },
]
  function ask(){
      inquirer.prompt(startQ).then((answers) => {
          if(answers.employeeType==="Intern"){
              askIntern();
          } if(answers.employeeType==="Engineer"){
              askEngineer();
          } if(answers.employeeType==="Manager"){
              askManager()
          }
      })
    }
    function askIntern(){
        inquirer.prompt(internQs).then((answers =>{
            employees.push(new Intern(answers.name, answers.id, answers.email, answers.school));
            askAddAnother();
        }))
    }
    function askEngineer(){
        inquirer.prompt(engineerQs).then((answers =>{
            employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
            askAddAnother();
        }))
    }
    function askManager(){
        inquirer.prompt(managerQs).then((answers =>{
            employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber));
            askAddAnother();
        }))
    }
    function askAddAnother(){
        inquirer.prompt(askAgain).then((answers) =>{
        if(answers.askAgain){
            ask();
        } else {
            console.log("Employee Data Entry Complete, Please Check The Employee Card!")
            console.log(employees);
            renderEmployees()
        }})
    }
    function renderEmployees(){
        if (!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFile(outputPath, render(employees), null, (err)=> {console.log(err)});
    }
ask();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
