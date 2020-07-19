import React from 'react';
import './foodicon.styles.css';

const FoodIcon = (props) => {
    return(
    <div className="foodicon" tabIndex={props.index} onClick={() => props.handleClick(props.category)}>
        <img src={props.ikon} alt="ikona" />
        <p>{props.description}</p>
    </div>
    );
}

export default FoodIcon;