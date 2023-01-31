import express from "express"
import customerController from "../controllers/custmerController.js"
import auth from "../middlewares/auth.js"

const router = express()

// add customer 
router.post('/customer',auth.authAdmin,customerController.addCustomer)

// get customer
router.get('/customer',auth.authBoth,customerController.getCustomer)
router.get('/customer/:customerId',customerController.getSingleCustomer)

// update customer
router.put('/customer/:customerId',auth.authBoth,customerController.updateCustomer)

// delete customer
router.delete('/customer/:customerId',auth.authBoth,customerController.deleteCustomer)

export default router


