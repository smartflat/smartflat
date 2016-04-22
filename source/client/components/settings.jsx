import React from 'react';

// actions
import utilityActions from '../actions/utilities.js';

export default class Settings extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<div className="panel panel-default">
							<div className="panel-heading">
								Authentication
							</div>
							<div className="panel-body">
								<div className="btn-group">
									<button className="btn btn-default" onClick={utilityActions.authenticate}>Authenticate</button>
									<button className="btn btn-danger" onClick={utilityActions.deauthenticate}>De-Authenticate</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="panel panel-default">
							<div className="panel-heading">
								Add Devices
							</div>
							<div className="panel-body">
								<div className="btn-group">
									<button className="btn btn-success"><i className="glyphicon glyphicon-plus"/> Light</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
