import React from 'react';

import Chart from './chart.jsx';
import Light from './light.jsx';

export default class Scenes extends React.Component {
	render () {
		return (
			<div className="container">
				<div className="row">
					<Chart room="42" name="Living Room Sensors"/>
					<Chart room="43" name="Kitchen Sensors"/>
					<Light id="1" name="Living Room Light"/>
					<Light id="2" name="Kitchen Light"/>
				</div>
			</div>
		);
	}
}
