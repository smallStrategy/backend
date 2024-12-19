import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata'; // Required for TypeORM

// Packages
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Routes
import router from './routes/route'

// Database
import { Database } from './db/index';

// Middlewares
import { setJsonContentType } from './middlewares/json';

// Config
import { initialConfigFolder } from './utils/config';

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

// Initial Settings
initialConfigFolder();

// Server Start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

