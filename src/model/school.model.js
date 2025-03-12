import { connectDB } from "../db/index.js";

class School {
  static async addSchool(name, address, latitude, longitude) {
    const connection = await connectDB(); // Connect to the database
    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
   
    const [result] = await connection.execute(query, [
      name,
      address,
      latitude,
      longitude,
    ]);
    return { id: result.insertId, message: "School added successfully" };
  }

  static async getAllSchools() {
    const connection = await connectDB(); 
    const [rows] = await connection.execute("SELECT * FROM schools");
    return rows;
  }
}

export { School};
