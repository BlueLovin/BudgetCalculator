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
        this.state = {
        };
    }
    HandleChange(event: any){
        event.preventDefault();
        const input =  document.getElementById("budget")! as HTMLInputElement;
        this.setState({
            budget: parseInt(input.value)
        });
        alert(+input.value)
    }
    render() {
        return (
            <div className="text-center">
            <Popup trigger={<button className="btn-primary"> Change Budget </button>} modal>
                <div className="text-center">
                    <form onSubmit={this.props.changeBudget}>
                        <span>How much would you like to spend? {this.props.budget}</span>
                        <br/>
                        <label className="h1 p-1">$</label><input type="text" id="budget"></input>
                        <input type="submit" value="go"/>
                    </form>
                </div>
            </Popup>
            </div>
        );
    }
}

export default InitPopup;