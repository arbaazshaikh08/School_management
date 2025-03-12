import { School } from "../model/school.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/Asynchandlar.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import geolib from "geolib";


const addSchool = asyncHandler(async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      throw new ApiError(400, "All fields are required.");
    }

    const result = await School.addSchool(name, address, latitude, longitude);
    return res
      .status(200)
      .json(new ApiResponse(201, result, "School added successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// Function to list schools sorted by proximity
const listSchools = asyncHandler(async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      throw new ApiError(200, "Latitude and longitude are required.");
    }

    const schools = await School.getAllSchools();
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: geolib.getDistance(
          { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
          { latitude: school.latitude, longitude: school.longitude }
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res 
      .status(200)
      .json(
        new ApiResponse(200, sortedSchools, "Schools retrieved successfully")
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching schools." });
  }
});

export { addSchool, listSchools };
