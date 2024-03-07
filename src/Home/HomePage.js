import React, { useState } from "react";
import Budget from "../assets/budget.webp";
import "./home.css";
import { addBudget, modifyElement, addExpense,  } from "../utils";

const HomePage = () => {
  const [tempAmount, setTempAmount] = useState(0);
  const [budget, setBudget] = useState(0);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [balanceValue, setBalanceValue] = useState(0);
  const [disableButtons, setDisableButtons] = useState(false);
  const [ expenditureValue, setExpenditureValue ]= useState(0);
  const [productTitleError, setProductTitleError] = useState("")
    
  const handleAddBudget = () => {
    addBudget(tempAmount, setErrorMessage, setBudget, setBalanceValue);
  };
const handleDelete = (item) => {
  
};
  const handleAddExpense = () => {
    addExpense(
      amount,
      title,
      setTitle,
      setAmount,
      setDisableButtons,
      setProductTitleError,
      expenditureValue,
      tempAmount,
      setBalanceValue,
      setExpenseList,
      setExpenditureValue,
      expenseList
      );
  };
 
  return (
    <>
      <div className="background">
        <div className="mask">
          <img className="backgroundImage" src={Budget} alt="budget" />
        </div>
          <div className="content">
            <div className="wrapper">
              <div className="container">
                <div className="sub-container">
                  <div className="total-amount-container">
                    <h3>Budget</h3>
                    {errorMessage && (
                      <p className="error" id="budget-error">
                        {errorMessage}
                      </p>
                    )}
                    <input
                      type="number"
                      id="total-amount"
                      value={tempAmount}
                      onChange={(e) => setTempAmount(e.target.value)}
                      placeholder="Enter Total Amount"
                    />
                    <button
                      className="submit"
                      onClick={handleAddBudget}
                      id="total-amount-button"
                    >
                      Add Budget
                    </button>
                  </div>
                  {/* Expense Section */}
                  <div className="user-amount-container">
                    <h3>Expenses</h3>
                    <input
                      type="text"
                      className="product-title"
                      id="product-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Title of Product"
                    />
                    <input
                      type="number"
                      id="user-amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter Cost of Product"
                    />
                    <button
                      className="submit"
                      onClick={handleAddExpense}
                      id="check-amount"
                      
                    >
                      Add Expenses
                    </button>
                  </div>
                  {/* Output Section */}
                </div>
                <div className="output-container flex-space">
                  <div>
                    <p>Total Budget</p>
                    <span id="amount">{budget}</span>
                  </div>
                  <div>
                    <p>Expenses</p>
                    <span id="expenditure-value">
                      {expenditureValue}
                    </span>
                  </div>
                  <div>
                    <p>Balance</p>
                    <span id="balance-amount">{balanceValue}</span>
                  </div>
                </div>
                {/* List Section */}
              </div>
              <div className="list">
                <h3>Expense List</h3>
                <div className="list-container" id="list">
                  {/* Render expense list items */}
                  {expenseList.map((expense, index) => (
                    <div className="sublist-content flex-space" key={index}>
                      <p className="product">{expense.title}</p>
                      <p className="amount">{expense.amount}</p>
                      <button
                        className="fa-solid fa-pen-to-square edit"
                        onClick={() =>
                          modifyElement(
                            index,
                            true,
                            expenseList,
                            setTitle,
                            setAmount,
                            setDisableButtons,
                            setBalanceValue,
                            () => {}
                          )
                        }
                      >
                        Edit
                      </button>
                      
                      {/* delete */}
                      <button
                        className="fa-solid fa-trash-can delete"
                        onClick={() =>
                          modifyElement(
                            index,
                            title,
                            amount,
                            setDisableButtons,
                            setBalanceValue
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
