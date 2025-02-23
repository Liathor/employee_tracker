// Packages being imported
import inquirer from 'inquirer';
import colors from 'colors';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import Table from 'cli-table3';

await connectToDb();

// Main Screen Function
const mainScreen = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ].map(choice => colors.magenta(choice)),
        },
      ])
      .then((answers: any) => {
        const selectedAction = answers.action.replace(/\x1B\[[0-9;]*m/g, ''); // Remove color codes
        if (selectedAction === 'View all departments') {
          viewDepartments();
        } else if (selectedAction === 'View all roles') {
          viewRoles();
        } else if (selectedAction === 'View all employees') {
          viewEmployees();
        } else if (selectedAction === 'Add a department') {
          addDepartment();
        } else if (selectedAction === 'Add a role') {
          addRole();
        } else if (selectedAction === 'Add an employee') {
          addEmployee();
        } else if (selectedAction === 'Update an employee role') {
          updateEmployeeRole();
        } else if (selectedAction === 'Exit') {
          console.log('Exiting program...');
          process.exit(0);
        }
      })
}

// Function to view all departments
const viewDepartments = async (): Promise<void> => {
  try {
    // Create a table to display the departments
    const result: QueryResult = await pool.query('SELECT * FROM department');
    const table = new Table({
      head: ['ID', 'Name'],
      colWidths: [10, 20]
    });
    result.rows.forEach(row => {
      table.push([row.id, row.name]);
    });
    console.log(table.toString());

    // Prompt the user to return to the main menu

    const backButton = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'back',
          message: colors.blue('Return to main menu?'),
          choices: [
            'Return',],
        },
      ])
        if (backButton.back === 'Return') {
          mainScreen();
        }
    } catch (err) {
      console.log('Problem encountered fetching department data:', err);
    } 
}

// Function to view all roles
const viewRoles = async (): Promise<void> => {
  try {
    // Create a table to display the roles
    const result: QueryResult = await pool.query('SELECT * FROM role JOIN department ON role.department_id = department.id');
    const table = new Table({
      head: ['ID', 'Title', 'Salary', 'Department'],
      colWidths: [10, 30, 20, 20]
    });
    result.rows.forEach(row => {
      table.push([row.id, row.title, row.salary, row.name]);
    });
    console.log(table.toString());

    // Prompt the user to return to the main menu

    const backButton = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'back',
          message: colors.blue('Return to main menu?'),
          choices: [
            'Return',],
        },
      ])
        if (backButton.back === 'Return') {
          mainScreen();
        }
    } catch (err) {
      console.log('Problem encountered fetching role data:', err);
    } 
}

// Function to view all employees
const viewEmployees = async (): Promise<void> => {
  try {
    // Create a table to display the employees
    const result: QueryResult = await pool.query(`
      SELECT 
        e.id, 
        e.first_name, 
        e.last_name, 
        r.title, 
        COALESCE(m.first_name || ' ' || m.last_name, '') AS manager_name
        FROM employee e
        JOIN role r ON e.role_id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id  -- Self-join to get manager info
        ORDER BY e.id;
    `);
    const table = new Table({
      head: ['ID', 'First Name', 'Last Name', 'Role', 'Manager'],
      colWidths: [10, 20, 20, 30, 30]
    });
    result.rows.forEach(row => {
      table.push([row.id, row.first_name, row.last_name, row.title, row.manager_name]);
    });
    console.log(table.toString());

    // Prompt the user to return to the main menu

    const backButton = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'back',
          message: colors.blue('Return to main menu?'),
          choices: [
            'Return',],
        },
      ])
        if (backButton.back === 'Return') {
          mainScreen();
        }
    } catch (err) {
      console.log('Problem encountered fetching employee data:', err);
    } 
}

// Function to add a department
const addDepartment = async (): Promise<void> => {
  try {
    // Create a table to display the employees
    const result: QueryResult = await pool.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id');
    const table = new Table({
      head: ['ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID'],
      colWidths: [10, 20, 20, 10, 10]
    });
    result.rows.forEach(row => {
      table.push([row.id, row.first_name, row.last_name, row.role_id, row.manager_id]);
    });
    console.log(table.toString());

    // Prompt the user to return to the main menu

    const backButton = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'back',
          message: colors.blue('Return to main menu?'),
          choices: [
            'Return',],
        },
      ])
        if (backButton.back === 'Return') {
          mainScreen();
        }
    } catch (err) {
      console.log('Problem encountered fetching employee data:', err);
    } 
}

const addRole = async () => {
  console.log('Add a role function not implemented yet.');
  mainScreen();
};

const addEmployee = async () => {
  console.log('Add an employee function not implemented yet.');
  mainScreen();
};

const updateEmployeeRole = async () => {
  console.log('Update an employee role function not implemented yet.');
  mainScreen();
};




mainScreen();