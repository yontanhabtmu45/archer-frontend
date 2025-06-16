import React, { useState } from "react";
import "./styles/custom.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { cars } from "../components/Cards/CarsList";
import CarsCard from "../components/Cards/CarsCard";

const CAR_PAGE_SIZE = 6;

function Cars() {
  const [page, setPage] = useState(1);

  const paginatedCars = cars.slice(0, page * CAR_PAGE_SIZE);

  const handleLoadMore = () => setPage(page + 1);

  return (
    <>
      <div className="container-fluid main-container-cars">
        <div className="row main-cars ">
          <div className="col-md-12 banner-cars">
            <h1 className="banner-title">Cars</h1>
            <div className="links">
              <Link to="/" className="pr-2">
                Home{" "}
              </Link>{" "}
              <span className="pr-2"> / </span> Cars
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search vehicles by name , model, year, etc."
              />
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="row main-cars-card">
          <div className="card-container col-10 m-5">
            {paginatedCars.map((car) => (
              <div className="card-cars mb-3" key={car.id}>
                <CarsCard car={car} className="card-info" />
              </div>
            ))}
            {paginatedCars.length < cars.length && (
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cars;
