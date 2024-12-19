import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata'; // Required for TypeORM

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes/route'

import { Database } from './db/index';
import { setJsonContentType } from './middlewares/json';

const app = express();
const PORT = process.env.PORT || 8090;

// load environment variables
app.use(cors());
app.use(bodyParser.json());

// middleware
app.use(setJsonContentType);

// router
app.use(router);

// Initialize Data Source
Database.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// Server Start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

