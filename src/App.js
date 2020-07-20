import React,{ useState } from 'react';
import logo from './icons/logofirm.png';
import allfoodsicon from './icons/allfoodsicon.png';
import pizzaicon from './icons/pizzaicon.png';
import fishicon from './icons/fishicon.png';
import veganicon from './icons/veganicon.png';
import deserticon from './icons/deserticon.png';
import burgericon from './icons/burgericon.png';
import drinksicon from './icons/drinks.png';
import approxtime from './icons/approxtime.png';

import Button from './components/Button/button.component';
import FoodIcon from './components/foodIcon/foodicon.component';

import {FOOD_MENU} from './FoodList/FOOD_MENU';

import MenuItem from './components/MENUITEMS/Item.component';
import CartItem from './components/CartItem/CartItem.component';

import './App.css';
import OrderPage from './pages/OrderPage/orderpage.component';

const App = () => {

  const[openshoppingcart,setOpenshoppingcart] = useState({
    hidden:false
  })

  const[searchfield,setSearchfield] = useState({
    input:'',
    order:false
  })

  const[sameids,setSameids] = useState({
    aresame:false,
    index:'',
  })

  const[cart,setCart] = useState({
    cartItems:[],
    total:0,
    items:0
  })

  const[menu,setMenu] = useState({
    mainmenu:FOOD_MENU.MENU
  });
/* ----------------- filter po iconi ----------------------- */
  const handleClick = (value) => {
    let filteredMenu = FOOD_MENU.MENU.filter(item => (item.category == value));
    setMenu({
      mainmenu:filteredMenu
    })
  };
  /* ------------------ ALL PRODUCTS FILTER ----------------- */

  const handleClickAllProducts = () => {
    setMenu({
      mainmenu:FOOD_MENU.MENU
    })
  };
  /*----------------INPUT CHANGE --------*/

  const handleChangeInput = (e) => {
    setSearchfield({
      input:e.target.value,
      order:false
    })
  };
  /*--------------REMOVE ALL PRODUCTS ----------------- */
  const  removeAllProducts = () => {
    setCart({
      cartItems:[],
      total:0,
      items:0
    });
  };



  /*--------------- DODAVANJE U CART -------------------- */
  const Order = (item,index) => {
    if(cart.cartItems.length)
    {
    cart.cartItems.map((ITEM,INDEX) =>{
      
      if(ITEM[0].id == item.id)
      {
        sameids.aresame=true;
        sameids.index=INDEX;
      }
    })
  }
console.log(sameids);

    if(sameids.aresame)
    {
      cart.cartItems[sameids.index][0].quantity = cart.cartItems[sameids.index][0].quantity + 1;
      setCart({
        cartItems: cart.cartItems,
        total: cart.total + Number(cart.cartItems[sameids.index][0].price),
        items: cart.items + 1
      });
      setSameids({
        aresame:false,
        index:''
      })
    }

    else {
    setCart({
      cartItems:[...cart.cartItems,menu.mainmenu.filter(cart => cart.id == item.id)],
      total: cart.total + Number(menu.mainmenu.filter(cart => cart.id == item.id).map(item => item.price)),
      items: cart.items + 1
    })
  }
  
  }

  /*--------------- BRISANJE ITEMA ---------------- */

  const RemoveItem = (index) => {
    let quantity = cart.cartItems[index][0].quantity;
    cart.cartItems[index][0].quantity = 1;

    let removed = cart.cartItems.splice(index, 1)
    console.log(removed[0][0].price);

    if(quantity == 0)
    {
        setCart({
          cartItems: cart.cartItems,
          total: cart.total - removed[0][0].price,
          items: cart.items - 1
          })
    }
    else {
      setCart({
        cartItems: cart.cartItems,
        total: cart.total - (Number(removed[0][0].price) * Number(quantity)),
        items: cart.items - Number(quantity)
        })
    }
  }
  /*------------------- INCREMENT ----------------*/

  const Increment = (index) => {
      cart.cartItems[index][0].quantity = Number(cart.cartItems[index][0].quantity + 1);

      setCart({
        cartItems: cart.cartItems,
        total: cart.total + Number(cart.cartItems[index][0].price),
        items: cart.items + 1
      })
  }

 /*------------------ DECREMENT ------------- */

 const Decrement = (index) => {
    if(cart.cartItems[index][0].quantity == 1)
    {
      RemoveItem(index);
    }
    else{
        cart.cartItems[index][0].quantity = Number(cart.cartItems[index][0].quantity -1)
        setCart({
          cartItems: cart.cartItems,
          total:cart.total - Number(cart.cartItems[index][0].price),
          items:cart.items - 1
        })
    }
 }

/*-------------------- BACK TO PAGE ----------------- */
const backtoPage = () => {
  setSearchfield({
    input:'',
    order:false
  })
};

/*----------------- Checking if there are items in cart ----------- */

const goToOrderPage = () => {
  if(cart.items != 0)
  {
    setSearchfield({
      input:'',
      order:true,
      message:null
    });
  }
  else {
    setSearchfield({
      input:'',
      order: false,
      message:'Please add some items to cart to proceed to the payment'
    })
  }
}


/*--------------------PRIKAZI KORPU------------------*/

const PrikaziKorpu = () => {
  setOpenshoppingcart({
    hidden: !openshoppingcart.hidden
  });
};


if(searchfield.order == false)
{
  return (
    <div className="App">
        <div className="header">
        <img className="logo" src={logo} alt="asd"/>
        <div className="carticonmobilever" onClick={() => PrikaziKorpu() }><span>{cart.items}</span></div>
        </div>
        <div className="mainpagedisplay">

  {/*-----------------------------------------FULLSCREEN DISPLAY -------------------------------------- */}


          <div className="menudisplay">
            <div className="mainpicture">

                <h3>Find Healthy And <br/> Favourite Foods <br/>Near you</h3>

            </div>
            <div className="titleandsearchbar">
                <h3>Choose what to eat today!</h3>
                <input type="text" onChange={(e) => handleChangeInput(e)} placeholder="Search"></input>

            </div>

            <div className="foodiconsmenu">
              <FoodIcon index={1} ikon={allfoodsicon} description="All"  handleClick={() => handleClickAllProducts()}/>
              <FoodIcon index={2} ikon={pizzaicon} description="Pizza" category="PIZZA" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={3} ikon={fishicon} description="Fish" category="FISH" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={4} ikon={veganicon} description="Vegan" category="VEGAN" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={5} ikon={deserticon} description="Desert" category="DESERT" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={6} ikon={burgericon} description="Burger" category="BURGER" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={7} ikon={drinksicon} description="Drinks" category="DRINKS" handleClick={(value) => handleClick(value)} />
            </div>

            <div className="menuitems">
            {
              menu.mainmenu.filter(item => item.name.toLowerCase().includes(searchfield.input.toLowerCase())).map((item,index) =>{
               return <MenuItem key={item.id} id={item.id} name={item.name} imageUrl={item.imageUrl} price={item.price} handleClick={() => Order(item,index)} />
              })

            }
            </div>

          </div>


 {/*---------------------------------------MOBILE DISPLAY ---------------------------------------------*/}


        {!openshoppingcart.hidden
      ?
          <div className="mobilemenudisplay">
            <div className="mobilemainpicture">

                <h3>Find Healthy And <br/> Favourite Foods <br/>Near you</h3>

            </div>
            <div className="mobiletitleandsearchbar">
                <h3>Choose what to eat today!</h3>
                <input type="text" onChange={(e) => handleChangeInput(e)} placeholder="Search"></input>

            </div>

            <div className="mobilefoodiconsmenu">
              <FoodIcon index={1} ikon={allfoodsicon} description="All"  handleClick={() => handleClickAllProducts()}/>
              <FoodIcon index={2} ikon={pizzaicon} description="Pizza" category="PIZZA" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={3} ikon={fishicon} description="Fish" category="FISH" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={4} ikon={veganicon} description="Vegan" category="VEGAN" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={5} ikon={deserticon} description="Desert" category="DESERT" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={6} ikon={burgericon} description="Burger" category="BURGER" handleClick={(value) => handleClick(value)} />
              <FoodIcon index={7} ikon={drinksicon} description="Drinks" category="DRINKS" handleClick={(value) => handleClick(value)} />
            </div>

            <div className="mobilemenuitems">
            {
              menu.mainmenu.filter(item => item.name.toLowerCase().includes(searchfield.input.toLowerCase())).map((item,index) =>{
               return <MenuItem key={item.id} id={item.id} name={item.name} imageUrl={item.imageUrl} price={item.price} handleClick={() => Order(item,index)} />
              })

            }
            </div>

          </div>
          :
          null
      }








          { /*------------------------------------- MOBILE CART DISPLAY -------------------------------- */}
          

          {
          openshoppingcart.hidden
          ?
          <div className="mobilecartdisplay">
            <div className="mobileordertitleandicon">
                <h3>Your Order</h3>
                <div className="mobilecartimage" onClick={() => PrikaziKorpu()}><span>{cart.items}</span></div>
            </div>
            <div className="mobileremoveallitems" onClick={() => removeAllProducts()}>
              <div>
                  <span>CLEAR ALL</span>
              </div>
              <div className="mobileapproxtime">
                <span>Your Order...</span>
                <div><img src={approxtime} alt="mobiletimeikonica" />30 min</div>
              </div>

            </div>

            <div className="mobilecartitems">
              <div className="mobilecartitemsheader">
                
              </div>
            {
              cart.cartItems.map((item,index) =>(
                <CartItem 
                key={item[0].id} 
                id={item[0].id} 
                name={item[0].name} 
                imageUrl={item[0].imageUrl} 
                price={item[0].price} 
                quantity={item[0].quantity} 
                removeitem={() => RemoveItem(index)}
                increment={() => Increment(index)}
                decrement={() => Decrement(index)} />
              ))
            }
            </div>

            <div className="mobileTotalpriceandfinishorder">
              <h3>TOTAL:</h3>
              <h3>{cart.total}$</h3>
              <Button handleClick={() => goToOrderPage()} clear>Finish</Button>
            </div>

            {
              searchfield.message ?
              <h3 className="mobileproceedmessage">/*{searchfield.message}*/</h3>
              :
              null

            }
            <p className="mobiledeliverypricemessage">For 7x products and more: DELIVERY FREE</p>


          </div>
          :
          null
              }

        {/*------------------------FULLSCREEN CART--------------------------------------------- */}

          <div className="cartdisplay">
            <div className="ordertitleandicon">
                <h3>Your Order</h3>
                <div className="cartimage"><span>{cart.items}</span></div>
            </div>
            <div className="removeallitems" onClick={() => removeAllProducts()}>
              <div>
                  <span>CLEAR ALL</span>
              </div>
              <div className="approxtime">
                <span>Your Order...</span>
                <div><img src={approxtime} alt="timeikonica" />30 min</div>
              </div>

            </div>

            <div className="cartitems">
              <div className="cartitemsheader">
                
              </div>
            {
              cart.cartItems.map((item,index) =>(
                <CartItem 
                key={item[0].id} 
                id={item[0].id} 
                name={item[0].name} 
                imageUrl={item[0].imageUrl} 
                price={item[0].price} 
                quantity={item[0].quantity} 
                removeitem={() => RemoveItem(index)}
                increment={() => Increment(index)}
                decrement={() => Decrement(index)} />
              ))
            }
            </div>

            <div className="Totalpriceandfinishorder">
              <h3>TOTAL:</h3>
              <h3>{cart.total}$</h3>
              <Button handleClick={() => goToOrderPage()} clear>Finish</Button>
            </div>

            {
              searchfield.message ?
              <h3 className="proceedmessage">/*{searchfield.message}*/</h3>
              :
              null

            }
            <p className="deliverypricemessage">For 7x products and more: DELIVERY FREE</p>


          </div>
        </div>

    </div>

          
  );
            }
  else 
  return(<OrderPage 
    backtopage={() => backtoPage()} 
    cart={cart.cartItems} 
    total={cart.total} 
    totalitemsincart={cart.items} 
    setSearchfield={setSearchfield}
    setCart={setCart}
    setOpenshoppingcart={setOpenshoppingcart}/>
    )
}

export default App;
