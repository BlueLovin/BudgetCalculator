import React, {useState, useEffect} from "react";
import './App.css';
import './bootstrap.min.css';
import * as item from "./db/repositories/items";
import InitPopup from './components/Popup';
import List from './components/List'
import Cart from "./components/Cart";


var commaNumber = require('comma-number')

export type IProps = {}

export interface IState {
    budget: number,
    items: any[]
}

const App = () => {
  const [budget, setBudget] = useState(0);
  const [overBudget, setOverBudget] = useState(false);
  const [items, setItems] = useState<Array<item.Item>>([]);
  const [cart, setCart] = useState<any[]>([])
  const [cartLowTotal, setLowTotal] = useState(0);
  const [cartHighTotal, setHighTotal] = useState(0);


  useEffect(() => {//update total whenever cart is changed
    total();
  }, [cart, cartLowTotal, budget]);

  const checkBudget = () => {
     

    if(cartLowTotal > budget * 100){ // times 100 to account for the decimal places
      setOverBudget(true);
    }
    else{
      setOverBudget(false);
    }
  }

  const fetchItems = async () => { // fetch items from firebase
      // clean the items array first
      setItems([]);

      // fetch items from repository
      const _items = await item.all();

      // set queried items to 'item' state
      setItems(_items);
  };
  const total = () => {//calculate high and low total
    let lowTotal = 0;
    let highTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        lowTotal += cart[i].lowPrice;
        highTotal += cart[i].highPrice;
    }
    //set state variables
    setLowTotal(lowTotal);
    setHighTotal(highTotal);
    checkBudget();
  };

  const addToCart = (element: any) => {
    setCart([...cart, element]);
  };

  const removeFromCart = (element: any) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== element.id);
    setCart(hardCopy);
  };

  const updateBudget = () =>{
    setBudget((document.getElementById("budget")! as HTMLInputElement).valueAsNumber)
  }

  return(
      <div>
        <br/> 
        <h1 className="text-center">Budget Calculator 💵</h1>
        <h3 className="text-center">${commaNumber(budget)}</h3>
        <h3 className="text-center text-danger">{overBudget ? 'you are over the budget!': null}</h3>
        <h3 className="text-center text-success">{!overBudget ? 'you are within the budget!': null}</h3>
        {/* below lines are ugly, I know. InitPopup is the "Change Budget" button, I pass it the updateBudget function with some params */}
        <InitPopup changeBudget = {updateBudget} /> 

        {/* here is the cart, that includes the category tabs as a child component. i pass it all the things it needs right here. */}
        {/* Why not have all these items in the Cart's state? because we need the current total to see if the budget is over or under! */}
        <Cart addToCart={addToCart} removeFromCart={removeFromCart} total={total} cart={cart} cartLowTotal={cartLowTotal} cartHighTotal={cartHighTotal}/>
    </div>
  )
}

export default App;