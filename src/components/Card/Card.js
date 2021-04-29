import React, {useState} from "react";

import './Card.css';

const Card = (props) => {

    return (

            <div className={ props.selected ? "card cardSelected" : "card"} onClick={props.customClick}>
                <div className="card-body">
                    {props.cardText}
                </div>
            </div>
    )
}

export default Card;