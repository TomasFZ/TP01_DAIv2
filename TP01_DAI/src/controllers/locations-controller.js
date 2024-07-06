import express from "express";

import LocationService from "../servicios/servicios-Locations.js";
import {DecryptToken} from "../Middleware.js" //ver si anda o no con los corchetes estos
import {validacionToken} from "../token.js" 

const lController = express.Router(); //hacer gitignore para el module

const locationService = new LocationService();

lController.get("/", async (req, res) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);//verificar si son num y si existen. 
    if(limit >= 0 & offset >= 0)
    {
    const locations = await locationService.getAllLocations(limit, offset);
    return res.status(200).send(locations);
    }else return res.send("Offset o limit invalidos")
})

lController.get("/:id", async (req, res) =>{ 
    const limit = req.query.limit;
    const offset = req.query.offset;
    if(limit >= 0 && offset >= 0){
        try {
            const location = await locationService.getLocation(req.params.id);

            if (!location) {
                return res.status(404).send("ID no encontrado");
            }
    
            return res.status(200).send(location);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error");
}}})

lController.get("/:id/event-location", DecryptToken, async (req, res) =>{
  const userId = req.user?.id; //
    console.log("User ID de token: ", userId);
    
    if (!userId) {
        return res.status(400).send("Usuario no encontrado");
    }
  
  validacionToken(req, res)  
  const limit = req.params.limit;
    const offset = req.params.offset;
    try {
        const locationId = req.params.id;
    
        const locationExists = await locationService.getLocation(locationId);
        if (!locationExists) {
          return res.status(404).send({ error: 'Location no existe' });
        }
    
        const eventLocations = await locationService.getAllLocationsMatchingId(limit, offset, locationId);
    
        return res.status(200).send(eventLocations);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error");
      }
    });

    export default lController