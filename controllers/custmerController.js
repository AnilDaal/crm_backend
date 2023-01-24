import Customer from"../models/customerModel.js"
const addCustomer = async function(req,res){
    const {name,email,date,status,phone,country,address} = req.body
    try {
        const addCust = await Customer.create({
            name,
            email,
            date,
            status,
            phone,
            country,
            address
        })         
        res.status(201).json(addCust)
    } catch (error) {
       res.status(501).json({message:error})
    }
}
const getCustomer = async function(req,res){
    try {
        const getCust = await Customer.find()
        res.status(201).json(getCust)
    } catch (error) {
        res.status(501).json({message:error})
    }
}
const getSingleCustomer= async function(req,res){
    try {
        const customerId = req.params.customerId
        const getSingleCust = await Customer.findById(customerId)
        res.status(201).json(getSingleCust)
    } catch (error) {
        res.status(501).json({message:error})
    }
}

const updateCustomer = async(req,res)=>{
    const {name,email,date,status,phone,country,address} = req.body
    try {
        const customerId = req.params.customerId
        const updateCust = await Customer.findByIdAndUpdate(customerId,{$set:{
            name,
            email,
            date,
            status,
            phone,
            country,
            address
        }},{new:true})
        res.status(201).json(updateCust)
    } catch (error) {
        res.status(501).json({message:error})    
    }
}
const deleteCustomer = async(req,res)=>{
    try {
        const customerId = req.params.customerId
        console.log(customerId);
        const deleteCust = await Customer.findByIdAndDelete(customerId)
        res.status(201).json(deleteCust)
    } catch (error) {
        res.status(501).json({message:error})
    }
}
export default {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer,
    getSingleCustomer
}