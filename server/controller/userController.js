import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";

export const test = (req, res) => {
  res.json({
    message: "Api is working",
  });
};

export const updateUser = async (req, res, next) => {
  try {
    let updateFields = {
      userName: req.body.userName,
      email: req.body.email,
    };
    if (req.file) {
      updateFields.profilepicture = req.file.filename;
    }
    if (req.body.password !== "undefined") {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      updateFields.password = req.body.password;
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateFields },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.json({ user: rest });
  } catch (error) {}
};

export const deleteUser = async (req, res, next) => {
  try {
    console.log("params", req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (error) {
    next(error);
  }
};


