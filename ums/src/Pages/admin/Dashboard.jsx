import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      axios
        .get("/api/admin/dashboard", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);
  const handleDelete = (id) => {
    const token = localStorage.getItem("adminToken");
    axios
      .get(`/api/admin/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(true);
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };
   
  const filteredUsers = users.filter((val) =>
    val.userName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex justify-between mb-4">
        <Link to="/admin/addUser">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add User
          </button>
        </Link>
        <input
          type="search"
          placeholder="Search by User Name"
          className="border border-gray-300 px-4 py-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {searchTerm=="" ?users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">
                {user.userName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(user._id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">
                {user.userName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(user._id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        
        </tbody>
      </table>
    </div>
  );
}
