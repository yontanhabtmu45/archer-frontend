import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./markup/components/Footer/Footer";
import Header from "./markup/components/Header/Header";

import Home from "./markup/pages/Home";
import Cars from "./markup/pages/Cars";
import Steels from "./markup/pages/Steels";
import About from "./markup/pages/About";
import Contact from "./markup/pages/Contact"
import Login from "./markup/pages/Login";
import Four04 from "./markup/pages/Four04";
import Admin from "./markup/pages//admin/Admin";

// Importing CSS files for styling
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Importing icons
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

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
          <Route path="/admin" element={<Admin />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
