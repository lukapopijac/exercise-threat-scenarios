const urlThreatScenario = 'api/threat-scenarios';


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
	let res = await fetch(urlThreatScenario, {
		method: 'GET',
		headers: getHeaders(),
	}).catch(err => ({}));
	reloadIfNeeded(res.status);
	if(!res.ok) return {error: true, errorMessage: 'Get all scenarios failed!'};
	return res.json();
}

export async function insertThreatScenario(ts) {
	let res = await fetch(urlThreatScenario, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(ts)
	}).catch(err => ({}));
	reloadIfNeeded(res.status);
	if(!res.ok) return {error: true, errorMessage: 'Insert failed!'};
	return {};
}

export async function updateThreatScenario(ts) {
	let res = await fetch(urlThreatScenario, {
		method: 'PUT',
		headers: getHeaders(),
		body: JSON.stringify(ts)
	}).catch(err => ({}));
	reloadIfNeeded(res.status);
	if(!res.ok) return {error: true, errorMessage: 'Update failed!'};
	return {};
}

export async function deleteThreatScenario(id) {
	let res = await fetch(urlThreatScenario + '/' + id, {
		method: 'DELETE',
		headers: getHeaders()
	}).catch(err => ({}));
	reloadIfNeeded(res.status);
	if(!res.ok) return {error: true, errorMessage: 'Delete failed!'};
	return {};
}
