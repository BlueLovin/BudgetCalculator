import React, { useState, useEffect } from 'react';
import List from './List';
import '../index.css';

var commaNumber = require('comma-number');

const Cart = ({ addToCart, removeFromCart, cart, cartHighTotal, cartLowTotal }: any) => {
  //turn 100 into 1.00 :-)
	const formatNumber = (num: any) => {
		return commaNumber((num / 100).toFixed(2));
	};
  //here is where each item is rendered
	const cartItems = cart.map((el: any) => ( 
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
              High Total: $<span id="hi-total">{formatNumber(cartHighTotal)}</span>
            </div>
            <div>
              Low Total: $<span id="lo-total">{formatNumber(cartLowTotal)}</span>
            </div>
						<br />
						<br />
						<div>{cartItems}</div>
						<br />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
