import React from 'react';
import {RouterMixin} from 'react-mini-router';

// components
import Layout from './layout.jsx';
import Light from './light.jsx';
import Settings from './settings.jsx';
import Alerts from './alerts.jsx';
import Chart from './chart.jsx';

// use es5 because es6 doesn't support mixins
const App = React.createClass({
	mixins: [RouterMixin],

	routes: {
		'/': 'control',
		'/control': 'control',
		'/settings': 'settings'
	},

	render: function () {
		return (
			<div>
				<Layout/>
				<div class="content">
					<Alerts/>
					{this.renderCurrentRoute()}
				</div>
			</div>
		);
	},

	home: function () {
		return (
			<div className="container">
				home
			</div>
		);
	},

	control: function () {
		return (
			<div className="container">
				<div className="row">
					<Light id="2" name="Kitchen" />
					<Light id="1" name="Living Room" />
					<Chart/>
				</div>
			</div>
		);
	},

	settings: function () {
		return (
			<Settings/>
		);
	}
});

module.exports = App;
