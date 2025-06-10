import React from "react";

function Home() {
  return (
    <section className="home-banner">
      <div className="home-banner-content">
        <h1>Welcome to Archer Wholesale</h1>
        <p>
          Your trusted partner for vehicles and construction steels. Quality, reliability, and affordability.
        </p>
        <button id="home-banner-button">
          <a href="/cars">Browse Cars</a>
        </button>
      </div>
    </section>
  );
}

export default Home;