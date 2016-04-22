import React from 'react';

import {ChartComponent} from './chart.jsx';
import {LightComponent} from './light.jsx';

export default class Scenes extends React.Component {
	render () {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-xs-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								Living Room
							</div>
							<div className="panel-body">
								<ChartComponent room="42" name="Sensors"/>
								<LightComponent id="1" name="Light"/>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-xs-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								Kitchen
							</div>
							<div className="panel-body">
								<ChartComponent room="43" name="Sensors"/>
								<LightComponent id="2" name="Light"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
