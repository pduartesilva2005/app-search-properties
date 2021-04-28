import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/upload';
import PropertyController from './controllers/PropertyController';

export const routes = Router();
const upload = multer(multerConfig);

routes.get('/properties', PropertyController.index);
routes.post('/properties', upload.single('image'),PropertyController.create);