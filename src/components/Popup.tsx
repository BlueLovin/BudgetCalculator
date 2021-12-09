import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function InitPopup(props: any) {
  const { changeBudget } = props;

  const [item, setItem] = useState("");
  
  const re = /^[0-9\b]+$/;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //numbers only regex!
    if (e.target.value === "" || re.test(e.target.value)) {
      setItem(e.target.value);
    }
  };

  return (
    <div className="text-center">
      <Popup
        trigger={
          <button className="btn btn-outline-primary"> Change Budget </button>
        }
        modal
      >
        {(close: any) => (
          <div className="text-center">
            <form onSubmit={close}>
              <span>How much would you like to spend?</span>
              <br />
              <label className="h1 p-1">$</label>
              <input
                type="number"
                min={0}
                max={10000000}
                id="budget"
                onChange={handleChange}
              />
              <input type="submit" value="go" onClick={changeBudget(item)} />
            </form>
          </div>
        )}
      </Popup>
      <br /> <br />
    </div>
  );
}
