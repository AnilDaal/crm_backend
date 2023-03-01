import express from "express";
import adminController from "../controllers/adminController.js";
import taskController from "../controllers/taskController.js";
import auth from "../middlewares/auth.js";

const router = new express.Router();

// get admin
// router.get("/admin/", adminController.getAdmin);
// add admin login
router.route("/login").post(adminController.adminLogin);
router.route("/logout").post(adminController.adminLogout);
// admin logout
// router.post("/logout", auth.authAdmin, adminController.adminLogout);

// add admin signup
// router.route("/signup").post(adminController.adminSignup);

router.route("/getalltask").get(auth.authAdmin, taskController.getAllTask);

export default router;
