import express from 'express';
import { handleScript } from './handle-script.js';

const app = express();

app.get('/', handleScript);

export default app;
