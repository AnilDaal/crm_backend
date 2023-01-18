import emplyeeController from "../controllers/employeeController.js"
import express from "express"
import employeeController from "../controllers/employeeController.js"

const router = express()

router.get('/get_employee',employeeController.getEmployee)
router.post('/add_employee',employeeController.insertEmployee)

export default {
     router
}