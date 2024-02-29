# Solstice - ALX Final Project
A next-gen personalised finance management application 


## Team Members
- ChIkodinaka Ann Anyanwu
- Ike Modzaka
- Daniel Feyisola

## Project Overview

The Personal Budget App is a collaborative project undertaken by our team for the ALX Software Engineering Program. The aim of the project is to create a web application that allows users to manage their personal finances effectively. The app is built using Django for the backend and React for the frontend.

## Features

### 1. User Authentication
- Users can create accounts and securely log in.
- Passwords are encrypted and stored securely.

### 2. Dashboard
- The dashboard provides an overview of the user's financial situation.
- It includes visualizations and charts for income, expenses, and savings.

### 3. Income Tracking
- Users can input and track their income from various sources.
- The app categorizes and visualizes income data.

### 4. Expense Tracking
- Users can add and categorize their expenses.
- The app provides insights into spending habits through charts and graphs.

### 5. Budget Planning
- Users can set monthly budgets for different expense categories.
- The app sends notifications or alerts when users exceed their budget.

### 6. Savings Goals
- Users can set savings goals and track their progress.
- The app provides suggestions on how to achieve these goals.

### 7. Transaction History
- A detailed history of all transactions, income, and expenses is available.
- Users can search and filter transactions based on various parameters.

## Technologies Used

### Backend
- Django: A high-level Python web framework for building robust web applications.
- Django REST Framework: An extension of Django for building RESTful APIs.

### Frontend
- React: A JavaScript library for building user interfaces.
- Redux: A predictable state container for JavaScript apps.

### Database
- MySQL: A powerful, open-source relational database system.

### Deployment
- Docker: Used for containerization, making deployment consistent and scalable.
- AWS/GCP: For hosting and cloud services.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Firebreather-heart/solstice.git
   cd solstice
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   cd frontend
   npm install
   ```

3. Set up the database:
   ```bash
   python manage.py migrate
   ```

4. Run the development server:
   ```bash
   python manage.py runserver
   ```

5. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   npm start
   ```

6.  ## setup
    Check the config folder for the database setup.
    ```bash 
    psql -U postgres -f setup.sql"
    ```
7. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the app.

## Contribution Guidelines

We welcome contributions from the community. If you find a bug, have a feature request, or want to contribute code, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and commit them.
4. Create a pull request with a detailed description of your changes.

## Acknowledgments

We would like to express our gratitude to the ALX Software Engineering Program for providing us with the opportunity to work on this project and enhance our skills.

Feel free to contact us for any inquiries or feedback. We hope you find the Personal Budget App useful and user-friendly!
