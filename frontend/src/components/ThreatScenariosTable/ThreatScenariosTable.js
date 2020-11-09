import React from 'react';
import './ThreatScenariosTable.css';

import ThreatScenariosTableRow from '../ThreatScenariosTableRow/ThreatScenariosTableRow.js';
import { getThreatScenarios, insertThreatScenario, updateThreatScenario, deleteThreatScenario } from '../../common/server-api.js';


export default class ThreatScenariosTable extends React.Component {
	constructor() {
		super();
		this.state = {
			scenarios: [],
			page: null,
			rowsPerPage: 5,
			mode: null,   // null, 'edit', 'insert'
			editId: null
		};

		this._goPageDown = this._goPageDown.bind(this);
		this._goPageUp = this._goPageUp.bind(this);

		this._cancelEdit = this._cancelEdit.bind(this);
		this._confirmEdit = this._confirmEdit.bind(this);
	}

	async componentDidMount() {
		let threatScenarios = await getThreatScenarios();
		this.setState({
			scenarios: threatScenarios,
			page: 0
		});	
		console.log(threatScenarios);
	}

	_deleteThreatScenario(tsId) {
		deleteThreatScenario(tsId);
	}

	_editThreatScenario(ts) {
		console.log('edit', ts);
		this.setState({
			mode: 'edit',
			editId: ts.id
		})
	}
	
	_updateThreatScenario() {

	}

	_cancelEdit() {
		this.setState({
			mode: null,
			editId: null
		})
	}

	_confirmEdit(ts) {
		console.log('confirm', ts)
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
		let totaPages = Math.ceil(scenarios.length / rowsPerPage);
		console.log('total:', totaPages);
		let rowFrom = page*rowsPerPage + 1;
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
							onEditClick={_ => this._editThreatScenario(ts)}
							onDeleteClick={_ => this._deleteThreatScenario(ts.id)}
							onConfirmClick={this._confirmEdit}
							onCancelClick={this._cancelEdit}
						/>
					)}
				</ul>
				<div className="footer">
					<div className="pages">{rowFrom} - {rowTo} of {scenarios.length}</div>
					<button disabled={page==0}                 onClick={this._goPageDown}>❮</button>
					<button disabled={page==this.totalPages-1} onClick={this._goPageUp}  >❯</button>
				</div>
			</div>
		);
	}
}
