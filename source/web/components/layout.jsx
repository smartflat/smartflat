import React from 'react';
import {navigate} from 'react-mini-router';

export default class Layout extends React.Component {
	render () {
		return (
			// <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
			// 	<div className="container">
			// 		<div className="navbar-header">
			// 			<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
			// 				<span className="sr-only">Toggle navigation</span>
			// 				<span className="icon-bar"></span>
			// 				<span className="icon-bar"></span>
			// 				<span className="icon-bar"></span>
			// 			</button>
			// 			<a className="navbar-brand" onClick={this.home}>
			// 				Home
			// 			</a>
			// 		</div>
			// 		<div className="collapse navbar-collapse">
			// 			<ul className="nav navbar-nav">
			// 				<li><a onClick={this.control}><i className="glyphicon glyphicon-screenshot"/> Control</a></li>
			// 			</ul>
			// 			<ul className="nav navbar-nav navbar-right">
			// 				<li><a onClick={this.settings}><i className="glyphicon glyphicon-compressed"></i> Settings</a></li>
			// 			</ul>
			// 		</div>
			// 	</div>
			// </nav>
			<div></div>
		);
	}

	home () {
		navigate('/');
	}

	control () {
		navigate('/control');
	}

	settings () {
		navigate('/settings');
	}
}
