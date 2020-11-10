import express from 'express';
// import cors from 'cors';
import bodyParser from 'body-parser';

import scenarios from './data.js';

let router = express.Router();

// router.use(cors({origin: /example\.com$/}));
router.use(bodyParser.json());

router.get('/threat-scenarios', async (req, res) => {
	// let json = await response.json();
	res.send(JSON.stringify(scenarios));
});

router.post('/threat-scenarios', async (req, res) => {
	let ts = req.body;
	console.log('post', ts);
	// res.status(400).end();
	res.end();

	// let response = await fetch(url, {
	// 	headers: {'Content-Type': 'application/json'},
	// 	method: 'POST',
	// 	body: JSON.stringify(coinIds)
	// });
	// let prices = await response.json();
});

router.delete('/threat-scenarios/:tsId', async (req, res) => {
	console.log('delete', req.params.tsId);
	res.end();
});

router.put('/threat-scenarios', async (req, res) => {
	let ts = req.body;
	console.log('put', ts);
	res.end();
});


export default router;
