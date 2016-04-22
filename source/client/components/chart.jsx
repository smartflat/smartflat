import RTChart from 'react-rt-chart';
import React from 'react';

import store from '../stores/devices';

export default class Chart extends React.Component {
	constructor () {
		super();

		this.state = store.getState();

		this.componentDidMount = this.componentDidMount.bind(this);
		this.render = this.render.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount () {
		store.addChangeListener(this._onChange);
	}

	_onChange (data) {
		this.setState(store.getState());
	}

	componentWillUnmount () {
		store.removeChangeListener(this._onChange);
	}

	render () {

		// determine sensors to render

		let fields = Object.keys(this.state.rooms[this.props.room]);
		let index = fields.indexOf('motion');
		if (index) fields.splice(index, 1);

		// don't render chart without data

		const getData = (type) => {
			return this.state.rooms[this.props.room][type] ? this.state.rooms[this.props.room][type].value : 0;
		}

		let temperature = getData('temperature');
		let motion = getData('motion');
		let brightness = getData('brightness');
		let humidity = getData('humidity');


		let chart = fields.length ? (
			<RTChart
				chart={{
					interaction: {
						enabled: false
					}
				}}
				maxValues={60}
				data={Object.assign({
					temperature: temperature,
					humidity: humidity,
					brightness: brightness,
					date: new Date()
				})}
				fields={fields}
			/>
		) : '';

		return (
			<div className="col-md-6 col-xs-12">
				<div className="panel panel-default">
					<div className="panel-heading">
						{this.props.name} Sensors
					</div>
					<div className="panel-body">
						<div className={'alert alert-' + (motion === 1 ? 'danger' : 'success')}>
							Motion {motion === 1 ? 'detected' : 'not detected'}
						</div>
						{chart}
					</div>
				</div>
			</div>
		);
	}
}
