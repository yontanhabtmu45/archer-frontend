import React from "react";
import "../../App.css";
import "./styles/custom.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <section className="about-banner">
        <div className="container-fluid main-container-about">
          <div className="row main-about ">
            <div className="col-md-12 banner-cars">
              <h1 className="banner-title">About Us</h1>
              <div className="links">
                <Link to="/" className="pr-2">
                  Home{" "}
                </Link>{" "}
                <span className="pr-2"> / </span> About
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="service">
        <div className="container mt-2 ">
          <div className="row">
            <div className="col-12 text-center p-4  mb-3">
              <h2>Our Services</h2>
            </div>
            <div className="col-12 col-md-6  service-image">
              <div className=" service-image ">
                <div className="service-item text-center">
                  <HandshakeOutlinedIcon className="service-icon" />
                  <h3>Wholesale Solutions</h3>
                </div>
              </div>
              <div className="service-image">
                <div className="service-item text-center">
                  <SettingsOutlinedIcon className="service-icon" />
                  <h3>Quality Assurance</h3>
                </div>
              </div>
              <div className="service-image">
                <div className="service-item text-center">
                  <HandymanOutlinedIcon className="service-icon" />
                  <h3>Expert Consultation</h3>
                </div>
              </div>
              <div className="service-image">
                <div className="service-item text-center">
                  <AccessTimeOutlinedIcon className="service-icon" />
                  <h3>Timely Delivery</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="choose-us">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-3">
              <h2>Why Choose Us?</h2>
            </div>
            <div className="col-12 col-md-6 pr-5 choose-us-content">
              <p>
                At Archer Wholesale, we prioritize customer satisfaction and
                quality. Our team is dedicated to providing you with the best
                products and services in the industry.
              </p>
            </div>
            <div className="col-12 col-md-6 choose-us-image"></div>
          </div>
        </div>
      </section>
      <section className="call-us">
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-12 pr-5 call-us-content ">
              <p>
                <h3>Have questions or need assistance?</h3> <br />
                Our team is here to help you.
              </p>
              <h2>Contact Us</h2>
              <button className="call-us-button mt-3">
                <a href="/contact">
                  Get in Touch
                  <ArrowRightAltOutlinedIcon className="call-us-icon" />
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
