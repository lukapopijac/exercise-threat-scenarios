import path from 'path';
import express from 'express';
import apiRouter from './backend/api-router.js';
import verifyToken from './backend/cognito-verify.js';

console.log('NODE_ENV:', process.env.NODE_ENV);

let app = express();

let frontendDir = process.env.NODE_ENV == 'production' ? 'build' : 'dist';
let staticDir = path.join(process.cwd(), 'frontend', frontendDir);
console.log('----> static dir:', staticDir);
app.use(express.static(staticDir));

app.use('/api', verifyToken(), apiRouter);


const port = process.env.PORT || 8000;
app.listen(port, _ => console.log(`main server: listening on port ${port}`));
