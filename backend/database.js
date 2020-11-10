import sqlite3 from 'sqlite3';

let createTable = `
	CREATE TABLE threat_scenarios (
		id             integer primary key autoincrement,
		title          text,
		description    text,
		related_asset  text,
		classification text,
		impact         integer,
		likelihood     integer,
		risk_level     integer
	)
`;

let db = new sqlite3.Database('db.sqlite', err => {
    if(err) {
		console.error(err.message);
		throw err;
    } else {
        console.log('Connected to the SQLite database.');
		db.run(createTable, err => { if(err) console.log(err); });
    }
});

export default db;
