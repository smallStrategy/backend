import express, { Request, Response } from 'express';
import cors from 'cors';

import { setJsonContentType } from './middlewares/json';

const app = express();
const port = 3000;

app.use(cors());
app.use(setJsonContentType);

app.get('/', (_, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
  return;
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

