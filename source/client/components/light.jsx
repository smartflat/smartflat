import React from 'react';

import store from '../stores/devices';

export default class Light extends React.Component {
	constructor () {
		super();
		this.state = store.getState();

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
		let className = this.state.lights[this.props.id].on ? 'success' : 'danger';
		let label = this.state.lights[this.props.id].on ? 'On' : 'Off';
		return (
			<div className="col-xs-6">
				<div className="panel panel-default">
					<div className="panel-heading">
						{this.props.name} Light
					</div>
					<div className="panel-body">
						<div className="btn-group" data-toggle="buttons">
							<button ref="toggle" className={'btn btn-' + className} onFocus={this.blur.bind(this, 'toggle')} onClick={this.toggle.bind(this)}>
								{label}
							</button>
							<button ref="white" className="btn btn-default" style={{backgroundColor: 'white'}} onFocus={this.blur.bind(this, 'white')} onClick={this.white.bind(this)}>
								&nbsp;
							</button>
							<button ref="yellow" className="btn btn-default" style={{backgroundColor: 'yellow'}} onFocus={this.blur.bind(this, 'yellow')} onClick={this.yellow.bind(this)}>
								&nbsp;
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	blur (name) {
		this.refs[name].blur();
	}

	white () {
		let id = this.props.id;
		window.socket.emit('light:set', {
			id: id,
			hue: 0,
			saturation: 0,
			brightness: 255
		});
	}

	yellow () {
		let id = this.props.id;
		window.socket.emit('light:set', {
			id: id,
			hue: 10000,
			saturation: 100,
			brightness: 255
		});
	}

	toggle () {
		window.socket.emit('light:toggle', {
			id: this.props.id
		});
	}
}
