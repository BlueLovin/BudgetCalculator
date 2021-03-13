import React, {useState, useEffect} from "react";
import './App.css';
import './bootstrap.min.css';
import * as item from "./db/repositories/items";
import InitPopup from './components/Popup';

var commaNumber = require('comma-number')

export type IProps = {}

export interface IState {
    budget: number,
    items: any[]
}

const App = () => {
  const [budget, updateBudget] = useState(0);
  const [items, setItems] = useState<Array<item.Item>>([]);
      // fetch all items when this view mounted
      useEffect(() => {
        fetchItems();
    }, []);

  const fetchItems = async () => {
      // clean the items array first
      setItems([]);

      // fetch items from repository
      const _items = await item.all();

      // set items to state
      setItems(_items);
  };
  return(
      <div>
      <br/> 
      <h1 className="text-center">Budget Calculator 💵</h1>
      <h3 className="text-center">${commaNumber(budget)}</h3>
      <InitPopup changeBudget = {() => updateBudget((document.getElementById("budget")! as HTMLInputElement).valueAsNumber)} />

      {/* list every item  */}
      {items.map((item, index) => (
        <>
          <div>Name = {item.name}</div>
          <div>Type = {item.type}</div>
          <div>Low = {item.lowPrice}</div>
          <div>High = {item.highPrice}</div><br/>
        </>
      ))}
    </div>
  )
}

export default App;