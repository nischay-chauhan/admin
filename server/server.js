import express from "express"
import cors from "cors"
import { v2 as cloudinary } from 'cloudinary';
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import {routes} from "./routes/routes.js"
import { adminRoutes } from "./routes/adminRoutes.js"
// import Connectcd from "./config/cd.js"
dotenv.config()

connectDB();


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connectcd();

//   cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

app.use('/api' , routes )
app.use('/api/admin' , adminRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server running on port ${PORT}`))