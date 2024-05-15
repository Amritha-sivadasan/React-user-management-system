import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../app/admin/adminSlice.js";
import axios from "axios";

export default function AdminHeader() {
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = () => {
    localStorage.removeItem("adminToken");
    dispatch(adminLogout());
    navigate("/admin");
  };
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          {" "}
          <h1 className="font-bold">Beauty app</h1>
        </Link>

        <ul className="flex gap-4">
          {admin ? <li>{admin.name}</li> : "Welcome to Admin"}

          {admin ? <button onClick={handlelogout}>logout</button> : ""}
        </ul>
      </div>
    </div>
  );
}