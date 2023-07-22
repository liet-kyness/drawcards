import React from "react";

function Card({ name, image }) {
    return (
        <img
            src={image}
            alt={name}
            className="Card"
        />
    );
}

export default Card;