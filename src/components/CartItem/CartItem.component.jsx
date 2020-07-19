import React from 'react';

import './CartItem.styles.css';


const CartItem = (props) => {



    return (
        <div className="cartitem">
            <img src={props.imageUrl}/>
            <h4 className="cartitemname">{props.name}</h4>
            <span onClick={props.decrement}>{"<"}</span><span>{props.quantity}</span><span onClick={props.increment}>{">"}</span>

                <p className="price">{props.price * props.quantity}$</p>

            <span onClick={props.removeitem} className="remove">&#10005;</span>

        </div>
    );
};


export default CartItem;