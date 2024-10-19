import express from "express";
// import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// dotenv.config();

connectDB();

const app = express();

//Middleware setup should be done first then.. 
app.use(express.json());

// this should be done next
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000 ;
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})