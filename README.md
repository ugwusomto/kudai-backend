## Kudai Bank API

Kudai Bank is a Node.js application that provides a comprehensive API for bank operations. It offers functionalities for both users and administrators, making it a versatile solution for financial management.

## Features

* **Authentication:** Secure authentication endpoints for users and admins.
* **Role Management:** Admins can manage user roles and permissions.
* **Account Management:**
    * Create new accounts.
    * Deposit funds.
    * Transfer funds between accounts.
    * Withdraw funds.
    * Manage payees for easy transfers.
    * Loan application (implementation details not provided).
* **Transactions:** Track and manage financial transactions.
* **Payment Gateway Integration:** Integrates with Paystack for secure online payments.

  ## Installation

1. Clone the repository:
   
    ```bash
    git clone https://github.com/ugwusomto/kudai-backend.git
    ```
3. Navigate to the project directory:
   
    ```bash
    cd kudai-bank
    ```
4. Install dependencies:
   
    ```bash
    npm install
    ```
5. Start the server:
   
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
