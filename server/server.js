import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import Connectcd from "./config/cd.js"

dotenv.config()

connectDB();
Connectcd();
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server running on port ${PORT}`))