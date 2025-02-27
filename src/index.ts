// Packages being imported
import inquirer from 'inquirer';
import colors from 'colors';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import Table from 'cli-table3';

await connectToDb();

const clearConsole = () => {
  console.clear();
  process.stdout.write('\x1B[2J\x1B[0f');
};

// Main Screen Function
const mainScreen = (): void => {
  console.log(`╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║                                                                          ║
║  ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗   ║
║  ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝   ║
║  █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗     ║
║  ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝     ║
║  ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗   ║
║  ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝   ║
║          ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗   ║
║          ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗  ║
║          ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝  ║
║          ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗  ║
║          ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║  ║
║          ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝  ║
║                                                                          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝`);
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
            'Update an employee manager',
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
        } else if (selectedAction === 'Update an employee manager') {
          updateEmployeeManager();
        } else if (selectedAction === 'Exit') {
          console.log('Exiting program...');
          process.exit(0);
        }
      })
}

// Function to view all departments
const viewDepartments = async (): Promise<void> => {
  clearConsole();
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
  clearConsole();
  try {
    // Create a table to display the roles
    const result: QueryResult = await pool.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id');
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
  clearConsole();
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
  clearConsole();
  try {
    const departmentNames = await pool.query('SELECT name FROM department');
    const existingDepartments = departmentNames.rows.map((row) => row.name);
    const departmentInput = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: colors.blue('Enter the name of the new department:'),
          validate: (input: string) => {
            if (input.trim() === '') {
              return 'Department name cannot be empty';
            }
            if (existingDepartments.includes(input)) {
              return 'Department already exists';
            }
            return true;
          }
        },
      ])
    await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentInput.departmentName]);
    console.log('Department added successfully!');
    mainScreen();
  } catch (err) {
    console.log('Problem encountered adding department:', err);
  }
}

// Function to add a role
const addRole = async (): Promise<void> => {
  console.clear();
  try {
    const departmentResult = await pool.query('SELECT * FROM department');
    const departmentChoices = departmentResult.rows.map((row) => ({
      name: row.name, 
      value: row.id,
    }));
    
    const roleInput = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'titleName',
          message: colors.blue('Enter the title of the new role:'),
          validate: (input: string) => {
            if (input.trim() === '') {
              return 'Role title cannot be empty';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'salary',
          message: colors.blue('Enter the salary of the new role:'),
          validate: (input: string) => {
            if (input.trim() === '') {
              return 'Salary cannot be empty';
            }
            return true;
          }
        },
        {
          type: 'list',
          name: 'idValue',
          message: colors.blue('Which department does this role belong to:'),
          choices: departmentChoices,
        },
      ])
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
      [roleInput.titleName, roleInput.salary, roleInput.idValue]);
    console.log('Role added successfully!');
    mainScreen();
  } catch (err) {
    console.log('Problem encountered adding role:', err);
  }
}

// Function to add an employee
const addEmployee = async (): Promise<void> => {
  clearConsole();
  try {
    const roleResult = await pool.query('SELECT * FROM role');
    const roleChoices = roleResult.rows.map((row) => ({
      name: row.title, 
      value: row.id,
    }));
    const managerResult = await pool.query('SELECT * FROM employee');
    const managerChoices = managerResult.rows.map((row) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
    managerChoices.unshift({ name: '>> NO MANAGER <<', value: null });
    
    const employeeInput = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: colors.blue('Enter the first name of the new employee:'),
          validate: (input: string) => {
            if (input.trim() === '') {
              return 'First name cannot be empty';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'lastName',
          message: colors.blue('Enter the last name of the new employee:'),
          validate: (input: string) => {
            if (input.trim() === '') {
              return 'Last name cannot be empty';
            }
            return true;
          }
        },
        {
          type: 'list',
          name: 'role',
          message: colors.blue('Which role does the new employee have:'),
          choices: roleChoices,
        },
        {
          type: 'list',
          name: 'manager',
          message: colors.blue('Which manager does the new employee report to:'),
          choices: managerChoices,
        },
      ])
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
      [employeeInput.firstName, employeeInput.lastName, employeeInput.role, employeeInput.manager]);
    console.log('Employee added successfully!');
    mainScreen();
  } catch (err) {
    console.log('Problem encountered adding employee:', err);
  }
}

// Function to update an employee role
const updateEmployeeRole = async () => {
  clearConsole();
  try {
    const roleResult = await pool.query('SELECT * FROM role');
    const roleChoices = roleResult.rows.map((row) => ({
      name: row.title, 
      value: row.id,
    }));
    const employeeTable = await pool.query('SELECT * FROM employee');
    const employeeChoices = employeeTable.rows.map((row) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));


  const employeeRoleUpdate = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'selectEmployee',
        message: colors.blue('Select the employee to update:'),
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'selectRole',
        message: colors.blue('Select the new role for the employee:'),
        choices: roleChoices,
      }
    ])
    await pool.query('UPDATE employee SET role_id =$1 WHERE id = $2', 
      [employeeRoleUpdate.selectRole, employeeRoleUpdate.selectEmployee]);
    console.log('Employee role updated successfully!');
    mainScreen();
  } catch (err) {
    console.log('Problem encountered updating employee role:', err);
  }

  mainScreen();
};


// Update employee managers.
// Function to update an employee role
const updateEmployeeManager = async () => {
  clearConsole();
  try {
    const employeeTable = await pool.query('SELECT * FROM employee');
    const employeeChoices = employeeTable.rows.map((row) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
    const managerChoices = employeeTable.rows.map((row) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
    managerChoices.unshift({ name: '>> NO MANAGER <<', value: null });
  const employeeManagerUpdate = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'selectEmployee',
        message: colors.blue('Select the employee to update:'),
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'selectManager',
        message: colors.blue('Select the new manager for the employee:'),
        choices: managerChoices,
      }
    ])
    await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', 
      [employeeManagerUpdate.selectManager, employeeManagerUpdate.selectEmployee]);
    console.log('Employee role updated successfully!');
    mainScreen();
  } catch (err) {
    console.log('Problem encountered updating employee manager:', err);
  }

  mainScreen();
};

// View employees by manager.

// View employees by department.

// Delete departments, roles, and employees.

// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

// Call the main screen function to start the program
mainScreen();