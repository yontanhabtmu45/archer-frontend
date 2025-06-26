import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./assets/template_assets/style/custom.css";
import Footer from "./markup/components/Footer/Footer";
import Header from "./markup/components/Header/Header";

import Home from "./markup/pages/Home";
import Cars from "./markup/pages/Cars";
import Steels from "./markup/pages/Steels";
import About from "./markup/pages/About";
import Contact from "./markup/pages/Contact";
import Login from "./markup/pages/Login";
import Four04 from "./markup/pages/Four04";
import Dashboard from "./markup/pages/admin/Dashboard";
import Unauthorized from "./markup/pages/Unauthorized";
import AddAdmin from "./markup/pages/admin/AddAdmin";
import AddVehicle from "./markup/pages/admin/AddVehicle";
import AddSteel from "./markup/pages/admin/AddSteel";
import AdminsList from "./markup/components/Admin/AdminsList/AdminsList";
import VehicleList from "./markup/components/Admin/VehicleList/VehicleList";
import SteelList from "./markup/components/Admin/SteelList/SteelList";

// Importing CSS files for styling
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";


import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import EditAdmin from "./markup/components/Admin/AdminsList/EditAdmin";
import EditVehicle from "./markup/components/Admin/VehicleList/EditVehicle"
import EditSteel from "./markup/components/Admin/SteelList/EditSteel";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/steels" element={<Steels />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<Four04 />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* <Route path="/admin" element={<Dashboard />} /> */}
        {/* // Add the Dashboard Route  */}
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Dashboard />
            </PrivateAuthRoute>
          }
        />
        {/* add the AddAdmin Route */}
        <Route path="/admin/admins" element={<AdminsList />} />
        <Route
          path="/admin/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditAdmin />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-admin"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddAdmin />
            </PrivateAuthRoute>
          }
        />
        {/* add the AddVehicle Route */}
        <Route path="/admin/vehicles" element={<VehicleList />} />
        <Route path="/admin/vehicle/:id" element={
          <PrivateAuthRoute roles={[2, 3]}>
            <EditVehicle />
          </PrivateAuthRoute>
        } />
        <Route
          path="/admin/add-vehicle"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddVehicle />
            </PrivateAuthRoute>
          }
        />
        {/* add the AddSteel Route */}
        <Route path="/admin/steels" element={<SteelList />} />
        <Route path="/admin/steel/:id" element={
          <PrivateAuthRoute roles={[2, 3]}>
            <EditSteel />
          </PrivateAuthRoute>
        } />
        <Route
          path="/admin/add-steel"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddSteel />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
