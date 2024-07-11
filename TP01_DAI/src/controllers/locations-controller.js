import express from "express";

import LocationService from "../servicios/servicios-Locations.js";
import {DecryptToken} from "../Middleware.js" //ver si anda o no con los corchetes estos
import {validacionLimit, validacionOffset, validacionToken} from "../funciones.js" 

const lController = express.Router(); //hacer gitignore para el module

const locationService = new LocationService();

lController.get("/", async (req, res) => {
    var limit = Number(req.query.limit);
    var offset = Number(req.query.offset);
    limit = validacionLimit(limit)
    offset = validacionOffset(offset);
    
    const locations = await locationService.getAllLocations(limit, offset);
    return res.status(200).send(locations);
})

lController.get("/:id", async (req, res) =>{ 
    var limit = Number(req.query.limit);
    var offset = Number(req.query.offset);
    limit = validacionLimit(limit);
    offset = validacionOffset(offset);
        try {
            const location = await locationService.getLocation(req.params.id);

            if (!location || location.length === 0) {
                return res.status(404).send("ID no encontrado");
            }
    
            return res.status(200).send(location);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error");
}})

lController.get("/:id/event-location", DecryptToken, async (req, res) =>{
  const userId = req.user?.id; //
    console.log("User ID de token: ", userId);
  
  validacionToken(req, res)  
  var limit = req.params.limit;
    var offset = req.params.offset;
    limit = validacionLimit(limit);
    offset = validacionOffset(offset);
    
    try {
        const locationId = req.params.id;
    
        const locationExists = await locationService.getLocation(locationId);
        if (!locationExists) {
          return res.status(404).send({ error: 'Location no existe' });
        }
    
        const eventLocations = await locationService.getAllLocationsMatchingId(limit, offset, locationId, userId);
        
        if (!eventLocations || !Array.isArray(eventLocations.rows) || eventLocations.rows.length === 0) {
          return res.status(404).send({error: "No hay match o no se encontraron event locations"});
        }
        return res.status(200).send(eventLocations);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error");
      }
    });

    export default lController