import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../app/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isLogged } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLogged) {
      navigate("/admin/home");
    }
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/admin/login", formData)
      .then((res) => {
        const { admin, admintocken } = res.data;
        localStorage.setItem("adminToken", admintocken);
        localStorage.setItem("adminId", admin._id);
        dispatch(adminLogin(admin));
        navigate("/admin/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">sign In</h1>
      <p className="text-red-700 mt-5 mb-7 text-center"></p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="name"
          id="name"
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
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Login
        </button>
      </form>
      <div className="flex  gap-3 mt-5"></div>
    </div>
  );
}
