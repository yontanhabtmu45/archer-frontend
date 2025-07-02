import React, { useEffect, useState } from "react";
import "./styles/custom.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { cars } from "../components/Cards/CarsList";
// import CarsCard from "../components/Cards/CarsCard";
import Loader from "../components/Loader/Loader";
import axios from "../../api/axios";
import CurrencyFormat from "../components/CurrencyFormat/CurrencyFormat";

// const CAR_PAGE_SIZE = 6;

function Cars() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // const paginatedCars = cars.slice(0, page * CAR_PAGE_SIZE);

  // const handleLoadMore = () => setPage(page + 1);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/vehicles")
      .then((res) => {
        console.log(res.data.data);
        setVehicles(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load vehicles");
        setIsLoading(false);
      });
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) =>
    [vehicle.vehicle_model, vehicle.vehicle_tag, vehicle.vehicle_type]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid main-container-cars ">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vehicles by name , model, year, etc."
              />
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="row main-cars-card">
          <div className=" m-5">
            <div className="card-steels  col-12 mb-3">
              {isLoading && <Loader />}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {!isLoading && filteredVehicles.length === 0 && (
                <p>No vehicles found for "{searchTerm}".</p>
              )}

              {filteredVehicles.map((vehicle) => (
                <div className="card-cars mb-3  d-flex justify-center align-center" key={vehicle.vehicle_id}>
                  <div className="card text-center">
                    <div>
                      <img
                        src={`https://backend-archer.onrender.com/images/${vehicle.vehicle_image}`}
                        alt={vehicle.vehicle_model}
                        // loading="lazy"
                        style={{
                          width: "300px",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h2>{vehicle.vehicle_model}</h2>
                    <p>{vehicle.vehicle_tag}</p>
                    <small className="card-price">
                      <CurrencyFormat amount={vehicle.vehicle_total_price} />{" "}
                      Birr
                    </small>
                    <h4 className='vehicle-type'>{vehicle.vehicle_type}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* {paginatedCars.length < cars.length && (
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cars;
