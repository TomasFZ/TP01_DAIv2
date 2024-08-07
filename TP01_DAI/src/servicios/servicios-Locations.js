import { query } from "express";
import LocationRepository from "../repositories/locations-repository.js"
export default class LocationService{

async getAllLocations(limit, offset){
    const locationRepository = new LocationRepository();
    const listaLocations = await locationRepository.getAllLocations(limit, offset);

    const nextPage = `${"http://localhost:3000/api/location"}?limit=${limit}&offset=${(offset + 1)}`;

        return {
            "collection": listaLocations, 
            "pagination": {
                "limit": limit,
                "offset": offset,
                "nextPage": nextPage //poner el http 
        }
      }
    
}

async getLocation(id){
    const locationRepository = new LocationRepository(); 
       
        const location = await locationRepository.getLocationById(id)
        return location
}

async getAllLocationsMatchingId(limit, offset, id, userId){
    const locationRepository = new LocationRepository(); 
    const listaLocations = await locationRepository.getAllLocationsMatchingId(limit, offset, id, userId);

    const nextPage = `${"http://localhost:3000/api/location/:id/event-location"}?limit=${limit}&offset=${offset + 1}`;
    return {
        "collection": listaLocations, 
        "pagination": {
            "limit": limit,
            "offset": offset,
            "nextPage": nextPage //poner el http 
    }
  }
}

}