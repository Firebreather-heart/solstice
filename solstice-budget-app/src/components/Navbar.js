// Import React and Bootstrap components
import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation
import './navbar.css'
// Assuming you have a budget icon in your project assets
import BudgetIcon from '../assets/budget-icon.jpg';

const NavigationBar = ({ onShowModal }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout operations here, like clearing localStorage
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="Budget App"
            src={BudgetIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Solstice Budget App
        </Navbar.Brand>
        <div>
          <Button variant="outline-primary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="primary" onClick={onShowModal} className="ms-2">
            Create Income
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
