import React from "react";
import Logo from "../../../assets/Natty Logo.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <>
      <footer className="main_footer">
        <div className="container">
          <div className="row">
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-pin">
                      <LocationOnOutlinedIcon style={{ color: "#f7f4e7" }} />
                    </span>
                  </div>
                  <div className="text">
                    {" "}
                    Addis Ababa, <br /> Ethiopia
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-mail">
                      <EmailOutlinedIcon style={{ color: "#f7f4e7" }} />
                    </span>
                  </div>
                  <div className="text color-white">
                    Email us : <br />{" "}
                    <a href="mailto:contact.contact@autorex.com">
                      support@archer.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-phone">
                      <PhoneOutlinedIcon style={{ color: "#f7f4e7" }} />
                    </span>
                  </div>
                  <div className="text">
                    Call us on : <br />
                    <strong>+ 251 947 520 352</strong>
                  </div>
                </div>
              </div>
            </div>
            <hr className="color-white p-2" />
            <div className="col-md-12 col-lg-9 logo_section">
              <div className="footer-logo-section">
                <div className="footer-logo-title">
                  <img
                    src={Logo}
                    alt="Archer Wholesale Logo"
                    className="footer-logo"
                  />
                  <div>
                    <h1>
                      <span className="first">Archer</span> <br />
                      <span className="second">Wholesale</span>
                    </h1>
                    <p className="footer_description">
                      Archer Wholesale delivers top-quality vehicles and
                      construction steels with reliability and affordability.
                    </p>
                  </div>
                  <div className="footer-social-links mt-3">
                  <ul className="social-links">
                    <li>
                      <a target="_blank" href="#">
                        <span className="fab fa-facebook-f">
                          <FacebookOutlinedIcon />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://www.instagram.com/nathy_zemedani/">
                        <span className="fab fa-linkedin-in">
                          <InstagramIcon />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <span className="fab fa-twitter">
                          <LinkedInIcon />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://t.me/Natiman2337">
                        <span className="fab fa-instagram">
                          <TelegramIcon />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="footer-links">
                  <h2>Quick Links</h2>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/cars">cars</a>
                    </li>
                    <li>
                      <a href="/steels">Construction Steels</a>
                    </li>
                    <li>
                      <a href="/about">About Us</a>
                    </li>
                    <li>
                      <a href="/contact">Contact</a>
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 privacy_section">
              <div className="text-center">
                <p className="text-center">
                  &copy; {new Date().getFullYear()} Archer Wholesale. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
