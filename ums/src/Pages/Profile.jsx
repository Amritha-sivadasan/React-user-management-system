import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} from "../app/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userName: currentUser.userName,
    email: currentUser.email,
    password: currentUser.password,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (selectFile) {
      formdata.append("profilepicture", selectFile);
    }
    formdata.append("userName", formData.userName);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    

    dispatch(updateUserStart());
    axios
      .post(`api/user/update/${currentUser._id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
          "User-Id": userId


        },
      })
      .then((res) => {
        dispatch(updateUserSuccess(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        dispatch(updateUserFailure(err));
      });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        headers: { Authorization: token },
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      dispatch(deleteUserFailure(err));
    }
  };
  const handleSignout = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          id="profilepicture"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        <img
          src={
            image
              ? image
              : `http://localhost:3000/${currentUser.profilepicture}`
          }
          alt="profile"
          className="h-24 w-24 self-center rounded-full object-cover cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <input
          defaultValue={currentUser.userName}
          type="text"
          id="userName"
          placeholder="UserName"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        {" "}
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>{" "}
        <span onClick={handleSignout} className="text-blue-600 cursor-pointer">
          Signout
        </span>{" "}
      </div>
    </div>
  );
}
