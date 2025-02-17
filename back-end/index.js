import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";


connectDB();

const app = express();

//Middleware setup should be done first then.. 
app.use(express.json());

// this should be done next
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5002 ;
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})