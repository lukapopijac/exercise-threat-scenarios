import React from 'react';
import './ThreatScenariosTable.css';

import ThreatScenariosTableRow from '../ThreatScenariosTableRow/ThreatScenariosTableRow.js';
import { getThreatScenarios, deleteThreatScenario } from '../../common/server-api.js';

import openModal from '../../common/open-modal.js';
import AddUpdateThreatScenarioForm from '../AddUpdateThreatScenarioForm/AddUpdateThreatScenarioForm.js';

export default class ThreatScenariosTable extends React.Component {
	constructor() {
		super();
		this.state = {
			scenarios: [],
			page: 0,
			rowsPerPage: 5,
			mode: null,   // null, 'edit', 'insert'
			editId: null
		};

		this._goPageDown = this._goPageDown.bind(this);
		this._goPageUp = this._goPageUp.bind(this);

		this._refreshAllData = this._refreshAllData.bind(this);
		
		this._addEditThreatScenario = this._addEditThreatScenario.bind(this);
		this._deleteThreatScenario = this._deleteThreatScenario.bind(this);
	}

	async _refreshAllData() {
		let result = await getThreatScenarios();
		if(result.error) openModal('Error', result.errorMessage);
		else {
			this.setState({
				scenarios: result,
				page: 0
			});
		}
	}

	async componentDidMount() {
		this._refreshAllData();
	}

	async _deleteThreatScenario(tsId) {
		let result = await deleteThreatScenario(tsId);
		if(result.error) openModal('Error', result.errorMessage);
		else this._refreshAllData();
	}

	_addEditThreatScenario(ts) {
		let closeModal = openModal(ts ? 'Edit Threat Scenario' : 'Add New Threat Scenario',
			<AddUpdateThreatScenarioForm
				record={ts} 
				onSuccess={_ => {
					closeModal();
					this._refreshAllData();
				}}
			/>
		);
	}
	
	_goPageDown() {
		if(this.state.page > 0) this.setState({page: this.state.page-1});
	}

	_goPageUp() {
		if(this.state.page < this.totalPages-1) this.setState({page: this.state.page+1});
	}

	get totalPages() {
		return Math.ceil(this.state.scenarios.length / this.state.rowsPerPage);
	}

	render() {
		let {page, rowsPerPage, scenarios, mode, editId} = this.state;
		let rowFrom = Math.min(page*rowsPerPage + 1, scenarios.length);
		let rowTo = Math.min((page+1)*rowsPerPage, scenarios.length);

		let visibleRows = scenarios.slice(rowFrom-1, rowTo);
		return (
			<div className="ThreatScenariosTable">
				<div className="header">
					<div className="title"         >Title</div>
					<div className="description"   >Description</div>
					<div className="related_asset" >Related Asset</div>
					<div className="classification">Classification</div>
					<div className="impact"        >Impact</div>
					<div className="likelihood"    >Likelihood</div>
					<div className="risk_level"    >Risk Level</div>
					<div className="edit-delete"   ></div>
				</div>
				<ul className="list">
					{visibleRows.map(ts => 
						<ThreatScenariosTableRow 
							key={ts.id} 
							threatScenario={ts} 
							mode={mode=='edit' && editId==ts.id ? 'edit' : null}
							onEditClick={_ => this._addEditThreatScenario(ts)}
							onDeleteClick={_ => this._deleteThreatScenario(ts.id)}
						/>
					)}
				</ul>
				<div className="footer">
					<button type="button" className="btn-add" onClick={_ => this._addEditThreatScenario()}>Add</button>
					<div className="pagination">
						<div className="pages">{rowFrom} - {rowTo} of {scenarios.length}</div>
						<button disabled={page==0}                 onClick={this._goPageDown}>❮</button>
						<button disabled={page==this.totalPages-1} onClick={this._goPageUp}  >❯</button>
					</div>
				</div>
			</div>
		);
	}
}
