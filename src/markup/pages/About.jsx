import React from 'react'
import "./styles/custom.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="container-fluid main-container-about">
        <div className="row main-about ">
          <div className="col-md-12 banner-cars">
            <h1 className="banner-title">About Us</h1>
            <div className="links">
              <Link to="/" className="pr-2">Home </Link> <span className="pr-2"> / </span> About
            </div>
          </div>
        </div>
          <div>
            <h1>Here</h1>
          </div>
      </div>
    </>
  )
}

export default About