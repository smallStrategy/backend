import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8090;

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes/route'

import pool from './db/index';
import { setJsonContentType } from './middlewares/json';

const app = express();

// load environment variables
app.use(cors());
app.use(bodyParser.json());

// middleware
app.use(setJsonContentType);

// router
app.use(router);

// DB TEST
pool.connect()
  .then(() => console.log('PostgreSQL connected successfully'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

