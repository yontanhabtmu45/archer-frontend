import React from "react";
import "./styles/custom.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function Steels() {
  return (
    <>
      <div className="container-fluid main-container-steels">
        <div className="row main-steels ">
          <div className="col-md-12 banner-cars">
            <h1 className="banner-title">Steels</h1>
            <div className="links">
              <Link to="/" className="pr-2">Home </Link> <span className="pr-2"> / </span> Steels
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search steels by name, type , or category" />
              <SearchIcon />
            </div>
          </div>
        </div>
          <div>
            <h1>Here</h1>
          </div>
      </div>
    </>
  );
}

export default Steels;
