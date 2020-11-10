import React from 'react';
import './ThreatScenariosTableRow.css';
import AddUpdateThreatScenarioForm from '../AddUpdateThreatScenarioForm/AddUpdateThreatScenarioForm.js';

const riskLevelText = {
	0: 'Information',
	1: 'Low risk',
	2: 'Med risk',
	3: 'High risk'
};

export default class ThreatScenariosTableRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let ts = this.props.threatScenario;
		return (
			<li className={'ThreatScenariosTableRow'}>
				<div className="title"         >{ts.title}</div>
				<div className="description"   >{ts.description}</div>
				<div className="related_asset" >{ts.related_asset}</div>
				<div className="classification">{ts.classification}</div>
				<div className="impact"        >{ts.impact}</div>
				<div className="likelihood"    >{ts.likelihood}</div>
				<div className="risk_level"    >{riskLevelText[ts.risk_level]} ({ts.risk_level})</div>
				<div className="actions">
					<button onClick={this.props.onEditClick} className="btn-edit"><i className="material-icons">edit</i></button>
					<button onClick={this.props.onDeleteClick} className="btn-delete"><i className="material-icons">delete</i></button>
				</div>
			</li>
		);
	}
}
