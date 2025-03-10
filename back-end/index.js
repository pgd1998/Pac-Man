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

// Connect to database (ensure this is properly configured for serverless)
connectDB();

// Middleware setup
app.use(express.json());

// CORS configuration - more permissive for development
app.use(cors({
  origin: '*', // Consider tightening this in production
  optionsSuccessStatus: 200,
}));

// API routes
app.use("/api/users", userRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Important: This is how Vercel expects the export
export default app;