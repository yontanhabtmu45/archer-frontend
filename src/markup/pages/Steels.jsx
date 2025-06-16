import React from "react";
import "./styles/custom.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { steels } from "../components/Cards/SteelsList";
import CardsSteel from "../components/Cards/CardsSteel";

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
          <div className="row main-container-steels">
            <div className=" m-5">
              <div className="card-steels  col-10 mb-3">
                {
                  steels.map((steel) => (
                      <CardsSteel key={steel.id} steel={steel} className="card-info" />
                  ))
                }
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Steels;
