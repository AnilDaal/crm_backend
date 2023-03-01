import express from "express";
import customerController from "../controllers/custmerController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// add customer
router
  .route("/")
  .post(auth.authAdmin, customerController.addCustomer)
  .get(auth.authAdmin, customerController.getCustomer);

// get customer
// router.get('/customer',auth.authBoth,customerController.getCustomer)
// router.get("/customer/:customerId", customerController.getSingleCustomer);
router
  .route("/:customerId")
  .get(auth.authAdmin, customerController.getSingleCustomer)
  .put(auth.authAdmin, customerController.updateCustomer)
  .delete(auth.authAdmin, customerController.deleteCustomer);
// update customer
// router.put('/customer/:customerId',auth.authBoth,customerController.updateCustomer)

// delete customer
// router.delete('/customer/:customerId',auth.authBoth,customerController.deleteCustomer)

export default router;
