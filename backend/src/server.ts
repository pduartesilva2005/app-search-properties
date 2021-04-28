import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import './database/connection';
import { routes } from './routes';
import { errorHandler } from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use('/image', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3333, () => {
  console.log('Server Started at http://localhost:3333');
});