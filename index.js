const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection setup
let sslConfig;
if (process.env.DATABASE_SSL === 'true') {
  sslConfig = {
    rejectUnauthorized: false, // Adjust this based on your SSL setup
  };
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
});

// Check database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connected successfully');
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});

//DROP TABLE IF EXISTS expenses, savings_goals, incomes, users CASCADE;

// Connect and create tables if they don't exist
const createTables = async () => {
    const client = await pool.connect();
    try {
      // Users table
      await client.query(`

        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          username VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL
        );
      `);
      // Incomes table
      await client.query(`
        CREATE TABLE IF NOT EXISTS incomes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id),
          source VARCHAR(255) NOT NULL,
          amount DECIMAL NOT NULL,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      // Savings goals table (linked to incomes)
      await client.query(`
        CREATE TABLE IF NOT EXISTS savings_goals (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          income_id UUID REFERENCES incomes(id),
          amount DECIMAL NOT NULL
        );
      `);
      // Expenses table
      await client.query(`
        CREATE TABLE IF NOT EXISTS expenses (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          income_id UUID REFERENCES incomes(id),
          name VARCHAR(255) NOT NULL,
          amount DECIMAL NOT NULL
        );
      `);
      console.log('Tables created successfully');
    } catch (err) {
      console.error('Error creating tables', err);
      throw err;
    } finally {
      client.release();
    }
  };
  
  createTables().catch(err => console.error('Failed to create tables', err));  


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

 

// Sign Up Route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await pool.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id', 
        [username, hashedPassword]
      );
      const userId = result.rows[0].id; // Extract the returned user ID
      res.status(201).json({ userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  // Login Route (No session management)
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (result.rows.length === 0) {
        return res.status(404).send('User not found');
      }
      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (isValid) {
        res.status(200).json({ message: 'Login successful', userId: user.id }); // Return userId upon successful login
      } else {
        res.status(401).send('Incorrect password');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  app.post('/create-income', async (req, res) => {
    const { user_id, source, amount } = req.body;
    const sourceLowerCase = source.toLowerCase(); // Convert source to lowercase
  
    try {
      // Check if income source already exists for the user
      const existingSource = await pool.query(
        'SELECT * FROM incomes WHERE user_id = $1 AND LOWER(source) = $2',
        [user_id, sourceLowerCase]
      );
  
      if (existingSource.rows.length > 0) {
        // If source exists, inform the client to use a different source name
        return res.status(400).json({ message: 'Income source already exists. Please provide a different source name.' });
      }
  
      // If source does not exist, insert the new income
      const result = await pool.query(
        'INSERT INTO incomes (user_id, source, amount) VALUES ($1, $2, $3) RETURNING id',
        [user_id, sourceLowerCase, amount]
      );
  
      // Return the income ID of the newly added income
      const incomeId = result.rows[0].id;
      res.status(201).json({ message: 'Income added successfully', incomeId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/savings-goal', async (req, res) => {
    const { income_id, amount } = req.body;
  
    try {
      // Get the income amount
      const incomeResult = await pool.query(
        'SELECT amount FROM incomes WHERE id = $1',
        [income_id]
      );
  
      if (incomeResult.rows.length === 0) {
        return res.status(404).json({ message: 'Income not found' });
      }
  
      const incomeAmount = incomeResult.rows[0].amount;
  
      // Check if the savings goal amount exceeds the income amount
      if (parseFloat(amount) > parseFloat(incomeAmount)) {
        return res.status(400).json({ message: 'Savings goal amount cannot exceed income amount' });
      }
  
      // Check if a savings goal already exists for the specified income
      const existingGoal = await pool.query(
        'SELECT * FROM savings_goals WHERE income_id = $1',
        [income_id]
      );
  
      if (existingGoal.rows.length > 0) {
        // If a savings goal already exists for the income, inform the client
        return res.status(400).json({ message: 'A savings goal for this income already exists. Please update the existing goal or choose a different income.' });
      }
  
      // Insert the new savings goal
      const result = await pool.query(
        'INSERT INTO savings_goals (income_id, amount) VALUES ($1, $2) RETURNING id',
        [income_id, amount]
      );
  
      // Return the savings goal ID of the newly added savings goal
      const savingsGoalId = result.rows[0].id;
      res.status(201).json({ message: 'Savings goal added successfully', savingsGoalId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  app.post('/create-expense', async (req, res) => {
    const { income_id, name, amount } = req.body;
  
    try {
      // Retrieve the income amount associated with the specified income_id
      const incomeResult = await pool.query(
        'SELECT amount FROM incomes WHERE id = $1',
        [income_id]
      );
  
      if (incomeResult.rows.length === 0) {
        // If no income found for the specified income_id, return an error
        return res.status(404).json({ message: 'Income not found' });
      }
  
      const incomeAmount = parseFloat(incomeResult.rows[0].amount);
  
      // Retrieve the total savings amount associated with the specified income_id
      const savingsResult = await pool.query(
        'SELECT COALESCE(SUM(amount), 0) AS total_savings FROM savings_goals WHERE income_id = $1',
        [income_id]
      );
  
      const savingsAmount = parseFloat(savingsResult.rows[0].total_savings);
  
      // Calculate the remaining income amount after subtracting savings amount
      const remainingIncome = incomeAmount - savingsAmount;
  
      // Retrieve the total amount of expenses associated with the specified income_id
      const totalExpensesResult = await pool.query(
        'SELECT COALESCE(SUM(amount), 0) AS total_expenses FROM expenses WHERE income_id = $1',
        [income_id]
      );
  
      const totalExpenses = parseFloat(totalExpensesResult.rows[0].total_expenses);
  
      // Calculate the remaining income amount after subtracting total expenses
      const remainingIncomeAfterExpenses = remainingIncome - totalExpenses;
  
      if (parseFloat(amount) > remainingIncomeAfterExpenses) {
        // If the expense amount exceeds the remaining income after expenses, return an error
        return res.status(400).json({ message: 'Expense amount exceeds the remaining income amount after subtracting savings and previous expenses' });
      }
  
      // Insert the new expense
      await pool.query(
        'INSERT INTO expenses (income_id, name, amount) VALUES ($1, $2, $3)',
        [income_id, name, amount]
      );
  
      res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  // List all expenses of a user
app.get('/expenses/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const expensesResult = await pool.query(
        'SELECT * FROM expenses WHERE income_id IN (SELECT id FROM incomes WHERE user_id = $1)',
        [userId]
      );
  
      const expenses = expensesResult.rows;
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // List all incomes of a user with savings goal
  app.get('/incomes/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const incomesResult = await pool.query(
        'SELECT incomes.*, COALESCE(savings_goals.amount, 0) AS savings_goal_amount FROM incomes LEFT JOIN savings_goals ON incomes.id = savings_goals.income_id WHERE incomes.user_id = $1',
        [userId]
      );
  
      const incomes = incomesResult.rows;
      res.status(200).json(incomes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete income of a user
  app.delete('/income/:incomeId', async (req, res) => {
    const incomeId = req.params.incomeId;
  
    try {
      await pool.query('DELETE FROM incomes WHERE id = $1', [incomeId]);
      res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete an expense of a user
  app.delete('/expense/:expenseId', async (req, res) => {
    const expenseId = req.params.expenseId;
  
    try {
      await pool.query('DELETE FROM expenses WHERE id = $1', [expenseId]);
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Edit expense amount and name of a user
  app.put('/expense/:expenseId', async (req, res) => {
    const { name, amount } = req.body;
    const expenseId = req.params.expenseId;
  
    try {
      await pool.query('UPDATE expenses SET name = $1, amount = $2 WHERE id = $3', [name, amount, expenseId]);
      res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Edit income amount and name of a user
  app.put('/income/:incomeId', async (req, res) => {
    const { name, amount } = req.body;
    const incomeId = req.params.incomeId;
  
    try {
      await pool.query('UPDATE incomes SET name = $1, amount = $2 WHERE id = $3', [name, amount, incomeId]);
      res.status(200).json({ message: 'Income updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Edit savings goal amount of a user
  app.put('/savings-goal/:savingsGoalId', async (req, res) => {
    const { amount } = req.body;
    const savingsGoalId = req.params.savingsGoalId;
  
    try {
      await pool.query('UPDATE savings_goals SET amount = $1 WHERE id = $2', [amount, savingsGoalId]);
      res.status(200).json({ message: 'Savings goal updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/transaction-history/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Get all incomes of the user
      const incomesResult = await pool.query(
        'SELECT id, source AS name, amount FROM incomes WHERE user_id = $1',
        [userId]
      );
  
      // Create an object to store transactions
      const transactions = [];
  
      // Iterate over each income
      for (const income of incomesResult.rows) {
        // Get the total amount of savings associated with the income
        const savingsResult = await pool.query(
          'SELECT COALESCE(SUM(amount), 0) AS total_savings FROM savings_goals WHERE income_id = $1',
          [income.id]
        );
        const totalSavings = parseFloat(savingsResult.rows[0].total_savings);
  
        // Get the total amount of expenses associated with the income
        const expensesResult = await pool.query(
          'SELECT COALESCE(SUM(amount), 0) AS total_expenses FROM expenses WHERE income_id = $1',
          [income.id]
        );
        const totalExpenses = parseFloat(expensesResult.rows[0].total_expenses);
  
        // Calculate the remaining amount after savings and expenses
        const remainingAmount = income.amount - totalSavings - totalExpenses;
  
        // Create an object for the income including its expenses, savings, and remaining amount
        const incomeWithDetails = {
          ...income,
          type: 'Income',
          totalExpenses,
          totalSavings,
          remainingAmount
        };
  
        // Get all expenses associated with the income
        const incomeExpensesResult = await pool.query(
          'SELECT name, amount FROM expenses WHERE income_id = $1',
          [income.id]
        );
        const incomeExpenses = incomeExpensesResult.rows;
  
        // Add expenses to the incomeWithDetails object
        incomeWithDetails.expenses = incomeExpenses;
  
        // Add the incomeWithDetails object to the transactions array
        transactions.push(incomeWithDetails);
      }
  
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
 
  
  
  

  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
