import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import UserService from "../servicios/servicios-Usuario.js"
import {DecryptToken} from "../Middleware.js" //ver si anda o no con los corchetes estos
const controller = express.Router(); //hacer gitignore para el module

const locationService = new locationService();

controller.get("/", async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;//verificar si son num y si existen. 
    if(limit >= 0 & offset >= 0)
    {
    const locations = await locationService.getAllLocations(limit, offset);
    return res.status(200).send(locations);
    }else return res.send("Offset o limit invalidos")
})

controller.get("/:id", async (req, res) =>{ 
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

controller.get("/:id/event-location", DecryptToken, async (req, res) =>{
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