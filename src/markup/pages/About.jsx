import React from "react";
import "../../App.css";
import "./styles/custom.css";
import { Link } from "react-router-dom";
import about from "../../assets/template_assets/banner/about home.png";
import vehicle from "../../assets/Images/vehicles/vehicle5.jfif";

import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

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
                  Home
                </Link>
                <span className="pr-2"> / </span> About
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 text-center p-2 mt-5 mb-3 ">
          <h2 className="mb-5 banner-about-header">
            Welcome to Archer Wholesale
          </h2>
          <div className="about-banner-image ">
            <h5 className="p-5 about-banner-text">
              Your trusted partner for vehicles and construction steels. We are
              committed to delivering high-quality products and exceptional
              service to our customers. With years of experience in the
              wholesale industry, we understand the needs of our clients and
              strive to exceed their expectations. Our team is dedicated to
              providing you with the best products at competitive prices. We
              take pride in our extensive range of vehicles and construction
              steels, ensuring that we meet the diverse needs of our clients.
              Whether you are looking for reliable vehicles or durable
              construction steels, Archer Wholesale has got you covered. We
              believe in building long-term relationships with our customers by
              offering top-notch products and services. Our commitment to
              quality and customer satisfaction sets us apart in the industry.
              Thank you for choosing Archer Wholesale as your trusted partner.
            </h5>
            <div className="about-banner-image">
              <img src={vehicle} alt="vehicle" />
            </div>
          </div>
        </div>
      </section>
      <section className="about mb-5">
        <div className="container mt-5 ">
          <div className="row ">
            <div className="col-12 text-center pt-4">
              <h2> More About Us</h2>
            </div>

            <div className="col-12 col-md-6 pr-5 about-content">
              {/* <p>
                Archer Wholesale is your premier destination for high-quality
                vehicles and construction steels. We are committed to providing
                our customers with the best products at competitive prices. 
              </p> */}
              <p>
                Our extensive range of products ensures that we meet the diverse
                needs of our clients. With a focus on quality and customer
                satisfaction, we strive to be the leading wholesale provider in
                the industry. Whether you are looking for reliable vehicles or
                durable construction steels, Archer Wholesale has got you
                covered.
                {/* Our team is dedicated to delivering exceptional service
                and building long-term relationships with our customers. */}
                {/* Thank
                you for choosing Archer Wholesale as your trusted partner in
                wholesale solutions. */}
                {/* We look forward to serving you with the
                highest standards of quality and service. Explore our range of
                products and discover why Archer Wholesale is the preferred
                choice for wholesale vehicles and construction steels. Contact
                us today to learn more about our offerings and how we can assist
                you in your wholesale needs. We are here to help you find the
                right products at the right prices, ensuring your satisfaction
                every step of the way. Join us on this journey and experience the
                Archer Wholesale difference. Your success is our priority, and we
                are committed to providing you with the best wholesale solutions
                in the market. Together, let's build a brighter future with
                quality vehicles and construction steels that stand the test of
                time. Thank you for choosing Archer Wholesale, where quality and
                service come first. We are excited to partner with you and help
                you achieve your wholesale goals. Explore our website to learn
                more about our products, services, and how we can support your
                business. We are just a click away, ready to assist you with all
                your wholesale needs. Contact us today and let us show you why
                Archer Wholesale is the trusted name in wholesale vehicles and
                construction steels. We look forward to serving you and being a
                part of your success story. Together, we can achieve great
                things in the wholesale industry. Thank you for choosing Archer
                Wholesale, where your satisfaction is our mission. We are here to
                provide you with the best wholesale solutions and ensure that you
                receive the highest quality products and services. Let's embark
                on this journey together and make your wholesale experience
                exceptional. Welcome to Archer Wholesale, where excellence meets
                reliability in wholesale vehicles and construction steels. */}
              </p>
            </div>
            <div className="col-12 col-md-6 ">
              {/* <img src={about} alt="home-car" /> */}
              <div className="about-content">
                <p>
                  Archer Wholesale is dedicated to delivering top-notch
                  wholesale solutions. Our extensive range of products includes
                  vehicles and construction steels, ensuring that we meet the
                  diverse needs of our clients. With a focus on quality and
                  customer satisfaction, we strive to be the leading wholesale
                  provider in the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="service">
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
      </section> */}
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
