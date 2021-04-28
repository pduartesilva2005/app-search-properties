import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Property from "../models/Property";
import PropertyValidation from "../validations/PropertyValidation";
import propertiesView from '../views/properties_view';

export default {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const type_property = filters.type_property as string;
    const city = filters.city as string;
    const state = filters.state as string;
    const neighborhood = filters.neighborhood as string;
    const price = filters.price as string;
    const dependencies = filters.dependencies as string;

    const notProperties = !filters.type_property || !filters.city || !filters.state || !filters.neighborhood || !filters.price || !filters.dependencies;

    if (notProperties) {
      return response.status(400).json({
        error: 'Missing filters to search properties'
      });
    }

    const propertiesRepository = getRepository(Property);

    const properties = await propertiesRepository.find({
      where: {
        type_property, 
        city, 
        state,
        neighborhood, 
        price, 
        dependencies 
      }
    });

    return response.json(propertiesView.renderMany(properties));
  },

  async create(request: Request, response: Response) {
    const {
      type_property, 
      city, 
      state,
      neighborhood, 
      price, 
      dependencies 
    } = request.body;

    const propertyRepository = getRepository(Property);

    const image = request.file.filename;

    const data = {
      image,
      type_property, 
      city, 
      state,
      neighborhood, 
      price, 
      dependencies
    };

    await PropertyValidation(data);

    const property = propertyRepository.create(data);

    await propertyRepository.save(property);

    return response.status(201).json(propertiesView.render(property));
  }
}

function FriendValidation(data: { type_property: any; city: any; state: any; neighborhood: any; price: any; dependencies: any; }) {
  throw new Error("Function not implemented.");
}
