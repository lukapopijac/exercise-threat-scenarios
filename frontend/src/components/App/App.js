import React from 'react';
import {CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js';
import './App.css';
import Login from '../Login/Login.js';
import ThreatScenariosTable from '../ThreatScenariosTable/ThreatScenariosTable.js';

const poolData = {
	UserPoolId: 'us-west-2_9rkRbB2Vn',
	ClientId: '7q73kj26651bkg4t3peu4v3m4q'
};
const userPool = new CognitoUserPool(poolData);


export default class App extends React.Component {
	constructor() {
		super();
		this.state = {};

		this._logout = this._logout.bind(this);
	}

	_logout() {
		const cognitoUser = new CognitoUser({
			Username: localStorage.getItem('username'),
			Pool: userPool
		});
		cognitoUser.signOut();
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
					<Login userPool={userPool} onSuccess={_ => this.forceUpdate()} />
				}
				{[...this.props.modals]}
			</div>
		);
	}
}
