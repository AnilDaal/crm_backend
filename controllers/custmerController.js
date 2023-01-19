import { get, set } from "mongoose"
import Customer from"../models/customerModel.js"
const insertCustomer = async function(req,res){
    try {
        const customer = new Customer({
            name:req.body.name,
            email:req.body.email,
            date:req.body.date,
            status:req.body.status,
            phone:req.body.phone,
            country:req.body.country,
            address:req.body.address
        })         
        const customerData = await customer.save()
        res.send("insert...")
    } catch (error) {
        console.log(error.message);
    }
}
const getCustomer = async function(req,res){
    try {
        const result = await Customer.find()
        res.json(result)
    } catch (error) {
        console.log(error.message);
    }
}

const updateCustomer = async(req,res)=>{
    try {
        const customerId = req.params.customerId
        Customer.findByIdAndUpdate({_id:customerId},$set:{
            name:req.body.name,
            email:req.body.email,
            date:req.body.date,
            status:req.body.status,
            phone:req.body.phone,
            country:req.body.country,
            address:req.body.address
        },{new:true})
        res.send("update...")
    } catch (error) {
        console.log(error.message);       
    }
}
const deleteCustomer = async(req,res)=>{
    try {
        const customerId = req.params.customerId
        Customer.findByIdAndDelete({_id:customerId})
        res.send("delete...")
    } catch (error) {
        console.log(error.message);
    }
}
export default {
    insertCustomer,
    updateCustomer,
    getCustomer
}