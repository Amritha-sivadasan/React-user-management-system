import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/home");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    axios
      .post("/api/admin/addUser", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        navigate("/admin/home");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Add User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          //   defaultValue={currentUser.userName}
          type="text"
          id="userName"
          placeholder="UserName"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          //   defaultValue={currentUser.email}
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
          ADD
        </button>
        <button onClick={handleClick}>Back</button>
      </form>
    </div>
  );
}
