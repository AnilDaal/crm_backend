import Customer from"../models/customerModel.js"
const addCustomer = async function(req,res){
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
const getSingleCustomer= async function(req,res){
    try {
        const customerId = req.params.customerId
        const result = await Customer.findById(customerId)
        res.json(result)
    } catch (error) {
        console.log(error.message)
    }
}

const updateCustomer = async(req,res)=>{
    try {
        const customerId = req.params.customerId
        await Customer.findByIdAndUpdate(customerId,{$set:{
            name:req.body.name,
            email:req.body.email,
            status:req.body.status,
            phone:req.body.phone,
            country:req.body.country,
            address:req.body.address
        }},{new:true})
        res.send("update...")
    } catch (error) {
        console.log(error.message);       
    }
}
const deleteCustomer = async(req,res)=>{
    try {
        const customerId = req.params.customerId
        console.log(customerId);
        await Customer.findByIdAndDelete(customerId)
        res.send("delete...")
    } catch (error) {
        console.log(error.message);
    }
}
export default {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer,
    getSingleCustomer
}