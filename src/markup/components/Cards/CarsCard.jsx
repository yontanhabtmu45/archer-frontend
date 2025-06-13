import React from "react";
import "../../pages/styles/custom.css";
import { Link } from "react-router-dom";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";

function CarsCard({ car }) {
  return (
    <div className="card text-center">
      <img src={car.imgLink} alt={car.name} />
      <h3>{car.name}</h3>
      <p>
        Year: <em>{car.year}</em>
      </p>
      <p className="card-price">
        Price: 
        Br.
      </p>
        <CurrencyFormat amount={car.price} className=" price"/>
    </div>
  );
}

function CarsList({ cars }) {
  return (
    <div className="cards-horizontal">
      {cars.map(car => <CarsCard key={car.id} car={car} />)}
    </div>
  );
}

export default CarsList;
