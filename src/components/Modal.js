import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './modal.css'
const CreateIncomeModal = ({ show, onHide, onCreateIncome }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateIncome({ source, amount });
    onHide(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter income source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button type="submit" variant="primary">Create Income</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateIncomeModal;
