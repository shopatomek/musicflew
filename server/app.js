const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { default: mongoose } = require("mongoose");

app.use(express.json());

// Allow requests from your Vercel frontend URL (set in .env)
// CORS_ORIGIN should be your Vercel app URL, e.g. https://musicflew.vercel.app
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

// Routes
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

const artistRoutes = require("./routes/artist");
app.use("/api/artist", artistRoutes);

const albumRoutes = require("./routes/album");
app.use("/api/albums", albumRoutes);

const songRoutes = require("./routes/songs");
app.use("/api/songs", songRoutes);

// Serve static React build (optional - only if serving from same server)
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MongoDB connection
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("✅ MongoDB Connected"))
  .on("error", (error) => {
    console.error(`❌ MongoDB Error: ${error}`);
  });

// Use PORT from environment (Railway/Render set this automatically)
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
