import express from "express";
import employeeController from "../controllers/employeeController.js";
import auth from "../middlewares/auth.js";
import taskController from "../controllers/taskController.js";
import custmerController from "../controllers/custmerController.js";

const router = express.Router();

// create employee
// router.post('/employee',employeeController.addEmployee)
router
  .route("/")
  .get(auth.authAdmin, employeeController.getEmployee)
  .post(auth.authAdmin, employeeController.addEmployee);

// read employee
// router.get('/employee',auth.authAdmin,employeeController.getEmployee)
// router.get(
//   "/employee/:employeeId",
//   auth.authAdmin,
//   employeeController.getSingleEmployee
// );
router
  .route("/:employeeId")
  .get(auth.authAdmin, employeeController.getSingleEmployee)
  .put(auth.authAdmin, employeeController.updateEmployee)
  .delete(auth.authAdmin, employeeController.deleteEmployee);
// router.get('employee/varify/:employeeId',employeeController.varifymail)

router
  .route("/:employeeId/customer")
  .post(auth.authEmp, custmerController.addEmployeeCustomer)
  .get(auth.authEmp, custmerController.getEmployeeCustomer);
router
  .route("/:employeeId/customer/:customerId")
  .put(auth.authEmp, custmerController.updateEmployeeCustomer)
  .delete(auth.authEmp, custmerController.deleteEmployeeCustomer);
// update employee
// router.put(
//   "/employee/:employeeId",
//   auth.authAdmin,
//   employeeController.updateEmployee
// );

// asign task to employee
router
  .route("/:employeeId/addTask")
  .post(auth.authAdmin, taskController.addTask);

// get task for employee
router.route("/:employeeId/getTask").get(taskController.getEmployeeTask);
// add team mates
router
  .route("/:employeeId/addTeamMate/:taskId")
  .put(auth.authAdmin, taskController.addTeamMate);

router
  .route("/:employeeId/updateTask/:taskId")
  .put(auth.authAdmin, taskController.updateEmployeeTask);
// delete employee
// router.delete(
//   "/employee/:employeeId",
//   auth.authAdmin,
//   employeeController.deleteEmployee
// );

// signup
// router.post('/employee/signup',employeeController.singupEmployee)

//login
router.route("/login").post(employeeController.loginEmployee);

//logout
// router.route("/logout").post(auth.authEmp, employeeController.logout);
export default router;
