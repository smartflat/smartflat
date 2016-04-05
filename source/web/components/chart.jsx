import RTChart from 'react-rt-chart';
import React from 'react';

export default class Chart extends React.Component {
	constructor () {
		super();

		this.state = {
			temperature: 0,
			humidity: 0,
			date: new Date()
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.render = this.render.bind(this);
	}

	componentDidMount () {
		let that = this;
		window.socket.on('data', function (data) {
			that.setState({
				date: new Date(),
				temperature: data.temperature,
				humidity: data.humidity
			});
		});
	}

	render () {
		return (
			<div className="col-sm-12">
				<div className="panel panel-default">
					<div className="panel-heading">
						Real-Time Temperature & Humidity
					</div>
					<div className="panel-body">
						<RTChart maxValues={60} data={Object.assign({}, this.state)} fields={['temperature', 'humidity']}/>
					</div>
				</div>
			</div>
		);
	}
}
