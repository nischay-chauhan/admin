import express from "express"
import authenticateUser from "../middleware/authMiddleware.js"
import isAdmin from "../middleware/isAdmin.js"
import { getAdminProfile } from "../controllers/admin.js"

const router = express.Router()



router.get('/profile', isAdmin , getAdminProfile )

export {router as adminRoutes}