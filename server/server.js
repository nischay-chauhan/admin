import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import {routes} from "./routes/routes.js"
import { adminRoutes } from "./routes/adminRoutes.js"
dotenv.config()

connectDB();

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api' , routes )
app.use('/api/admin' , adminRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server running on port ${PORT}`))