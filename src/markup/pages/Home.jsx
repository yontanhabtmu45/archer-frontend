import React from "react";
import vehicles from "../../assets/template_assets/banner/UI design for vechiels.png";
import Steels from "../../assets/template_assets/banner/removed steel.png";
import about from "../../assets/template_assets/banner/about home.png";
import Suzuki from "../../assets/template_assets/banner/banner1.jpg";

import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

function Home() {
  return (
    <>
      <section className="home-banner">
        <div className="home-banner-content">
          <h1>Welcome to Archer Wholesale</h1>
          <p>
            Your trusted partner for vehicles and construction steels. Quality,
            reliability, and affordability.
          </p>
          <button id="home-banner-button">
            <a href="/cars">Browse Cars</a>
          </button>
        </div>
      </section>
      <section className="featured-products">
        <div className="container mt-3 ">
          <div className="row  cards">
            <div className="col-12 text-center">
              <h2>Featured Products</h2>
            </div>
            <div className="featured-car col-5 mr-5 ">
              <div>
                <div className="featured-product-image">
                  <img
                    src={vehicles}
                    alt="Featured Vehicle"
                    className="img-fluid"
                  />{" "}
                  <br />
                </div>
              </div>
              <span>
                <b>Br.2,500,000</b> <br /> <br />
              </span>
              <div className="featured-product-description">
                <p>
                  Discover our latest vehicle offerings, designed for comfort
                  and performance.
                </p>
                <button>
                  <a href="/cars">View Vehicles</a>
                </button>
              </div>
            </div>

            <div className="featured-steel col-5">
              <div>
                <div className="featured-product-image">
                  <img
                    src={Steels}
                    alt="Featured Construction Steels"
                    className="img-fluid pt-4"
                  />
                </div>
              </div>
              <span>
                <b>Br.570 / T</b> <br /> <br />
              </span>
              <div className="featured-product-description">
                <p>
                  Discover our high-quality construction steels, perfect for all
                  your building needs.
                </p>
                <button>
                  <a href="/steels">View Steels</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-12 text-center pt-4">
              <h2>About Us</h2>
            </div>
            <div className="col-12 col-md-6 pr-5 about-content">
              <p>
                Archer Wholesale is your premier destination for high-quality
                vehicles and construction steels. We are committed to providing
                our customers with the best products at competitive prices.
                <button className="about-button mt-3">
                  <a href="/about">Learn More</a>
                </button>
              </p>
            </div>
            <div className="col-12 col-md-6 about-image">
              <img src={about} alt="home-car" />
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
            <div className="col-12 col-md-6 choose-us-image">
              {/* <img
                src={Suzuki}
                alt="Choose Us"
                className="img-fluid"
              /> */}
            </div>
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

export default Home;
