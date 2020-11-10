import React from 'react';
import './Modal.css';

export default class Modal extends React.Component {
	constructor() {
		super();
		this.state = {};

		this._openModal = this._openModal.bind(this);
	}

	_openModal() {
		
	}

	render() {
		return (
			<div className="Modal">
				<div className="Modal-main">
					<div className="Modal-header">
						{this.props.children[0]}
						<button type="button" onClick={this.props.close}>X</button>
					</div>
					<div className="Modal-body">
						{this.props.children[1]}
					</div>
				</div>
			</div>
		);
	}
}
