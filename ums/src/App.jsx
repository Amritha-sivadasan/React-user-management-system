import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./Pages/admin/Login";
import Dashboard from "./Pages/admin/Dashboard";
import UserLayout from "./Pages/userLayout";
import AddUser from "./Pages/admin/AddUser";
import AdminLayout from "./Pages/admin/AdminLayout";
import EditUser from "./Pages/admin/EditUser";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route
          path="/"
          element={
            <UserLayout>
              {" "}
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <UserLayout>
              {" "}
              <SignIn />
            </UserLayout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <UserLayout>
              {" "}
              <SignUp />
            </UserLayout>
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/profile"
            element={
              <UserLayout>
                <Profile />
              </UserLayout>
            }
          ></Route>
        </Route>
      </Routes>

      <Routes>
        
        
     
        <Route path="/admin" element={  <AdminLayout><Login /></AdminLayout>} />
        <Route path="/admin/home" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/addUser" element={<AdminLayout><AddUser/></AdminLayout>} />
        <Route path="/admin/edit/:id" element={<AdminLayout> <EditUser/></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
