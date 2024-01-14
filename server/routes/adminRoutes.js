import express from "express"
import authenticateUser from "../middleware/authMiddleware.js"
import isAdmin from "../middleware/isAdmin.js"
import { createPost, deleteUser, getAdminProfile , getAllusers } from "../controllers/admin.js"

const router = express.Router()



router.get('/profile', isAdmin , getAdminProfile )
router.get('/users' , isAdmin , getAllusers)
router.post('/posts' , isAdmin , createPost)
router.delete('/users/:id', isAdmin, deleteUser);
export {router as adminRoutes}