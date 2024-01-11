import express from "express"
import { login, logout, register } from "../controllers/auth.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { getUserProfile, updateUserProfile } from "../controllers/Users.js";

const router = express.Router();


router.post('/register' , register)
router.post('/login' , login)
router.post('/logout' , authenticateUser, logout)
router.get('/profile', authenticateUser, getUserProfile);
router.put('/update-profile', authenticateUser, updateUserProfile);



export {router as routes}
