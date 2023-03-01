import Employee from "../models/employeeModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// mail varify
// const mailvarify = async (email,name,userId)=>{
//     try {
//     const transfer = nodemailer.createTransport({
//         host:'smtp.'
// secure:false,
// requireTLS:true,
// auth:{
//     user:'anildaal7@gmail.com',
//     pass:'__'
//     // port:587,
// }
// })
//     const mailOption = {
//             from:'anildal7@gmail.com',
//             to:email,
//             subject:"for varification",
//             html:'<p> Hii '+name+', please check <a href="localhost/varify?id" '
//         }
//         transfer.sendMail(mailOption,(error,info)=>{
//             if(error)
//             console.log(error);
//             else
//             console.log(info.response);
//         })
//     } catch (error) {
//         console.log(error.message);
//     }

// }
// const varifymail = async (req,res)=>{
//     try {
//         const employeeId = req.params.employeeId
//         const varifydone = await Employee.findByIdAndUpdate(employeeId,{set:{isVarified:1}})

//     } catch (error) {
//         console.log(error.message);
//     }
// }
const addEmployee = async function (req, res) {
  const { name, email, phone, role, address, country, password, isAdmin } =
    req.body;
  if (!name || !email || !password || !role || !phone || !country || !address) {
    return res.status(401).json({ message: "Please fill mandatory field" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const addEmp = await Employee.create({
      name,
      email,
      phone,
      role,
      address,
      country,
      isAdmin,
      password: hashPassword,
    });
    // const employeeData = await employee.save()
    res.status(201).json(addEmp);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const getEmp = await Employee.find();
    res.status(201).json(getEmp);
  } catch (error) {
    res.status(503).json({ message: error.message });
  }
};
const getSingleEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const getSingleEmp = await Employee.findById(employeeId);
    if (!getSingleEmp) {
      return res.status(401).json({ message: "invalid employee id" });
    }
    res.status(201).json(getSingleEmp);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { name, email, phone, role, address, country, password } = req.body;
  const employeeId = req.params.employeeId;
  if (!name || !email || !password || !role || !phone || !country || !address) {
    return res.status(401).json({ message: "Please fill mandatory field" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const updateEmp = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $set: {
          name,
          email,
          phone,
          role,
          address,
          country,
          password: hashPassword,
        },
      },
      { new: true }
    );
    res.status(201).json(updateEmp);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    if (!employeeId) {
      return res.status(401).json({ message: "please enter a valid employee" });
    }
    const deleteEmp = await Employee.findByIdAndDelete(employeeId);
    res.status(201).json(deleteEmp);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
// const singupEmployee = async (req,res)=>{
//     const {email,password,name,role,phone,address,country} = req.body
//     try {
//         const existedEmp = await Employee.findOne({email})
//         if(existedEmp){
//             return res.status(401).json({message:"all ready user existed"})
//         }
//     const salt  = await bcrypt.genSalt(10)
//     const passwordHash = await bcrypt.hash(password,salt)
//     const userData = await Employee.create({
//         name,
//         email,
//         phone,
//         role,
//         address,
//         country,
//         password:passwordHash
//     })
//     const token = await jwt.sign({email: userData.email ,id: userData._id},process.env.Secretkey)
//     res.status(201).json({token})

// } catch (error) {
//         res.status(501).json({message:error})
// }
// }
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "Enter email or password" });
  }
  try {
    const userData = await Employee.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "wrong user " });
    }
    const hashPassword = await bcrypt.compare(password, userData.password);
    if (!hashPassword) {
      return res.status(404).json({ message: "password wrong" });
    }
    // token generated
    const token = await jwt.sign(
      { id: userData._id, user: userData },
      process.env.SecretkeyEmp,
      {
        expiresIn: "5d",
      }
    );
    res.cookie("CRM_Emp", token, {
      expires: new Date(Date.now() + 1000 * 3600),
      httpOnly: true,
    });

    res.status(201).json(token);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

const employeeLogout = async (req, res) => {
  try {
    // req.employee.tokens = await req.employee.tokens.filter((elem) => {
    //   return elem.token != req.employeeId;
    // });
    // await req.employee.save()
    res.clearCookie("CRM_Emp");
    res.status(201).json({ message: "logout done.." }).end();
  } catch (error) {
    res.status(504).json({ message: error.message });
  }
};

export default {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getSingleEmployee,
  loginEmployee,
  employeeLogout,
};
