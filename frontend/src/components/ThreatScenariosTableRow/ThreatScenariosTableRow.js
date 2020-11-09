import React from 'react';
import './ThreatScenariosTableRow.css';

export default class ThreatScenariosTableRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.threatScenario
		};

		this._onInputChange = this._onInputChange.bind(this);
	}

	_onInputChange(evt) {
		this.setState({[evt.target.name]: evt.target.value});
	}

	render() {
		let ts = this.state;
		return this.props.mode != 'edit' ?
			<li className={'ThreatScenariosTableRow'}>
				<div className="title"         >{ts.title}</div>
				<div className="description"   >{ts.description}</div>
				<div className="related_asset" >{ts.related_asset}</div>
				<div className="classification">{ts.classification}</div>
				<div className="impact"        >{ts.impact}</div>
				<div className="likelihood"    >{ts.likelihood}</div>
				<div className="risk_level"    >{ts.risk_level}</div>
				<div className="edit-delete">
					<button onClick={this.props.onEditClick} className="btn-edit"><i className="material-icons">edit</i></button>
					<button onClick={this.props.onDeleteClick} className="btn-delete"><i className="material-icons">delete</i></button>
				</div>
			</li>
			:
			<li className='ThreatScenariosTableRow edit'>
				<div className="title"         ><input name="title"          defaultValue={ts.title}          onChange={this._onInputChange}/></div>
				<div className="description"   ><input name="description"    defaultValue={ts.description}    onChange={this._onInputChange}/></div>
				<div className="related_asset" ><input name="related_asset"  defaultValue={ts.related_asset}  onChange={this._onInputChange}/></div>
				<div className="classification"><input name="classification" defaultValue={ts.classification} onChange={this._onInputChange}/></div>
				<div className="impact"        ><input name="impact"         defaultValue={ts.impact}         onChange={this._onInputChange}/></div>
				<div className="likelihood"    ><input name="likelihood"     defaultValue={ts.likelihood}     onChange={this._onInputChange}/></div>
				<div className="risk_level"    ></div>
				<div className="edit-delete">
					<button onClick={_ => this.props.onConfirmClick(this.state)} className="btn-confirm"><i className="material-icons">check</i></button>
					<button onClick={this.props.onCancelClick} className="btn-cancel"><i className="material-icons">clear</i></button>
				</div>
			</li>
		;
	}
}
