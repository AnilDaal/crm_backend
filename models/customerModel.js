import mongoose from "mongoose";
import validator from "validator";
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Enter a valid email ");
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
  },
  phone: {
    type: String,
    validate(value) {
      if (value < 1) throw new Error("Enter positive age");
    },
    required: true,
  },
  country: {
    type: String,
    enum: ["India", "USA", "UK", "Dubai", "Germany"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
