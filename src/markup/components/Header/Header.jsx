import React, {useState} from "react";
import Logo from "../../../assets/Natty Logo.png";
import icon from "../../../assets/template_assets/icons/icon-bar.png";
// Import the login service to access the logout function
import { logOut as logOutService } from "../../../services/login.service.jsx";// Import the custom context hook
import { useAuth } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";

function Header() {
  // Use the custom hook to access the data in the context
    const { isLogged, setIsLogged, admin } = useAuth();


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Log out event handler function
      const logOut = () => {
        // Call the logout function from the login service
        logOutService();
        // Set the isLogged state to false
        setIsLogged(false);
      };

    // handle mobile menu toggle
    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        document.body.classList.toggle("mobile-menu-visible", !mobileMenuOpen);
    };

    // handle close mobile menu
    const handleCloseMobileMenu = () => {
        setMobileMenuOpen(false);
        document.body.classList.remove("mobile-menu-visible");
    };


  return (
    <>
      <header className="main_header">
        <a href="/">
          <div className="header_logo">
            <img src={Logo} alt="Archer Wholesale Logo" />
            <div className="header_title">
              <h1>
                <span className="first">Archer</span> <br />{" "}
                <span className="second">Wholesale</span>
              </h1>
            </div>
          </div>
        </a>
        <div className="header_nav">
          {/* Desktop Nav */}
          <nav className={`desktop-nav ${mobileMenuOpen ? "hide-on-mobile" : ""}`}>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/cars">cars</a></li>
              <li><a href="/steels">Construction Steels</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/Admin">Admin</a></li>
            </ul>
          <button className="p-2 pl-4 pr-4 m-3">
          {isLogged ? (
                  <div>
                    <Link
                      to="/"
                      onClick={logOut}
                    >
                      Log out
                    </Link>
                  </div>
                ) : (
                  <div className="link-btn">
                    <Link to="/login" >
                      Login
                    </Link>
                  </div>
                )}
          </button>
          </nav>
          {/* Mobile Menu Button */}
          <div className="mobile-menu-button mr-3" onClick={handleMobileMenuToggle}>
            <img src={icon} alt="Menu" />
          </div>
        </div>
        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-nav-overlay">
            <div className="mobile-nav">
              <button className="close-mobile-menu" onClick={handleCloseMobileMenu}>
                &times;
              </button>
              <ul>
                <li><a href="/" onClick={handleCloseMobileMenu}>Home</a></li>
                <li><a href="/cars" onClick={handleCloseMobileMenu}>cars</a></li>
                <li><a href="/steels" onClick={handleCloseMobileMenu}>Construction Steels</a></li>
                <li><a href="/about" onClick={handleCloseMobileMenu}>About Us</a></li>
                <li><a href="/contact" onClick={handleCloseMobileMenu}>Contact</a></li>
                <li><a href="/Admin" onClick={handleCloseMobileMenu}>Admin</a></li>
                <li><a href="/login" onClick={handleCloseMobileMenu}>Login</a></li>
              </ul>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header;
