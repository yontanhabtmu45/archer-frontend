import React, { useEffect, useState } from "react";
import "./styles/custom.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { steels } from "../components/Cards/SteelsList";
import CardsSteel from "../components/Cards/CardsSteel";
import axios from "../../api/axios";
import Loader from "../components/Loader/Loader";
import CurrencyFormat from "../components/CurrencyFormat/CurrencyFormat";

function Steels() {
  const [steels, setSteels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/steels")
      .then((res) => {
        console.log(res.data.data);
        setSteels(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load steels");
        setIsLoading(false);
      });
  }, []);

  const filteredSteels = steels.filter((steel) =>
    [steel.steel_type]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid main-container-cars">
        <div className="row main-steels ">
          <div className="col-md-12 banner-cars">
            <h1 className="banner-title">Steels</h1>
            <div className="links">
              <Link to="/" className="pr-2">
                Home{" "}
              </Link>{" "}
              <span className="pr-2"> / </span> Steels
            </div>
            <div className="search-bar">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search steels by type or category"
              />
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="row main-container-steels">
          <div className=" m-5">
            <div className="card-steels  col-12 mb-3">
              {isLoading && <Loader />}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {!isLoading && filteredSteels.length === 0 && (
                <p>No vehicles found for "{searchTerm}".</p>
              )}
              {filteredSteels.map((steel) => (
                <div className="card-cars mb-3" key={steel.steel_id}>
                  <div className="card text-center">
                    <div>
                      <img
                        src={`http://localhost:2716/images/${steel.steel_image}`}
                        alt={steel.steel_type}
                        style={{
                          width: "300px",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h2>{steel.steel_type}</h2>
                    <p>Weight/ton: {steel.steel_weight}</p>
                    <small className="card-price">
                      <CurrencyFormat amount={steel.steel_price_per_ton} /> Birr
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Steels;
