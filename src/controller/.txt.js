const pool = require('../config');

// Function to add a school
const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [rows] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: "School added successfully", id: rows.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding school." });
  }
};

// Function to list schools sorted by proximity
const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude are required." });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM schools');
    const schools = rows.map(school => ({
      ...school,
      distance: getDistance(latitude, longitude, school.latitude, school.longitude),
    }));

    schools.sort((a, b) => a.distance - b.distance);
    res.status(200).json(schools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching schools." });
  }
};

// Helper function to calculate distance
const getDistance = (lat1, lon1, lat2, lon2) => {
  const geolib = require('geolib');
  return geolib.getDistance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
  );
};

module.exports = { addSchool, listSchools };
