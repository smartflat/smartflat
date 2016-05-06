import React from 'react';

import store from '../stores/devices';

export class LightComponent extends React.Component {
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
		let className = this.state.lights[this.props.id].isOn ? 'success' : 'danger';
		let label = this.state.lights[this.props.id].isOn ? 'On' : 'Off';

		let colorList = [{
			name: 'white',
			color: '#FFFFFF',
			className: 'default'
		}, {
			name: 'yellow',
			color: '#FFDC00',
			className: 'warning'
		}, {
			name: 'red',
			color: '#FF4136',
			className: 'danger'
		}, {
			name: 'blue',
			color: '#0074D9',
			className: 'primary'
		}];
		let colors = [];

		colorList.forEach((color, index) => {
			let classes = 'btn btn-' + (color.className ? color.className : 'default')
			let styles = color.className ? {} : {
				backgroundColor: color.color
			};
			colors.push(
				<button key={index} ref={color.name} className={classes} style={styles} onFocus={this.blur.bind(this, color.name)} onClick={this.color.bind(this, color.name)}>
					&nbsp;
				</button>
			);
		});

		return (
			<div className={this.props.className}>
				<div className="btn-group" data-toggle="buttons">
					<button ref="toggle" className={'btn btn-' + className} onFocus={this.blur.bind(this, 'toggle')} onClick={this.toggle.bind(this)}>
						{label}
					</button>
					{colors}
				</div>
			</div>
		);
	}

	blur (name) {
		this.refs[name].blur();
	}

	color (name) {
		let id = this.props.id;
		window.socket.emit('light:color', {
			id: id,
			color: name
		});
	}

	toggle () {
		window.socket.emit('light:toggle', {
			id: this.props.id
		});
	}
}

export default class Light extends React.Component {

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
					<LightComponent name={this.props.name} id={this.props.id} className="panel-body"/>
				</div>
			</div>
		);
	}

}
