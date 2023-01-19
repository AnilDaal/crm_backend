import express from "express"
import employeeController from "../controllers/employeeController.js"

const router = express()

// create employee
router.post('/employee',employeeController.addEmployee)

// read employee
router.get('/employee',employeeController.getEmployee)
router.get('/employee/:employeeId',employeeController.getSingleEmployee)

// update employee
router.put('/employee/:employeeId',employeeController.updateEmployee)

// delete employee
router.delete('/employee/:employeeId',employeeController.deleteEmployee)

export default {
     router
}