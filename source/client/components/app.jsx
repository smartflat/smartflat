import React from 'react';
import {RouterMixin} from 'react-mini-router';

// components
import Alerts from './alerts.jsx';
import Control from './control.jsx';
import Dashboard from './dashboard.jsx';
import Layout from './layout.jsx';
import Scenes from './scenes.jsx';
import Settings from './settings.jsx';
import Rooms from './rooms.jsx';

// use es5 because es6 doesn't support mixins
const App = React.createClass({
	mixins: [RouterMixin],

	routes: {
		'/': 'dashboard',
		'/rooms': 'rooms',
		'/control': 'control',
		'/scenes': 'scenes',
		'/settings': 'settings'
	},

	render: function () {
		return (
			<div>
				<Layout/>
				<div>
					<Alerts/>
					{this.renderCurrentRoute()}
				</div>
			</div>
		);
	},

	dashboard: () => {
		return (
			<Dashboard/>
		);
	},

	control: () => {
		return (
			<Control/>
		);
	},

	rooms: () => {
		return (
			<Rooms/>
		);
	},

	scenes: () => {
		return <Scenes/>;
	},

	settings: () => {
		return (
			<Settings/>
		);
	}
});

module.exports = App;
