const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const verifyToken = require("./middleware/authMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// User authentication routes
app.use("/api/auth", authRoutes);

// Protected routes (require authentication)
app.use("/api/invoices", verifyToken, invoiceRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
