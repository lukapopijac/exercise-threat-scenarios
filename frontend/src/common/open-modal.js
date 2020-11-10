import {render} from 'react-dom';
import React from 'react';
import Modal from '../components/Modal/Modal.js';
import App from '../components/App/App.js';

const modals = [];

function renderAll() {
	render(<App modals={modals} />, document.getElementById('app-container'));
}

function closeLast() {
	modals.pop();
	renderAll();
}

export default function(header, body) {
	let modal = (
		<Modal key={modals.length} close={closeLast}>
			{header || <div></div>}
			{body}
		</Modal>
	);
	modals.push(modal);
	renderAll();
	return closeLast;
}
