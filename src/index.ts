// Packages being imported
// import express from 'express';
import inquirer from 'inquirer';
import colors from 'colors';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

// Express Constants
// const PORT = process.env.PORT || 3001;
// const app = express();

// Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Questions Array for Inquirer
const mainScreen = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            colors.magenta('View all departments'),
            colors.magenta('View all roles'),
            colors.magenta('View all employees'),
            colors.green('Add a department'),
            colors.green('Add a role'),
            colors.green('Add an employee'),
            colors.blue('Update an employee role'),
            colors.red('Exit'),
          ],
        },
      ])
      .then((answers: any) => {
        if (answers.action === 'View all departments') {
          console.log(`
          ${pool.query(`SELECT * FROM departments`, (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.rows);
            }
          })}`);
          mainScreen();
        } else if (answers.action === 'View all roles') {
          pool.query(`SELECT * FROM role`, (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.rows);
            }
          });
        } else if (answers.action === 'View all employees') {
          pool.query(`SELECT * FROM employee`, (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.rows);
            }
          });
        } else if (answers.action === 'Add a department') {
          let newDepartment = addDepartment();
          pool.query(`INSERT INTO department (name) VALUES ('$1')`, [newDepartment], (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.rows);
            }
          });
        } else if (answers.action === 'Add a role') {
          pool.query(`SELECT * FROM employee`, (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.rows);
            }
          });
        } else if (answers.action === 'Add an employee') {
          pool.query(`SELECT * FROM employee`, (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.rows);
            }
          });
        } else if (answers.action === 'Update an employee role') {
          pool.query(`SELECT * FROM employee`, (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.rows);
            }
          });
        } else if (answers.action === 'Exit') {
            process.exit();
        }
      })
}

const addDepartment = (): void => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'Enter new department name',
      },
    ])
    .then((answers) => {
      const newDepartment = answers;
      return newDepartment;
    });
}


mainScreen();
console.log();