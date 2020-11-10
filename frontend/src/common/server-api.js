const urlThreatScenario = 'api/threat-scenarios';

export async function getThreatScenarios() {
	let res = await fetch(urlThreatScenario, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
	}).catch(err => ({}));
	if(!res.ok) return {error: true, errorMessage: 'Get all scenarios failed!'};
	return res.json();
}

export async function insertThreatScenario(ts) {
	let res = await fetch(urlThreatScenario, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(ts)
	}).catch(err => ({}));
	if(!res.ok) return {error: true, errorMessage: 'Insert failed!'};
	return {};
}

export async function updateThreatScenario(ts) {
	let res = await fetch(urlThreatScenario, {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(ts)
	}).catch(err => ({}));
	if(!res.ok) return {error: true, errorMessage: 'Update failed!'};
	return {};
}

export async function deleteThreatScenario(id) {
	let res = await fetch(urlThreatScenario + '/' + id, {
		method: 'DELETE',
		headers: {'Content-Type': 'application/json'}
	}).catch(err => ({}));
	if(!res.ok) return {error: true, errorMessage: 'Delete failed!'};
	return {};
}
