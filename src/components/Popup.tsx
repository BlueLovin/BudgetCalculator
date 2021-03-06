import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export type IProps = {};

export interface IState {
	budget: number;
}

class InitPopup extends React.Component<any> {
	constructor(props: any) {
		super(props);
		this.HandleChange = this.HandleChange.bind(this);
	}

	HandleChange(event: any) {
		//numbers only regex!
		const re = /^[0-9\b]+$/;
		if (event.target.value === '' || re.test(event.target.value)) {
			this.setState({ number: event.target.value });
		}
	}
	render() {
		return (
			<div className="text-center">
				<Popup trigger={<button className="btn btn-outline-primary"> Change Budget </button>} modal>
					{(close: any) => (
						<div className="text-center">
							<form onSubmit={close}>
								<span>How much would you like to spend? {this.props.budget}</span>
								<br />
								<label className="h1 p-1">$</label>
								<input  type="number" min={0} max={10000000} id="budget" onChange={this.HandleChange} />
								<input type="submit" value="go" onClick={this.props.changeBudget} />
							</form>
						</div>
					)}
				</Popup>
				<br /> <br />
			</div>
		);
	}
}

export default InitPopup;
