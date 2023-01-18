import express from "express"
import customerController from "../controllers/custmerController.js"
import bodyParser from "body-parser"

const router = express()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))


router.post('/add_customer',customerController.insertCustomer)
router.get('/customer',customerController.getCustomer)

export default {
    router
}


