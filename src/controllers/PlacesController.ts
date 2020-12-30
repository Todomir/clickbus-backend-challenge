import { Request, Response } from 'express';
import db from '../db/connection';

export default class PlacesController {
  // return all places
  async index(request: Request, response: Response) {
    const places = await db.select().from('places');

    // check if places array is empty
    if (places.length === 0) {
      return response
        .status(200)
        .json({ message: "No 'places' inserted in the database. ⚠" });
    }
    return response.status(200).json(places);
  }

  // create a place
  async create(request: Request, response: Response) {
    const { name, slug, city, state, bio } = request.body;

    try {
      db('places')
        .insert({
          name,
          slug,
          city,
          state,
          bio,
        })
        .then(async (id) => {
          const data = await db('places').where('id', id);
          return response.status(201).json({
            message: 'Everything A-OK! 😃✅',
            // reducing data array to an object
            data: data.reduce((acc, item) => ({ ...item })),
          });
        })
        .catch((error) => {
          return response.status(400).json({
            message: 'Error getting inserted data. ❌😪',
            error: error.message,
          });
        });
    } catch (error) {
      return response.status(400).json({
        message: 'Something went wrong! ❌😪',
        error: error.message,
      });
    }
  }

  // return a place by id
  async show(request: Request, response: Response) {
    try {
      const place = await db('places').where('id', request.params.id);

      // check if place array has something
      if (place.length > 0) {
        return (
          response
            .status(200)
            // reducing place array to an object
            .json(place.reduce((acc, item) => ({ ...item })))
        );
      }

      // return 404 if place does not exist
      return response.status(404).json({ message: 'Place does not exist. ⚠' });
    } catch (error) {
      return response.status(400).json({
        message: 'Something went wrong! ❌😪',
        error: error.message,
      });
    }
  }

  // return a place by name
  async fetchByName(request: Request, response: Response) {
    const { name } = request.body;
    try {
      const place = await db('places').where('name', name);

      // check if place array has something
      if (place.length > 0) {
        return (
          response
            .status(200)
            // reducing place array to an object
            .json(place.reduce((acc, item) => ({ ...item })))
        );
      }

      // return 404 if place does not exist
      return response.status(404).json({ message: 'Place does not exist. ⚠' });
    } catch (error) {
      return response.status(400).json({
        message: 'Something went wrong! ❌😪',
        error: error.message,
      });
    }
  }
}
