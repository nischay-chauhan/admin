import express from "express"
import authenticateUser from "../middleware/authMiddleware.js"
import isAdmin from "../middleware/isAdmin.js"
import { getAdminProfile , getAllusers } from "../controllers/admin.js"

const router = express.Router()



router.get('/profile', isAdmin , getAdminProfile )
router.get('/users' , isAdmin , getAllusers)

export {router as adminRoutes}