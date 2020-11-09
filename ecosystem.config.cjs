module.exports = {
	apps: [
		{
			name: 'threat-scenarios',
			script: './main.js',
			watch: true,
			env: {
				'NODE_ENV': 'production'
			}
		}
	]
}
