import express from 'express';
// import cors from 'cors';
import bodyParser from 'body-parser';

import scenarios from './data.js';

let router = express.Router();

// router.use(cors({origin: /example\.com$/}));
router.use(bodyParser.json());

// get
router.get('/threat-scenarios', async (req, res) => {
	// let json = await response.json();
	res.send(JSON.stringify(scenarios));
});

// insert
router.post('/threat-scenarios', async (req, res) => {
	let coinIds = req.body;
	let response = await fetch(url, {
		headers: {'Content-Type': 'application/json'},
		method: 'POST',
		body: JSON.stringify(coinIds)
	});
	let prices = await response.json();
	res.json(prices);
});

// delete
router.delete('/threat-scenarios', async (req, res) => {
});

// update
router.put('/threat-scenarios', async (req, res) => {
});


export default router;
