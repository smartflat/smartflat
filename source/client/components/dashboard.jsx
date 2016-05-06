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
					<Light id="living-room" name="Living Room Light"/>
					<Light id="kitchen" name="Kitchen Light"/>
					<Light id="blue" name="Blue LED"/>
					<Light id="red" name="Red LED"/>
					<Light id="yellow" name="Yellow LED"/>
					<Light id="green" name="Green LED"/>
				</div>
			</div>
		);
	}
}
