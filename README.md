<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kudai Bank API README</title>
</head>
<body>
  <div>
    <h1>Kudai Bank API</h1>
    <p>Welcome to Kudai Bank API, a Node.js project for managing banking operations.</p>
    
    <h2>Installation</h2>
    <p>To use the app, follow these steps:</p>
    <ol>
      <li>Clone the repository.</li>
      <li>Navigate to the project directory.</li>
      <li>Install dependencies: <code>npm install</code>.</li>
      <li>Start the server: <code>npm run dev</code>.</li>
    </ol>
    
    <h2>Prerequisites</h2>
    <p>Make sure you have the following installed:</p>
    <ul>
      <li>Node.js</li>
      <li>MySQL database or XAMPP/MAMP/LAMP</li>
    </ul>
    
    <h2>Configuration</h2>
    <p>Modify the <code>.env</code> file with your database and other configurations:</p>
    <pre>
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
    </pre>
    
    <button onclick="copyEnv()">Copy .env Content</button>
    <script>
      function copyEnv() {
        const envContent = `APPNAME="KUDAI BANK"
DB_USERNAME=root
DB_PASSWORD=''
DB_NAME=kudai_bank
DB_HOST=127.0.0.1
DB_DIALECT=mysql
DB_PORT=3306
DB_ALTER=false
JWT_KEY='sdfssffsdffsf'
MAIL_USER=' '
MAIL_PASSWORD=' '`;
        navigator.clipboard.writeText(envContent).then(() => {
          alert("Content copied to clipboard!");
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      }
    </script>
    
    <p>Feel free to change the values to suit your environment.</p>
  </div>
</body>
</html>
