import mongoose from "mongoose";
import express from "express";
import customerRoute from "./routes/customerRoute.js";
import cors from "cors";
import employeeRoute from "./routes/employeeRoute.js";
import dotenv from "dotenv";
import adminRoute from "./routes/adminRoute.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";
//   res.status(err.statusCode).json({
//     message: err.message,
//     status: err.status,
//   });
//   next();
// });

mongoose.set("strictQuery", false);
mongoose.connect(process.env.Mongo_Data, () => {
  console.log("mongoose connected");
});

app.use("/api/employee", employeeRoute);
app.use("/api/admin", adminRoute);
app.use("/api/customer", customerRoute);
app.get("/api", (req, res) => {
  res.status(201).json({ message: "hello India" });
});

app.listen(port, () => {
  console.log(`server running on ${port}...`);
});
