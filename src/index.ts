// Packages being imported
import inquirer from 'inquirer';
import colors from 'colors';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

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
          
        } else if (answers.action === 'View all roles') {
          
        } else if (answers.action === 'View all employees') {
        
        } else if (answers.action === 'Add a department') {
        
        } else if (answers.action === 'Add a role') {
        
        } else if (answers.action === 'Add an employee') {
        
        } else if (answers.action === 'Update an employee role') {
        
        } else if (answers.action === 'Exit') {
            process.exit();
        }
      })
}

mainScreen();
console.log();