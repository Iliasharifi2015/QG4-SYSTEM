const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const verificationRoutes = require("./routes/verification");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "QG4 Backend is running!",
    version: "1.0.0"
  });
});

app.get("/api/health", (req, res) => {
    res.redirect("/api/v1/health");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/verification", verificationRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`QG4 Backend running on port ${PORT}`);
});
