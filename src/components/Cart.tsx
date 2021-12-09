import React, { useState, useEffect } from "react";
import List from "./List";
import "../index.css";

var commaNumber = require("comma-number");

const Cart = ({ checkBudget, cartTotal, setCartTotal }: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    //update total whenever cart is changed
    const total = () => {
      //calculate high and low total
      let lowTotal = 0;
      let highTotal = 0;
      //iterate over cart and add each high/low price to correct variables
      for (let i = 0; i < cartItems.length; i++) {
        lowTotal += cartItems[i].lowPrice;
        highTotal += cartItems[i].highPrice;
      }
      //set state variables
      setCartTotal({ low_total: lowTotal, high_total: highTotal });
    };
    total();
    checkBudget();
  }, [cartItems, checkBudget, setCartTotal]);

  //turn 100 into 1.00 :-)
  const formatNumber = (num: any) => {
    return commaNumber((num / 100).toFixed(2));
  };

  const removeFromCart = (element: any) => {
    let filteredList = [...cartItems];
    filteredList = filteredList.filter(
      (cartItem) => cartItem.id !== element.id
    );
    setCartItems(filteredList);
  };

  const addToCart = (element: object) => {
    if (!cartItems.includes(element)) {
      //if item is not already inside cart, add it!
      setCartItems([...cartItems, element]);
    }
  };

  //here is where each item is rendered
  const renderCartItems = cartItems.map((el: any) => (
    <div key={el.id}>
      <h4>{`${el.name}`}</h4>
      <div>
        {`$${formatNumber(el.lowPrice)}`} - {`$${formatNumber(el.highPrice)}`}
      </div>
      <input type="submit" value="remove" onClick={() => removeFromCart(el)} />
      <br />
      <br />
    </div>
  ));

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <List addToCart={addToCart} formatNumber={formatNumber} />
          </div>

          <div className="col-md-8">
            <h2>CART</h2>
            <div>
              High Total: $
              <span id="hi-total">{formatNumber(cartTotal.high_total)}</span>
            </div>
            <div>
              Low Total: $
              <span id="lo-total">{formatNumber(cartTotal.low_total)}</span>
            </div>
            <br />
            <br />
            <div>{renderCartItems}</div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
