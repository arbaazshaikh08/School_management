import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

let connection; // Declare connection variable

const connectDB = async () => {
  if (!connection) {
    try {
      // Initialize the connection (no 'const' here to avoid shadowing)
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      console.log(
        `\nMySQL connected successfully to host: ${connection.config.host}`
      );
    } catch (error) {
      console.error("Error connecting to MySQL:", error);
      process.exit(1); // Exit with failure
    }
  }
  return connection;
};

// Export the connection and the function
export { connectDB, connection };
