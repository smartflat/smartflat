import React from 'react';

import store from '../stores/utilities';

export default class Alerts extends React.Component {
	constructor () {
		super();

		this.state = store.getState();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount () {
		store.addChangeListener(this._onChange);
	}

	componentWillUnmount () {
		store.removeChangeListener(this._onChange);
	}

	render () {
		let alerts = [];
		let key = 0;
		if (!this.state.authenticated) {
			alerts.push(
				<div key={key++} className="alert alert-danger">
					<strong>Not authenticated!</strong> Enter the password in the settings view.
				</div>
			);
		}
		return (
			<div className="container">
				{alerts}
			</div>
		);
	}

	_onChange () {
		this.setState(store.getState());
	}
}
