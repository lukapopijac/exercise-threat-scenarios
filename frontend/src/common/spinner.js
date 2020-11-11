const modals = [];

export default {
	show() {
		document.getElementById('spinner-wrap').style.display = 'flex';
	},
	hide() {
		document.getElementById('spinner-wrap').style.display = 'none';
	}
}
