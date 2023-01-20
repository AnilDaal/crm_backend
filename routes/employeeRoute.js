import express from "express"
import employeeController from "../controllers/employeeController.js"
import session from "express-session"
import secretkey from "../config/config.js"

const router = express()

// create employee
router.post('/employee',employeeController.addEmployee)

// read employee
router.get('/employee',employeeController.getEmployee)
router.get('/employee/:employeeId',employeeController.getSingleEmployee)
// router.get('employee/varify/:employeeId',employeeController.varifymail)

// update employee
router.put('/employee/:employeeId',employeeController.updateEmployee)

// delete employee
router.delete('/employee/:employeeId',employeeController.deleteEmployee)

// signup
router.post('/employee/signup',employeeController.singupEmployee)
//login 
router.post('/employee/signin',employeeController.loginEmployee)
export default {
     router
}