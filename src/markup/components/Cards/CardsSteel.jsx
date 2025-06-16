import React from "react";
import "../../pages/styles/custom.css";
import { Link } from "react-router-dom";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";

function CardsSteel({ steel }) {
    return (
        <div className="card text-center">
            <img src={steel.img} alt={steel.name} loading="lazy" />
            <h3>{steel.name}</h3>
            <p>
                Yield: <em>{steel.yield}</em> MPa
            </p>
            <p className="card-price">
                Price per ton: 
                Br.
            </p>
                <CurrencyFormat amount={steel.price} className="price" />
        </div>
    );
}

export default CardsSteel;