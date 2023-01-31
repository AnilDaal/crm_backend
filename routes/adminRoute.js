import express from "express"
import adminController from "../controllers/adminController.js"
import auth from "../middlewares/auth.js"

const router = new express.Router

// get admin
router.get('/admin/',adminController.getAdmin)
// add admin login 
router.post('/admin/login',adminController.adminLogin)

// admin logout
router.post('/admin/logout',auth.authAdmin,adminController.adminLogout)

// add admin signup
router.post('/admin/signup',adminController.adminSignup)

export default router