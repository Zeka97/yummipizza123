import React from 'react';
import './inputforma.styles.css';


const InputForma = (props) => {
    return(

    
    <input className="inputforma" type={props.type} placeholder={props.placeholder} required={props.required} />
    );
}

export default InputForma