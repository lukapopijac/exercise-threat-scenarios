import React from 'react';
import './AddUpdateThreatScenarioForm.css';
import openModal from '../../common/open-modal.js';

import { insertThreatScenario, updateThreatScenario } from '../../common/server-api.js';

export default class AddUpdateThreatScenarioForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.form = React.createRef();

		this._submit = this._submit.bind(this);
	}

	async _submit() {
		let form = this.form.current;
		let formData = new FormData(form);
		let newRecord = Object.fromEntries(formData);
		let result;
		if(this.props.record != null) {
			newRecord.id = this.props.record.id;
			result = await updateThreatScenario(newRecord);
		} else {
			result = await insertThreatScenario(newRecord);
		}
		if(result.error) openModal('Error', result.errorMessage);
		else {
			this.props.onSuccess();
		}
	}

	render() {
		let record = this.props.record || {};
		return (
			<div className="AddUpdateThreatScenarioForm">
				<form ref={this.form}>
					<label>Title<br/>
						<input type="text" name="title" defaultValue={record.title || ''} />
					</label>
					<label>Description<br/>
						<input type="text" name="description" defaultValue={record.description || ''} />
					</label>
					<label>Related Asset<br/>
						<input type="text" name="related_asset" defaultValue={record.related_asset || ''} />
					</label>
					<label>Classification<br/>
						<input type="text" name="classification" defaultValue={record.classification || ''} />
					</label>
					<label className="for-select">Impact
						<select name="impact" defaultValue={record.impact}>
							<option>0</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
						</select>
					</label>
					<label className="for-select">Likelihood
						<select name="likelihood" defaultValue={record.likelihood}>
							<option>0</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
						</select>
					</label>

					<div className="buttons">
						<button type="button" onClick={this._submit}>Save</button>
					</div>
				</form>
			</div>
		);
	}
}
