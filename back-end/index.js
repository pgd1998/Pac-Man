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
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();

// Middleware setup
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "https://pac-man-pgd.vercel.app", // Replace with your frontend domain
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// API routes
app.use("/api/users", userRoutes);

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all handler to serve the React app for any route not handled by the API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});