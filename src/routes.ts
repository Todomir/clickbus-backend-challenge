import express from 'express';

import PlacesController from './controllers/PlacesController';

const routes = express.Router();

const placesController = new PlacesController();

routes.get('/', placesController.index);
routes.get('/:id', placesController.show);

routes.post('/', placesController.create);
routes.post('/places', placesController.fetchByName);

export default routes;
