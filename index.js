// Packages being imported
import fs from 'fs';
import inquirer from 'inquirer';
import colors from 'colors';

// Questions Array for Inquirer
const questions = [
    {
        type: "input",
        message: colors.brightMagenta("View all departments"),
        name: "departments",
    },
    {
        type: "input",
        message: colors.brightMagenta("View all roles"),
        name: "roles",
    },
    {
        type: "input",
        message: colors.brightMagenta("View all employees"),
        name: "employees",
    },
    {
        type: "input",
        message: colors.brightMagenta("Add a department"),
        name: "addDepartment",
    },
    {
        type: "list",
        message: colors.brightMagenta("Add a role"),
        choices: licenses,
        name: "addRole",
    },
    {
        type: "input",
        message: colors.brightMagenta("Add an employee"),
        name: "addEmployee",
    },
    {
        type: "input",
        message: colors.brightMagenta("Update an employee role"),
        name: "updateEmployee",
    },
];

inquirer
.prompt(
    questions,
)
.then(
    (response) => {
        answers = response;
        init();
    }
)

let answers = {};

console.log(answers);