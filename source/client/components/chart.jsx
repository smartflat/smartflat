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

		let chart = fields.length ? (
			<RTChart
				chart={{
					interaction: {
						enabled: false
					}
				}}
				maxValues={60}
				data={Object.assign({
					temperature: this.state.rooms[this.props.room].temperature,
					humidity: this.state.rooms[this.props.room].humidity,
					brightness: this.state.rooms[this.props.room].brightness/2.55,
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
						<div className={'alert alert-' + (this.state.rooms[this.props.room].motion === 1 ? 'danger' : 'success')}>
							Motion {this.state.rooms[this.props.room].motion === 1 ? 'detected' : 'not detected'}
						</div>
						{chart}
					</div>
				</div>
			</div>
		);
	}
}
