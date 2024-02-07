import express from "express"
import { forgotPassword, login, logout, register, resetPassword } from "../controllers/auth.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { getAdminPosts, getAllPosts, getUserProfile, updateProfilePicture, updateUserProfile } from "../controllers/Users.js";
import { upload } from "../middleware/multerMiddleware.js";


const router = express.Router();


router.post('/register', upload.single('profilePicture') , register)
router.post('/login' , login)
router.post('/logout' , authenticateUser, logout)
router.get('/profile', authenticateUser, getUserProfile);
router.put('/update-profile', authenticateUser,upload.single('profilePicture'),updateUserProfile);
router.put('/updateProfilePicture/:userId', upload.single('profilePicture') , updateProfilePicture )
router.get('/posts' ,authenticateUser , getAllPosts)
router.get('/users/:userId/posts' ,getAdminPosts)
router.post('/forgotpassword' , forgotPassword)
router.post('/resetpassword/:id/:resetToken' , resetPassword)
export {router as routes}
