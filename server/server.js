import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());



// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/package",packageRoutes);


app.get("/", (req, res) =>{
    res.send("<h1>Hello</h1>");
});


// Error Middleware

app.use(errorMiddleware);


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})