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

// CORS configuration
app.use(cors({
  origin: '*', // Consider restricting this in production
  optionsSuccessStatus: 200,
}));

// API routes
app.use("/users", userRoutes); // Remove the /api prefix here, as Vercel adds it

// Health check route
app.get("/health", (req, res) => { // Also remove /api prefix here
  res.status(200).json({ status: "ok" });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

// Export as middleware
export default app;