import React from 'react';
import './orderpage.styles.css';
import InputForma from '../../components/InputForma/InputForma.component';
import PaymentItem from '../../components/paymentitems/paymentitems.compontent';
import Button from '../../components/Button/button.component';

import logo from '../../icons/logofirm.png'


const OrderPage = ({cart, backtopage, total,totalitemsincart, setSearchfield, setCart}) => {



    const PayNow = () =>{
        alert("Thank you for using our services");
        setSearchfield({
            input:'',
            order:false
        });
        setCart({
            cartItems:[],
            total:0,
            items:0
        })
    }

    return(
        <div className="orderpage">
            <div className="backgroundpicture">
                </div>
            <form onSubmit={() => PayNow()} className="orderforma">
                <div className="returntopage" onClick={backtopage}>{"<Back to main page"}</div>

                <div className="orderlogo">
                    <img src={logo} alt="logo"/>
                </div>

                <h3>Delivery info</h3>

                <div className="paymentform">

                    <InputForma type="text" placeholder="Name"  required/>
                    <InputForma type="text" placeholder="Surname" required/>
                    <InputForma type="text" placeholder="Adress" required/>
                    <InputForma type="number" placeholder="Telephone" required/>
                    <InputForma type="number" placeholder="Card-number: xxxx-xxxx-xxxx-xxxx" required />
                    <InputForma type="number" placeholder="EXP.Date" required />
                    <InputForma type="number" placeholder="Security number" required/>
                </div>
                <div className="descriptiongrid">
                    <span>Name</span>
                    <span>Qty</span>
                    <span>Price</span>
                </div>
                {
                    cart.map(item => {
                        return(
                        <PaymentItem key={item[0].id} id={item[0].id} name={item[0].name} quantity={item[0].quantity} price={item[0].price} />
                        )
                    })
                }
                <div className="deliveryprice">
                    <h3>Delivery</h3>
                    {
                            totalitemsincart >= 7
                            ?
                            <span>0$</span>
                            :
                            <span>6$</span>
                        }
                </div>


                <div className="totalpriceandpaybutton">
                    {totalitemsincart >= 7
                    ?
                    <h3>TOTAL: {total}$</h3>
                    :
                    <h3>TOTAL: {total + 6}$</h3>
                    }
                    <Button onSubmit clear>PAY NOW</Button>
                </div>
            </form>

        </div>
    )
};


export default OrderPage;