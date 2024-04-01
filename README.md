# Kudai Bank API

Welcome to Kudai Bank API, a Node.js project for managing banking operations.

## Features

- Authentication endpoints for users and admins.
- Role management for admins.
- Account management including creating accounts, depositing, transferring, withdrawing, managing payees, and loaning.
- Transaction handling with integration into Paystack payment gateway API.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm run dev
    ```

## Prerequisites

Make sure you have the following installed:

- Node.js
- MySQL database or XAMPP/MAMP/LAMP

## .env Configuration

Modify the `.env` file with your database and other configurations:

```plaintext
APPNAME="KUDAI BANK"
DB_USERNAME=root
DB_PASSWORD=''
DB_NAME=kudai_bank
DB_HOST=127.0.0.1
DB_DIALECT=mysql
DB_PORT=3306
DB_ALTER=false
JWT_KEY='sdfssffsdffsf'
MAIL_USER=' '
MAIL_PASSWORD=' '
