import React, { useState, useEffect } from 'react';
import './App.css';
import './bootstrap.min.css';
import InitPopup from './components/Popup';
import Cart from './components/Cart';

var commaNumber = require('comma-number');

export type IProps = {};

export interface IState {
	budget: number;
	items: any[];
}

const App = () => {
	const [budget, setBudget] = useState(0);
	const [overBudget, setOverBudget] = useState(false);
	const [underBudget, setUnderBudget] = useState(false);
	const [withinBudget, setWithinBudget] = useState(false);
	const [cart, setCart] = useState<any[]>([]);
	const [cartLowTotal, setLowTotal] = useState(0);
	const [cartHighTotal, setHighTotal] = useState(0);

	useEffect(() => {
		//update total whenever cart is changed
		total();
	}, [cart, cartLowTotal, budget]);//whenever these values are changed, the component will reload

	const checkBudget = () => {
		let currBudget = budget * 100; // times 100 to account for the decimal places

		//check to see if total is greater than current budget
		if (cartLowTotal > currBudget) {
			// over budget
			setOverBudget(true);
			setWithinBudget(false);
			setUnderBudget(false);
		}
		if (cartLowTotal < currBudget && cartHighTotal < currBudget) {
			// under budget
			setUnderBudget(true);
			setOverBudget(false);
			setWithinBudget(false);
		}
		if (cartLowTotal < currBudget && cartHighTotal > currBudget) {
			// within budget
			setWithinBudget(true);
			setUnderBudget(false);
			setOverBudget(false);
		}
	};


	const addToCart = (element: object) => {
		if (!cart.includes(element)) {//if item is not already inside cart, add it!
			setCart([...cart, element]);
		}
	};

	const budgetStatus = () => {
		console.log(underBudget);
		if (budget === 0) { //if there is no budget
			return (
				<h3 className="text-center text-info">enter a budget to get started. 😃</h3>
			)
		}
		if (budget > 0 && cartHighTotal === 0) { // after budget entered, no items in cart
			return (
				<h3 className="text-center text-info">Add some items 😃</h3>
			)
		}
		if (underBudget) {
			return (
				<h3 className="text-center text-success">you are under the budget!</h3>
			)
		}
		if (overBudget) {
			return (
				<h3 className="text-center text-danger">you are over the budget!</h3>
			)
		}
		if (withinBudget) {
			return (
				<h3 className="text-center text-info">you are within the budget!</h3>
			)
		}
	}

	const removeFromCart = (element: any) => {
		let hardCopy = [...cart];
		hardCopy = hardCopy.filter((cartItem) => cartItem.id !== element.id);
		setCart(hardCopy);
	};

	const updateBudget = () => {
		const val = (document.getElementById('budget')! as HTMLInputElement).valueAsNumber;

		if (val > 0 && val < 10000000) //min and max values
			setBudget(val);
	};

	return (
		<div>
			<br />
			<h1 className="text-center">Budget Calculator 💵</h1>
			<h3 className="text-center text-muted">Current Budget: ${commaNumber(budget)}</h3> <br />
			{/* below lines are ugly, I know. InitPopup is the "Change Budget" button, I pass it the updateBudget function with some params */}
			<InitPopup changeBudget={updateBudget} />
			{budgetStatus()}
			<br /> {/* line break */}
			{/* here is the cart, that includes the category tabs as a child component. i pass it all the things it needs right here. */}
			{/* Why not have all these items in the Cart's state? because we need the current total to see if the budget is over or under! */}
			<Cart
				addToCart={addToCart}
				removeFromCart={removeFromCart}
				total={total}
				cart={cart}
				cartLowTotal={cartLowTotal}
				cartHighTotal={cartHighTotal}
			/>
		</div>
	);

	function total() {
		//calculate high and low total
		let lowTotal = 0;
		let highTotal = 0;
		//iterate over cart and add each high/low price to correct variables
		for (let i = 0; i < cart.length; i++) {
			lowTotal += cart[i].lowPrice;
			highTotal += cart[i].highPrice;
		}
		//set state variables
		setLowTotal(lowTotal);
		setHighTotal(highTotal);
		checkBudget();
	}

};

export default App;
