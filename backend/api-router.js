import express from 'express';
// import cors from 'cors';
import bodyParser from 'body-parser';

import db from './database.js';

let router = express.Router();

// router.use(cors({origin: /example\.com$/}));
router.use(bodyParser.json());

router.get('/threat-scenarios', async (req, res) => {
	let sql = 'select * from threat_scenarios';
	db.all(sql, [], (err, rows) => {
		if(err) res.status(400).json({error: err.message});
		else res.json(rows);
	});
});

router.post('/threat-scenarios', async (req, res) => {
	let sql = `
		insert into threat_scenarios (
			title, description, related_asset, classification, impact, likelihood, risk_level
		) values (?, ?, ?, ?, ?, ?, ?)`
	;
	let ts = req.body;
	try {
		if(![0, 1, 2, 3].includes(+ts.impact)) throw 'Impact must be from (0, 1, 2, 3)';
		if(![0, 1, 2, 3].includes(+ts.likelihood)) throw 'Likelihood must be from (0, 1, 2, 3)';
		ts.risk_level = Math.floor((+ts.impact + +ts.likelihood) / 2);
		let params = [
			ts.title,
			ts.description,
			ts.related_asset,
			ts.classification,
			ts.impact,
			ts.likelihood,
			ts.risk_level
		];
		db.run(sql, params, err => {
			if(err) res.status(400).json({error: err.message});
			else res.end();
		});
	} catch(err) {
		res.status(400).json({error: err});
	}
});

router.delete('/threat-scenarios/:id', async (req, res) => {
	let id = req.params.id;
	db.run('delete from threat_scenarios where id = ?', req.params.id, err => {
		if(err) res.status(400).json({error: err.message});
		else res.end();
	});
});

router.put('/threat-scenarios', async (req, res) => {
	let sql = `
		update threat_scenarios set
			title=?,
			description=?,
			related_asset=?,
			classification=?,
			impact=?,
			likelihood=?,
			risk_level=?
		where id=?`
	;
	let ts = req.body;
	try {
		if(ts.id == null) throw 'Wrong id';
		if(![0, 1, 2, 3].includes(+ts.impact)) throw 'Impact must be from (0, 1, 2, 3)';
		if(![0, 1, 2, 3].includes(+ts.likelihood)) throw 'Likelihood must be from (0, 1, 2, 3)';
		ts.risk_level = Math.floor((+ts.impact + +ts.likelihood) / 2);
		let params = [
			ts.title,
			ts.description,
			ts.related_asset,
			ts.classification,
			ts.impact,
			ts.likelihood,
			ts.risk_level,
			ts.id
		];
		db.run(sql, params, err => {
			if(err) res.status(400).json({error: err.message});
			else res.end();
		});
	} catch(err) {
		res.status(400).json({error: err});
	}
});


export default router;
