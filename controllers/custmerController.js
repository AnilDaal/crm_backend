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
        res.send("done...")
    } catch (error) {
        console.log(error.message);
    }
}
const getCustomer = async function(req,res){
    try {
        const result = await Customer.find()
        res.send(result)
    } catch (error) {
        console.log(error.message);
    }
}
export default {
    insertCustomer,
    getCustomer
}