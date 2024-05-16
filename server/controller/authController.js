import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.findOne({ userName });
    const existEmail = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "UserName Already exist" });
    }
    if (existEmail) {
      return res.json({ success: false, message: "Email Already exist" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (!existUser) return next(errorHandler(401, "User not found"));
    const validPassword = bcryptjs.compareSync(password, existUser.password);

    if (!validPassword) return next(errorHandler(401, "Wrong Password"));
    const token = jwt.sign(
      { id: existUser._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: hashedPassword, ...rest } = existUser._doc;
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 360000),
    //   })
    //   .status(200)
    //   .json(rest);

    res.status(200).json({ token, user: rest });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    localStorage.removeItem("token").status(200).json("Signout successfully");
  } catch (error) {
    next(error);
  }
};
