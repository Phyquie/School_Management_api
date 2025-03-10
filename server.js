const express = require("express");
const bodyParser = require("body-parser");
const schoolRoutes = require("./routes/schoolRoutes");
const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.PORT);
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PORT);

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/schools", schoolRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

