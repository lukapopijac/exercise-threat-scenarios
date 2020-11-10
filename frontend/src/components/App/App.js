import React from 'react';
import './App.css';
import Login from '../Login/Login.js';
import ThreatScenariosTable from '../ThreatScenariosTable/ThreatScenariosTable.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {};

		this._logout = this._logout.bind(this);
	}

	_logout() {
		localStorage.clear();
		this.forceUpdate();
	}

	render() {
		let jwt = localStorage.getItem('jwt');
		let username = jwt ? localStorage.getItem('username') : '';
		return (
			<div className="App">
				<div className="App-header">
					<h1>Threat Scenarios</h1>
					{jwt &&
						<div className="App-usercorner">
							{username}
							<button type="button" className="logout" onClick={this._logout}>Log Out</button>
						</div>
					}
				</div>
				{jwt ?
					<div className="table-wrapper">
						<ThreatScenariosTable/>
					</div>
					:
					<Login onSuccess={_ => this.forceUpdate()} />
				}
				{[...this.props.modals]}
			</div>
		);
	}
}
