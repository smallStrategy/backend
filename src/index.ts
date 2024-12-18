const PORT = 3000;

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes/route'

import { setJsonContentType } from './middlewares/json';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(setJsonContentType);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

