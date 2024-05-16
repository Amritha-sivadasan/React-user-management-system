import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const [userName, setUserName] = useState("");
  const [email, setemail] = useState("");
  const [err, setErr] = useState("");

  const { id } = useParams();

  const naviagte = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/admin/user/${id}`)
      .then((res) => {
        setUserName(res.data.userName);
        setemail(res.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/admin/editUser/${id}`, { userName, email })
      .then((res) => {
        if (res.data.success) {
          naviagte("/admin/home");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleClick = (e) => {
    e.preventDefault();
    naviagte(`/admin/home`);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Edit user</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          defaultValue={userName}
          type="text"
          id="userName"
          placeholder="UserName"
          className="bg-slate-100 rounded-lg p-3"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          defaultValue={email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={(e) => setemail(e.target.value)}
        />

        <button className="bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          UPDATE
        </button>
        <button onClick={handleClick}>Back</button>
      </form>
    </div>
  );
}
