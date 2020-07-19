import React from 'react';

import './paymentitems.styles.css';

const PaymentItem = (props) => {
    return(
    <div className="paymentitem">
        <h5>{props.name}</h5>
        <h5>{props.quantity}</h5>
        <h5>{Number(props.price) * Number(props.quantity)} $</h5>


    </div>
    );
}

export default PaymentItem;