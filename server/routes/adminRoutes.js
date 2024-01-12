import express from "express"
import authenticateUser from "../middleware/authMiddleware.js"
import isAdmin from "../middleware/isAdmin.js"
import { createPost, getAdminProfile , getAllusers } from "../controllers/admin.js"

const router = express.Router()



router.get('/profile', isAdmin , getAdminProfile )
router.get('/users' , isAdmin , getAllusers)
router.post('/posts' , isAdmin , createPost)
export {router as adminRoutes}