import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    // let token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.CRM_Admin;
    if (token) {
      let adminData = jwt.verify(token, process.env.Secretkey);
      // we define the user id property in req. function
      req.adminId = adminData.id;
      req.admin = adminData.user;
    } else {
      return res.status(402).json({ message: "token not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const authEmp = async (req, res, next) => {
  try {
    const token = req.cookies.CRM_Emp;
    // let token = req.headers.authorization.split(" ")[1];
    if (token) {
      const employeeData = jwt.verify(token, process.env.SecretkeyEmp);

      req.employeeId = employeeData.id;
      req.employee = employeeData.user;
    } else {
      return res.status(402).json({ message: "token not found" });
    }
    next();
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export default {
  authAdmin,
  authEmp,
};
