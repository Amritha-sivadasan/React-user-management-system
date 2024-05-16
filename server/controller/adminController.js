import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res, next) => {
  console.log(req.body);
  const { name, password } = req.body;
  try {
    const adminexist = await Admin.findOne({ name });
    console.log(adminexist);
    if (!adminexist) {
      return res.status(401).json({ success: false });
    }
    if (password !== adminexist.password) {
      return res.status(401).json({ success: false });
    }
    const admintocken = jwt.sign(
      { id: adminexist._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("hgfjsdfjs");
    console.log(adminexist._doc);
    const { password: _, ...rest } = adminexist._doc;
    res.status(200).json({ admintocken, admin: rest });
  } catch (error) {
    console.log(error);
  }
};

export const dashboard = async (req, res) => {
  try {
    const users = await User.find().sort({_id:-1})
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.findOne({ userName });
    const existEmail = await User.findOne({ email });
    console.log(req.body);
    if (user) {
      return res.json({ success: false, message: "UserName Already exist" });
    }
    if (existEmail) {
      return res.json({ success: false, message: "Email Already exist" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter valid password" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteuser = async (req, res) => {
  try {
    const deleteduser = await User.deleteOne({ _id: req.params.id });
    console.log(deleteduser);
    res.status(200).json("user deleted");
  } catch (error) {
    console.log(error);
  }
};

export const edituserData = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const edituser = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, email } = req.body;
    const update = await User.updateOne(
      { _id: id },
      { $set: { userName: userName, email: email } }
    );
    res.json({ success: true });
  } catch (error) {}
};
