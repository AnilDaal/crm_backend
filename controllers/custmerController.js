import Customer from"../models/customerModel.js"
const addCustomer = async function(req,res){
    const {name,email,date,status,phone,country,address} = req.body
    if(!name || !email || !date || !status || !phone || !country || !address)
    return res.status(401).json({message:"Please fill mandatory field"})
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
        if(!getCust)
        return res.status(201).json({message:"please add customers"})
        res.status(201).json(getCust)
    } catch (error) {
        res.status(501).json({message:error})
    }
}
const getSingleCustomer= async function(req,res){
    try {
        const customerId = req.params.customerId
        const getSingleCust = await Customer.findById(customerId)
        if(!getSingleCust)
        return res.status(401).json({message:"please enter a valid customer"})
        res.status(201).json(getSingleCust)
    } catch (error) {
        res.status(501).json({message:error})
    }
}

const updateCustomer = async(req,res)=>{
    const {name,email,date,status,phone,country,address} = req.body
    if(!name || !email || !date || !status || !phone || !country || !address)
    return res.status(401).json({message:"Please fill mandatory field"})
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
        const deleteCust = await Customer.findByIdAndDelete(customerId)
        if(!deleteCust)
        return res.status(401).json({message:"please enter a valid customer"})
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