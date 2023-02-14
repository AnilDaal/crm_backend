import express from "express";
import adminController from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";

const router = new express.Router();

// get admin
// router.get('/admin/',adminController.getAdmin)
// add admin login
router.post("/login", adminController.adminLogin);

// admin logout
// router.post("/logout", auth.authAdmin, adminController.adminLogout);

// add admin signup
router.post("/signup", adminController.adminSignup);

export default router;
