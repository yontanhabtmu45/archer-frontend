import React from 'react'
import "./styles/custom.css";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <>
      <div className="container-fluid main-container-contact">
        <div className="row main-contact ">
          <div className="col-md-12 banner-cars">
            <h1 className="banner-title">Contact Us</h1>
            <div className="links">
              <Link to="/" className="pr-2">Home </Link> <span className="pr-2"> / </span> Contact
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

export default Contact