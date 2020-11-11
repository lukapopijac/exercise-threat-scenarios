const urlThreatScenario = 'api/threat-scenarios';

import spinner from './spinner.js';  // not the right place

function getHeaders() {
	return {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('jwt')
	};
}

function reloadIfNeeded(status) {
	if(status == 401) {
		localStorage.clear();
		window.location.reload();
	}
}

export async function getThreatScenarios() {
	spinner.show();
	let res = await fetch(urlThreatScenario, {
		method: 'GET',
		headers: getHeaders(),
	}).catch(err => ({}));
	reloadIfNeeded(res.status);
	spinner.hide();
	if(!res.ok) return {error: true, errorMessage: 'Get all scenarios failed!'};
	return res.json();
}

export async function insertThreatScenario(ts) {
	spinner.show();
	let res = await fetch(urlThreatScenario, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(ts)
	}).catch(err => ({}));
	reloadIfNeeded(res.status);
	spinner.hide();
	if(!res.ok) return {error: true, errorMessage: 'Insert failed!'};
	return {};
}

export async function updateThreatScenario(ts) {
	spinner.show();
	let res = await fetch(urlThreatScenario, {
		method: 'PUT',
		headers: getHeaders(),
		body: JSON.stringify(ts)
	}).catch(err => ({}));
	reloadIfNeeded(res.status);
	spinner.hide();
	if(!res.ok) return {error: true, errorMessage: 'Update failed!'};
	return {};
}

export async function deleteThreatScenario(id) {
	spinner.show();
	let res = await fetch(urlThreatScenario + '/' + id, {
		method: 'DELETE',
		headers: getHeaders()
	}).catch(err => ({}));
	reloadIfNeeded(res.status);
	spinner.hide();
	if(!res.ok) return {error: true, errorMessage: 'Delete failed!'};
	return {};
}
