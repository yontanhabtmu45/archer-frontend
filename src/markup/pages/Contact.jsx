import React from "react";
import "./styles/custom.css";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function Contact() {
  return (
    <>
      <div className="container-fluid main-container-contact">
        <div className="row main-contact ">
          <div className="col-md-12 banner-cars">
            <h1 className="banner-title">Contact Us</h1>
            <div className="links">
              <Link to="/" className="pr-2">
                Home{" "}
              </Link>{" "}
              <span className="pr-2"> / </span> Contact
            </div>
          </div>
        </div>
        <div className="container contact-content">
          <div className="row">
            <div className=" col-md-12 text-center contact-header">
              <h2 className="text-center">Get in Touch</h2>
              <p className="text-center">
                We would love to hear from you! Please fill out the form below
                to reach us.
              </p>
            </div>
          </div>
          <div className="justify-content-center mt-5 contact-form-container">
            <h2>Contact Us</h2>
            <form className="contact-form ">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
