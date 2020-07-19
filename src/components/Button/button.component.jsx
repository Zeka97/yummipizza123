import React from 'react';
import './button.styles.css';


const Button = (props) => {


    return(
        <button onClick={props.handleClick} className={`${props.clear ? "clearall" : ""} dugme`}>{props.children}</button>
    );
}

export default Button;