import React from 'react';
import './App.css';
import './bootstrap.min.css'
import InitPopup from './components/Popup'

var commaNumber = require('comma-number')

export type IProps = {}

export interface IState {
    budget: number
}



class App extends React.Component<IProps, IState> {
  constructor (props: any){
    super(props);
    this.state = {
        budget: 0
    };
}

UpdateBudget = (event: any, newBudget: number) => {
  event.preventDefault();//prevent refresh
  let val = document.getElementById("budget")! as HTMLInputElement;//get value from input box in popup
  this.setState({
    budget: +val.value //set budget accordingly
  });
}
  render() {
    return(
      <div>
        
        <br/> 
        <h1 className="text-center">Budget Calculator 💵</h1>
        <h3 className="text-center">${this.state.budget}</h3>
        <InitPopup changeBudget = {this.UpdateBudget}/>
      </div>
    )
  }


  }

export default App;
