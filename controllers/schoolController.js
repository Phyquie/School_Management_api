const db = require("../config/db");
const calculateDistance = require("../utils/distance");

// Add School
exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(201).json({ message: "School added successfully", schoolId: result.insertId });
    });
    
};

// List Schools Sorted by Proximity
exports.listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and Longitude are required" });
    }

    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        return res.status(400).json({ message: "Invalid latitude or longitude values" });
    }

    const query = "SELECT id, name, address, latitude, longitude FROM schools";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        results.forEach((school) => {
            school.distance = calculateDistance(userLatitude, userLongitude, school.latitude, school.longitude);
        });

        results.sort((a, b) => a.distance - b.distance);

        res.json(results);
    });
};
