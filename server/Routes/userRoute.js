import express from "express";
import { test, updateUser, deleteUser } from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination : ", file);
    cb(null, "server/uploads");
  },
  filename: function (req, file, cb) {
    console.log("req.file : multer ", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// router.get("/", test);
router.post(
  "/update/:id",
  verifyToken,
  upload.single("profilepicture"),
  updateUser
);
router.delete("/delete/:id", verifyToken, deleteUser);


export default router;
