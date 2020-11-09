import React from 'react';
import './App.css';
import ThreatScenariosTable from '../ThreatScenariosTable/ThreatScenariosTable.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">Threat Scenarios</div>
				<div className="table-wrapper">
					<ThreatScenariosTable/>
				</div>
			</div>
		);
	}
}
