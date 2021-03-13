import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export type IProps = {}

export interface IState {
    budget: number
}

class InitPopup extends React.Component<any> {
    constructor (props: any){
        super(props);
        this.HandleChange = this.HandleChange.bind(this);
    }
    

    HandleChange(event: any){
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
  
           this.setState({number: event.target.value});
  
        }
    }
    render() {
        return (
            <div className="text-center">
            <Popup trigger={<button className="btn-primary"> Change Budget </button>} modal>
            {(close: any) => (
                <div className="text-center">
                    <form onSubmit={close}>
                        <span>How much would you like to spend? {this.props.budget}</span>
                        <br/>
                        <label className="h1 p-1">$</label>
                        <input type="number" id="budget"
                            onChange={this.HandleChange} />
                        <input type="submit" value="go" onClick={this.props.changeBudget}/>
                    </form>
                </div>
            )}
            </Popup>
            <br /> <br /> 
            {/* <h1>Enter a budget to get started!</h1> */}
            </div>
        );
    }
}

export default InitPopup;