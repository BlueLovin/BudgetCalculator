import React, { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap.min.css";
import InitPopup from "./components/Popup";
import Cart from "./components/Cart";

var commaNumber = require("comma-number");

enum BUDGET_STATE {
  "OVER",
  "UNDER",
  "WITHIN",
}

const App = () => {
  const [budget, setBudget] = useState(0);
  const [budgetState, setBudgetState] = useState(BUDGET_STATE.WITHIN);
  const [cartTotal, setCartTotal] = useState({ low_total: 0, high_total: 0 });

  // this function determines if the total is over, under or within budget

  useEffect(() => {
    const computeBudgetState = () => {
      let currBudget = budget * 100; // times 100 to account for the decimal places

      //check to see if total is greater than current budget
      if (cartTotal.low_total > currBudget) {
        // over budget
        setBudgetState(BUDGET_STATE.OVER);
      }
      if (
        cartTotal.low_total < currBudget &&
        cartTotal.high_total < currBudget
      ) {
        // under budget
        setBudgetState(BUDGET_STATE.UNDER);
      }
      if (
        cartTotal.low_total < currBudget &&
        cartTotal.high_total > currBudget
      ) {
        // within budget
        setBudgetState(BUDGET_STATE.WITHIN);
      }
    };
    computeBudgetState();
  }, [budget, cartTotal]);

  const renderBudgetStatus = () => {
    if (budget === 0) {
      //if there is no budget
      return (
        <h3 className="text-center text-info">
          enter a budget to get started. 😃
        </h3>
      );
    }
    if (budget > 0 && cartTotal.high_total === 0) {
      // after budget entered, no items in cart
      return <h3 className="text-center text-info">Add some items 😃</h3>;
    }
    if (budgetState === BUDGET_STATE.UNDER) {
      return (
        <h3 className="text-center text-success">you are under the budget!</h3>
      );
    }
    if (budgetState === BUDGET_STATE.OVER) {
      return (
        <h3 className="text-center text-danger">you are over the budget!</h3>
      );
    }
    if (budgetState === BUDGET_STATE.WITHIN) {
      return (
        <h3 className="text-center text-info">you are within the budget!</h3>
      );
    }
  };

  const updateBudget = (newBudgetString: string) => {
    const val = Number(newBudgetString);

    if (val > 0 && val < 10000000)
      //min and max values
      setBudget(val);
  };

  return (
    <div>
      <br />
      <h1 className="text-center">Budget Calculator 💵</h1>
      <h3 className="text-center text-muted">
        Current Budget: ${commaNumber(budget)}
      </h3>{" "}
      <br />
      <InitPopup changeBudget={updateBudget} />
      {renderBudgetStatus()}
      <br />
      <Cart cartTotal={cartTotal} setCartTotal={setCartTotal} />
    </div>
  );
};

export default App;
