import express from "express";
import customerController from "../controllers/custmerController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// add customer
router
  .route("/")
  .post(auth.authBoth, customerController.addCustomer)
  .get(auth.authBoth, customerController.getCustomer);

// get customer
// router.get('/customer',auth.authBoth,customerController.getCustomer)
// router.get("/customer/:customerId", customerController.getSingleCustomer);
router
  .route("/:customerId")
  .get(customerController.getSingleCustomer)
  .put(auth.authBoth, customerController.updateCustomer)
  .delete(auth.authBoth, customerController.deleteCustomer);
// update customer
// router.put('/customer/:customerId',auth.authBoth,customerController.updateCustomer)

// delete customer
// router.delete('/customer/:customerId',auth.authBoth,customerController.deleteCustomer)

export default router;
