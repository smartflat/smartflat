import React from 'react';
import {navigate} from 'react-mini-router';

export default class Layout extends React.Component {
	render () {
		return (
			 <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
			 	<div className="container">
			 		<div className="navbar-header">
			 			<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
			 				<span className="sr-only">Toggle navigation</span>
			 				<span className="icon-bar"></span>
			 				<span className="icon-bar"></span>
			 				<span className="icon-bar"></span>
			 			</button>
			 			<a className="navbar-brand" onClick={this.go.bind(this, '/')}>
			 				<i className="glyphicon glyphicon-home"/> Home
			 			</a>
					</div>
			 		<div className="collapse navbar-collapse">
			 			<ul className="nav navbar-nav">
			 				<li><a onClick={this.go.bind(this, '/control')}><i className="glyphicon glyphicon-console"/> Control</a></li>
			 				<li><a onClick={this.go.bind(this, '/scenes')}><i className="glyphicon glyphicon-picture"/> Scenes</a></li>
			 				<li><a onClick={this.go.bind(this, '/rooms')}><i className="glyphicon glyphicon-stop"/> Rooms</a></li>
			 			</ul>
			 			<ul className="nav navbar-nav navbar-right">
			 				<li><a onClick={this.go.bind(this, '/settings')}><i className="glyphicon glyphicon-compressed"></i> Settings</a></li>
			 			</ul>
			 		</div>
			 	</div>
			</nav>
		);
	}

	go (where) {
		navigate(where);
	}
}
