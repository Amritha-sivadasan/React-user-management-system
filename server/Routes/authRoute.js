import express from "express";
import { signUp,signIn, signout } from "../controller/authController.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signin", signIn);
router.get("/signout", signout);

export default router;
