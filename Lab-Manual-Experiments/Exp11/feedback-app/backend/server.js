require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Feedback = require("./models/Feedback");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongo connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/api/feedback", async (req, res) => {
  try {
    const items = await Feedback.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

app.post("/api/feedback", async (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res
      .status(400)
      .json({ error: "Name and comment are required" });
  }

  try {
    const doc = await Feedback.create({ name, comment });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
