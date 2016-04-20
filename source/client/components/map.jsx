import React from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

export default class MapComponent extends React.Component {
	constructor () {
		super();
	}

	render () {
		const position = [51.505, -0.09];
		return (
			<div className="col-xs-6">
				<div className="panel panel-default">
					<div className="panel-heading">
						Positions
					</div>
					<div className="panel-body">
						<Map center={position} style={{height: '500px'}} zoom={13}>
							<TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
							<Marker position={position}>
								<Popup>
									<span>A pretty CSS3 popup.<br/>Easily customizable.</span>
								</Popup>
							</Marker>
						</Map>
					</div>
				</div>
			</div>
		);
	}
}
