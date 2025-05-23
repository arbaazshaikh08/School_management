import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connection;

const connectDB = async () => {
  if (!connection) {
    try {
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
      process.exit(1);
    }
  }
  return connection;
};

export { connectDB };
