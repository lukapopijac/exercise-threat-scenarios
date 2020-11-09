// const url = new URL(document.URL).origin + '/api/';
const urlThreatScenario = 'api/threat-scenarios';

export async function getThreatScenarios() {
	let res = await fetch(urlThreatScenario, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
	}).catch(err => ({}));
	if(!res.ok) return {error: true};
	return res.json();
}

export async function insertThreatScenario(ts) {
	console.log('insert', ts);
	// let res = await fetch(urlThreatScenario, {
	// 	method: 'POST',
	// 	headers: {'Content-Type': 'application/json'},
	// 	body: JSON.stringify(ts)
	// }).catch(err => ({}));
	// if(!res.ok) return {error: true};
	// return res.json();
}

export async function updateThreatScenario(ts) {
	console.log('update', ts);
	// let res = await fetch(urlThreatScenario, {
	// 	method: 'PUT',
	// 	headers: {'Content-Type': 'application/json'},
	// 	body: JSON.stringify(ts)
	// }).catch(err => ({}));
	// if(!res.ok) return {error: true};
	// return res.json();
}

export async function deleteThreatScenario(tsId) {
	console.log('delete', tsId);
	// let res = await fetch(urlThreatScenario + '/:tsId', {
	// 	method: 'DELETE',
	// 	headers: {'Content-Type': 'application/json'}
	// }).catch(err => ({}));
	// if(!res.ok) return {error: true};
	// return res.json();
}
