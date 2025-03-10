// import express from "express";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";


// connectDB();

// const app = express();

// //Middleware setup should be done first then.. 
// app.use(express.json());

// // this should be done next
// app.use("/api/users", userRoutes);

// const port = process.env.PORT || 5002 ;
// app.listen(port, () => {
//     console.log(`Server is running at ${port}`)
// })

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// Initialize Express
const app = express();

// Connect to database
connectDB();

// Middleware setup
app.use(express.json());

// CORS configuration for production
app.use(cors({
  // Change this to your frontend URL when you know it
  // For development, using wildcard
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200,
}));

// API routes - IMPORTANT: Keep the /api prefix for consistency with your frontend
app.use("/api/users", userRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Define port - Render will set process.env.PORT
const PORT = process.env.PORT || 5002;

// Start the server - THIS IS IMPORTANT FOR RENDER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Also export the app for testing purposes if needed
export default app;