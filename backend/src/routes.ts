import { Router } from 'express';

import PropertyController from './controllers/PropertyController';

export const routes = Router();

routes.get('/properties', PropertyController.index);
routes.post('/properties', PropertyController.create);