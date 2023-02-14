import mongoose from "mongoose";
import express from "express";
import customerRoute from "./routes/customerRoute.js";
import cors from "cors";
import employeeRoute from "./routes/employeeRoute.js";
import dotenv from "dotenv";
import adminRoute from "./routes/adminRoute.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const port = process.env.PORT || 5000;
const app = express();
dotenv.config();
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

app.use("/api/v1/employee", employeeRoute);
app.use("api/v1/admin", adminRoute);
app.use("api/v1/customer", customerRoute);
app.get("/api/v1/", (req, res) => {
  res.status(201).json({ message: "hello world" });
});

app.listen(port, () => {
  console.log(`server running on ${port}...`);
});
