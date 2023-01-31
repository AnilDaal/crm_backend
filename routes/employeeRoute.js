import express from "express"
import employeeController from "../controllers/employeeController.js"
import auth from "../middlewares/auth.js"
import taskController from "../controllers/taskController.js"

const router = express()

// create employee
router.post('/employee',employeeController.addEmployee)

// read employee
router.get('/employee',auth.authAdmin,employeeController.getEmployee)
router.get('/employee/:employeeId',auth.authAdmin,employeeController.getSingleEmployee)
// router.get('employee/varify/:employeeId',employeeController.varifymail)

// update employee
router.put('/employee/:employeeId',auth.authAdmin,employeeController.updateEmployee)

// asign task to employee
router.post('/employee/:employeeId/addTask',auth.authAdmin,taskController.addTask)

// get task for employee
router.get('/employee/:employeeId/getTask',auth.authBoth,taskController.getTask)

// delete employee
router.delete('/employee/:employeeId',auth.authAdmin,employeeController.deleteEmployee)

// signup
// router.post('/employee/signup',employeeController.singupEmployee)

//login 
router.post('/employee/login',employeeController.loginEmployee)

//logout
router.post('/employee/logout',auth.authEmp,employeeController.logout)
export default router