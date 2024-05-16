import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const Navigate = useNavigate();
  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         if(formData.userName.trim()==""){
             setErr("Please Enter valid Name")
             return
         }
         console.log(formData.email);
         if(formData.email.trim()==""){
          setErr("Please Enter valid email")
             return
         }
         if(formData.password.trim()=="" || formData.password.length<8){
          setErr("Please Enter valid Password .It should be minimum 8 characters")
             return
         }

         

      setLoading(true);
      // setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);

      if (data.success === false) {
      setErr(data.message)
        return;
      }
      Navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      // setError(true);
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">sign up</h1>
      <p className="text-red-700 mt-5 mb-7 text-center">
        {/* {error && "Something went wrong!"} */}
        {err}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="userName"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
       
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex  gap-3 mt-5">
        <p>Have an Account?</p>
        <Link to="/sign-in">
          {" "}
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
