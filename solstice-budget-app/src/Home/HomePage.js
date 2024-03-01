import React, { useState, useEffect } from 'react';
import BudgetIcon from '../assets/budget-icon.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './home.css';

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showForm, setShowForm] = useState(false);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`https://solstice-cjof.onrender.com/incomes/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch incomes');
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      alert('Error fetching incomes. Please try again.');
    }
  };

  const handleLogout = () => {
    window.location.href = '/logout';
  };

  const handleCreateIncome = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const incomeData = { user_id: userId, source, amount };

    try {
      const response = await fetch('https://solstice-cjof.onrender.com/create-income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incomeData),
      });

      if (!response.ok) throw new Error('Failed to create income');

      fetchIncomes();
      setSource('');
      setAmount('');
      setShowForm(false);
    } catch (error) {
      console.error('Error creating income:', error);
      alert('Error creating income. Please try again.');
    }
  };

  const handleIncomeClick = (incomeId) => {
    localStorage.setItem('selectedIncomeId', incomeId);
    navigate('/expense'); // Navigate to ExpensePage
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand-container">
          <img alt="Budget App" src={BudgetIcon} width="30" height="30" className="brand-icon" />
          <h1 className="brand">Solstice Budget App</h1>
        </div>
        <div className="buttons">
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container">
        <h1 className="section-heading">Your Incomes</h1>
        <div className="income-list">
          <div className="income-item">
            <div className="label">Number</div>
            <div className="label">INCOME</div>
            <div className="label">AMOUNT</div>
          </div>
          {incomes.map((income, index) => (
            <div className="income-item" key={index} onClick={() => handleIncomeClick(income.id)}> {/* Pass income ID */}
              <div>{index + 1}</div>
              <div>{income.source}</div>
              <div>${income.amount}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="create-income-container">
        <button className="create-income" onClick={() => setShowForm(true)}>Create Income</button>
        {showForm && (
          <div className="create-income-form">
            <h2>Create New Income</h2>
            <form onSubmit={handleCreateIncome}>
              <div className="form-group">
                <label htmlFor="source">Source</label>
                <input type="text" id="source" value={source} onChange={(e) => setSource(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>
              <div className="button-group">
                <button type="submit" className="submit-btn">Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
