import express from "express"
import customerController from "../controllers/custmerController.js"

const router = express()

router.post('/add_customer',customerController.insertCustomer)
router.get('/get_customer',customerController.getCustomer)

export default {
    router
}


