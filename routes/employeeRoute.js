import emplyeeController from "../controllers/employeeController.js"
import express from "express"
import employeeController from "../controllers/employeeController.js"

const router = express()

// read employee
router.get('/get_employee',employeeController.getEmployee)

// create employee
router.post('/add_employee',employeeController.insertEmployee)

// update employee
router.put('/update_employee',employeeController.updateEmployee)

// delete employee
router.delete('delete_employee',employeeController.deleteEmployee)

export default {
     router
}