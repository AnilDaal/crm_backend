import express from "express"
import employeeController from "../controllers/employeeController.js"
import auth from "../middlewares/auth.js"

const router = express()

// create employee
router.post('/employee',auth,employeeController.addEmployee)

// read employee
router.get('/employee',auth,employeeController.getEmployee)
router.get('/employee/:employeeId',auth,employeeController.getSingleEmployee)
// router.get('employee/varify/:employeeId',employeeController.varifymail)

// update employee
router.put('/employee/:employeeId',auth,employeeController.updateEmployee)

// delete employee
router.delete('/employee/:employeeId',auth,employeeController.deleteEmployee)

// signup
// router.post('/employee/signup',employeeController.singupEmployee)

//login 
router.post('/employee/signin',employeeController.loginEmployee)
export default router