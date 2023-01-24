import express from "express"
import customerController from "../controllers/custmerController.js"

const router = express()

// add customer 
router.post('/customer',customerController.addCustomer)

// get customer
router.get('/customer',customerController.getCustomer)
router.get('/customer/:customerId',customerController.getSingleCustomer)

// update customer
router.put('/customer/:customerId',customerController.updateCustomer)

// delete customer
router.delete('/customer/:customerId',customerController.deleteCustomer)

export default router


