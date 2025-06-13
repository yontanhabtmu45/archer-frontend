import React from "react";
import "./styles/custom.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function Cars() {
  return (
    <>
      <div className="container-fluid main-container-cars">
        <div className="row main-cars ">
          <div className="col-md-12 banner-cars">
            <h1 className="banner-title">Cars</h1>
            <div className="links">
              <Link to="/" className="pr-2">Home </Link> <span className="pr-2"> / </span> Cars
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search vehicles by name , model, year, etc." />
              <SearchIcon />
            </div>
          </div>
        </div>
          <div className="card-container">
            <h1>Here</h1>
          </div>
      </div>
    </>
  );
}

export default Cars;
