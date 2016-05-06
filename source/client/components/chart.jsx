import RTChart from 'react-rt-chart';
import React from 'react';

import store from '../stores/devices';

export class ChartComponent extends React.Component {

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
		let lastUpdate = this.state.lastUpdate;
		let newState = store.getState();

		let needsUpdate = false;

		for (let i in newState.rooms[this.props.room]) {
			if (newState.rooms[this.props.room][i].lastUpdate > lastUpdate) needsUpdate = true;
		}

		if (needsUpdate) {
			this.setState(newState);
		}
	}

	componentWillUnmount () {
		store.removeChangeListener(this._onChange);
	}

	render () {

		this.state.lastUpdate = Date.now();

		// determine sensors to render

		let fields = Object.keys(this.state.rooms[this.props.room]);

		// remove boolean sensors for chart

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
					},
					point: {
						show: false
					},
					data: {
						type: 'spline'
					}
				}}
				maxValues={60}
				data={{
					temperature: temperature,
					humidity: humidity,
					brightness: brightness,
					date: this.state.lastUpdate
				}}
				fields={fields}
			/>
		) : '';

		return (
			<div className={this.props.className}>
				<div className={'alert alert-' + (motion === 1 ? 'danger' : 'success')}>
					Motion {motion === 1 ? 'detected' : 'not detected'}
				</div>
				{chart}
			</div>
		);
	}

}

export default class Chart extends React.Component {

	constructor () {
		super();
	}

	render () {
		return (
			<div className="col-md-6 col-xs-12">
				<div className="panel panel-default">
					<div className="panel-heading">
						{this.props.name}
					</div>
					<ChartComponent name={this.props.name} room={this.props.room} className="panel-body"/>
				</div>
			</div>
		);
	}

}
