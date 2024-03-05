import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./users/Login";
import Signup from "./users/Signup";
import "./App.css";
import HomePage from "./Home/HomePage";
import ExpensePage from "./expense/Expense";
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <div>
      <Navbar />

      <Router>
        <div className="App">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/expense" element={<ExpensePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
