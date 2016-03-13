import React from 'react';

export default class Light extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div className="col-sm-6">
				<div className="panel panel-default">
					<div className="panel-heading">
						{this.props.name} Light
					</div>
					<div className="panel-body">
						<div className="btn-group">
							<button className="btn btn-default" onClick={this.on.bind(this)}><i className="glyphicon glyphicon-ok"/> On</button>
							<button className="btn btn-default" onClick={this.off.bind(this)}><i className="glyphicon glyphicon-remove"/> Off</button>
							<button className="btn btn-default" onClick={this.white.bind(this)}>White</button>
							<button className="btn btn-default" onClick={this.yellow.bind(this)}>Yellow</button>
						</div>
					</div>
				</div>
			</div>
		);
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

	on () {
		let id = this.props.id;
		window.socket.emit('light:on', {id: id});
	}

	off () {
		let id = this.props.id;
		window.socket.emit('light:off', {id: id});
	}
}
