const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const cors = require('cors');
const authRoutes = require("./Routes/auth")
const taskRoutes = require("./Routes/tasks")

require('dotenv').config();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
  


app.get("/", (req, res) => {
    res.send("Backend is running!")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})