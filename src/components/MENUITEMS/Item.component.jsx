import React from 'react';
import './item.styles.css';

import Button from '../Button/button.component';


const MenuItem = (props) => {



    return (
        <div className="item">
            <img src={props.imageUrl}/>
            <h4 className="name">{props.name}</h4>

            <div className="itemdescription">
                <span>{props.price}$</span>
                <Button handleClick={props.handleClick} clear>Order</Button>
            </div>

        </div>
    );
};


export default MenuItem;