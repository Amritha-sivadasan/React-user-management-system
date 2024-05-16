import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../app/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("data", data);
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      const token = data.token;
      const userId = data.user._id;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      dispatch(signInSuccess(data.user));
      Navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">sign In</h1>
      <p className="text-red-700 mt-5 mb-7 text-center">
        {error ? error.message || "Something went wrong!" : ""}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex  gap-3 mt-5">
        <p>Don't Have an Account?</p>
        <Link to="/sign-up">
          {" "}
          <span className="text-blue-500">Create an Account</span>
        </Link>
      </div>
    </div>
  );
}
