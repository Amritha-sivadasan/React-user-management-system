import express from "express";
import {
  adminLogin,
  dashboard,
  addUser,
  deleteuser,
  edituserData,
  edituser,
} from "../controller/adminController.js";
import { verifyToken } from "../utils/verifyAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/dashboard", verifyToken, dashboard);
adminRouter.post("/addUser", verifyToken, addUser);
adminRouter.get("/delete/:id", verifyToken, deleteuser);
adminRouter.get("/user/:id", edituserData);
adminRouter.post("/editUser/:id", edituser);

export default adminRouter;
