import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8090;

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes/route'

import { setJsonContentType } from './middlewares/json';

const app = express();

// load environment variables
app.use(cors());
app.use(bodyParser.json());

// middleware
app.use(setJsonContentType);

// router
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

