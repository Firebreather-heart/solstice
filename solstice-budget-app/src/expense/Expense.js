import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './expense.css'; // Assuming you have your CSS for ExpensesPage

const ExpensesPage = () => {
  const incomeId = localStorage.getItem('selectedIncomeId'); // Retrieve income ID from local storage
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const userId = localStorage.getItem('userId'); // Retrieve user ID

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    // Fetch expenses related to the incomeId
    try {
      const response = await fetch(`https://solstice-cjof.onrender.com/expenses/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Error fetching expenses. Please try again.');
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`https://solstice-cjof.onrender.com/expenses/${expenseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete expense');
      // Update the expenses list after deleting the expense
      setExpenses(expenses.filter(expense => expense.id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense. Please try again.');
    }
  };

  const handleSubmitExpense = async (event) => {
    event.preventDefault();

    const expenseData = {
      income_id: incomeId,
      name: expenseName,
      amount: parseFloat(expenseAmount) // Convert amount to float
    };

    try {
      const response = await fetch('https://solstice-cjof.onrender.com/create-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) throw new Error('Failed to create expense');

      console.log('Expense created successfully');
      setShowForm(false); // Close the form after submitting
      fetchExpenses(); // Refresh expenses list after creating a new expense
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Error creating expense. Please try again.');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand-container">
          <h1 className="brand">Expenses</h1>
        </div>
        <div className="buttons">
          <Link to="/homepage" className="back">Back to Incomes</Link>
          <button onClick={() => setShowForm(true)} className="create-expense">Create Expense</button> {/* Add button to create expense */}
        </div>
      </nav>

      <div className="container">
        <h2 className="section-heading">All Expenses</h2>
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.name}</td>
                <td>${expense.amount}</td>
                <td>
                  <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="expense-form">
          <h2>Create Expense</h2>
          <form onSubmit={handleSubmitExpense}>
            <div className="form-group">
              <label htmlFor="expenseName">Expense Name</label>
              <input type="text" id="expenseName" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="expenseAmount">Expense Amount</label>
              <input type="number" id="expenseAmount" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} required />
            </div>
            <button type="submit" className="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ExpensesPage;
