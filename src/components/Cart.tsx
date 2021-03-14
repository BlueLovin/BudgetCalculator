import React, { useState, useEffect } from "react";
import List from './List'
import '../index.css'
import * as item from "../db/repositories/items";

var commaNumber = require('comma-number')


const Cart = () => {
    const [cart, setCart] = useState<any[]>([])
    const [cartLowTotal, setLowTotal] = useState(0);
    const [cartHighTotal, setHighTotal] = useState(0);
    const [items, setItems] = useState<any[]>([])

    const total = () => {
        let lowTotal = 0;
        let highTotal = 0;
        for (let i = 0; i < cart.length; i++) {
            lowTotal += cart[i].lowPrice;
            highTotal += cart[i].highPrice;
        }
        setLowTotal(lowTotal);
        setHighTotal(highTotal);
      };
    

    useEffect(() => {
        total();
      }, [cart]);

    const formatNumber = (num: any) => {
      return commaNumber((num / 100).toFixed(2));
    }; 

    const addToCart = (el: any) => {
        setCart([...cart, el]);
    };
  
    const removeFromCart = (el: any) => {
      let hardCopy = [...cart];
      hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
      setCart(hardCopy);
    };

    const cartItems = cart.map((el) => (
        <div key={el.id}>
            <h4>{`${el.name}`}</h4>
          <div>
              {`$${formatNumber(el.lowPrice)}`} - {`$${formatNumber(el.highPrice)}`}
          </div>
          <input type="submit" value="remove" onClick={() => removeFromCart(el)} />
          <br/><br/>
        </div>
        
      ));
      return(
          <div>
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-4">
                        <List addToCart={addToCart} formatNumber={formatNumber}/>
                    </div>
                    <div className="col-md-8">
                        <h2>CART</h2>
                        <div>High Total: $<span id="hi-total">{formatNumber(cartHighTotal)}</span></div>
                        <div>Low Total: $<span id="lo-total">{formatNumber(cartLowTotal)}</span></div>
                        <hr/><br/>
                        <div>{cartItems}</div>
                        <br/>
                    </div>
                </div>
            </div>

          </div>
      );
}

export default Cart;