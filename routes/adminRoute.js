import express from "express"
import adminController from "../controllers/adminController.js"

const router = express()

// add admin login 
router.post('/admin/login',adminController.adminLogin)

// add admin signup
router.post('/admin/signup',adminController.adminSignup)

export default router