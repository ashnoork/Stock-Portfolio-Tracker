# Stock Portfolio Tracker

This project is a Stock Portfolio Tracker that allows users to track their current stock holdings and transactions. The application includes an overview page showing current holdings with a pie chart and a transactions page where users can add, edit, and delete transactions.

## Assumptions

- Users can manually add their stock holdings.
- Users can manually add, edit, and delete transactions.
- The holdings will be updated based on the transactions made (this functionality is yet to be implemented).

## Project Structure

### Frontend

- **HoldingsPage.js:** Displays current stock holdings and a pie chart.
- **TransactionsPage.js:** Displays transactions and allows adding, editing, and deleting transactions.
- **App.js:** Main app component, including routing setup.

### Backend

- **database.js:** Database connection and query functions for holdings and transactions.
- **server.js:** Express server setup and API endpoints for holdings and transactions.
- **.env:** Configuration file for environment variables.
- **schema.sql:** SQL file to create the necessary database schema.

## Features

- Overview page displaying current holdings with a pie chart.
- Transactions page displaying transaction history.
- Functionality to add, edit, and delete transactions.
- Functionality to add and delete holdings.
- Login and signup pages (not yet connected to the database).

## Setting Up and Running the Application Locally

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

### Installation and Configuration

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd stock-portfolio-tracker

2. **Set up the backend:**
- Navigate to the backend directory:
  ```
  cd backend
  ```

- Install the dependencies:
  ```
  npm install
  ```

- Create a `.env` file in the backend directory and add the following content:
  ```
  NODE_ENV=development
  PORT=
  MYSQL_HOST='127.0.0.1'
  MYSQL_USER='root'
  MYSQL_PASSWORD=''
  MYSQL_DATABASE='stockPortfolio'
  JWT_SECRET=''
  ```

3. **Set up the database:**
- Open MySQL and run the `schema.sql` file to create the necessary tables:
  ```
  SOURCE /path/to/schema.sql;
  ```

4. **Set up the frontend:**
- Navigate to the frontend directory:
  ```
  cd ../frontend
  ```

- Install the dependencies:
  ```
  npm install
  ```

## Running the Application

1. **Start the backend and frontend server:**
```
npm run dev
