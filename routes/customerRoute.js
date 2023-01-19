import express from "express"
import customerController from "../controllers/custmerController.js"

const router = express()

// add customer 
router.post('/add_customer',customerController.insertCustomer)

// get customer
router.get('/get_customer',customerController.getCustomer)

// update customer
router.put('/update_customer/:customerId',customerController.updateCustomer)

// delete customer
router.delete('/delete_customer/:customerId',customerController.deleteCustomer)


router.get('*',(req,res)=>{
    res.redirect('/')
})

export default {
    router
}


