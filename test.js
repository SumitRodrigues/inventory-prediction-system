const mysql = require('mysql2');

// Database connection configuration
const dbConfig = {
    host: 'localhost',    // Change if your MySQL server is remote
    user: 'root',         // Replace with your MySQL username
    password: 'SumitRodrigues@11', // Replace with your MySQL password
    database: 'test',     // Replace with your database name
    port: 3306            // Default MySQL port
};

// Create a connection to MySQL
const connection = mysql.createConnection(dbConfig);

// Test the connection
connection.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ Successfully connected to MySQL database!');
    
    // Run a simple query to check data
    connection.query('SHOW DATABASES;', (err, results) => {
        if (err) {
            console.error('❌ Error executing query:', err.message);
            return;
        }
        console.log('📌 Available Databases:', results);
    });

    // Close the connection
    connection.end();
});
