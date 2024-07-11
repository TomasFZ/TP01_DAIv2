import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import UserService from "../servicios/servicios-Usuario.js"
import {DecryptToken} from "../Middleware.js" //ver si anda o no con los corchetes estos
import {validacionToken} from "../funciones.js" 
import {validacionLimit, validacionOffset} from "../funciones.js" 

const locController = express.Router(); //hacer gitignore para el module

const eventService = new EventService();


locController.get("/", DecryptToken, async (req,res) => {
    const userId = req.user?.id; //
    var limit = Number(req.query.limit);
    var offset = Number(req.query.offset);
    limit = validacionLimit(limit);
    offset = validacionOffset(offset)
    validacionToken(req, res)  
    const locs = await eventService.getAllLocations(userId, limit, offset)
    console.log("locs: " + locs)
    if(!locs || locs.length === 0){
        return res.status(400).send({error: "no hay ninguna location para tu usuario."})
    }else{
    return res.status(200).send(locs)
    }
})

locController.get("/:id", DecryptToken, async (req,res) => {
    const userId = req.user?.id; //
    validacionToken(req, res)  
    const idLoc = Number(req.params.id)
 
    const loc = await eventService.getOneLocation(idLoc, userId)
    if(!loc || loc.length === 0)
    {
        res.status(404).send("No se encontró una categoría con ese ID o el local no es suyo")
    }
    return res.status(200).send(loc)

})

locController.post("/", DecryptToken, async (req,res) => {
    validacionToken(req, res)  
    const id_loc = Number(req.body.id_location)
    const name = req.body.name
    const full_address = req.body.full_address
    const max_capacity = Number(req.body.max_capacity)
    const latitude = Number(req.body.latitude)
    const longitude = Number(req.body.longitude)
    const creatUsID = req.user?.id; //

    const result = await eventService.createLocation(id_loc, name, full_address, max_capacity, latitude, longitude, creatUsID)
    switch(result)
    {
        case 1:
            return res.status(400).send("El nombre  (name) o la dirección (full_address) están vacíos o tienen menos de tres (3) letras.")

        case 2:
            return res.status(400).send("El id_location es inexistente.")

        case 3:
            return res.status(400).send("El max_capacity es el número cero (0) o negativo.")

        case 4:
            return res.status(200).send("Local Creado Exitsamente.")
    }

})
locController.put("/", DecryptToken, async (req, res) => {
    try {
        validacionToken(req, res);

        const id = Number(req.body.id);
        const id_loc = Number(req.body.id_location);
        const name = req.body.name;
        const full_address = req.body.full_address;
        const max_capacity = Number(req.body.max_capacity);
        const latitude = Number(req.body.latitude);
        const longitude = Number(req.body.longitude);
        const creatUsID = req.user?.id;

        if (isNaN(id)) {
            console.log("ID inválido:", req.body.id);
            return res.status(400).send("ID inválido");
        }
        
        if (isNaN(id_loc)) {
            console.log("ID de localización inválido:", req.body.id_location);
            return res.status(400).send("ID de localización inválido");
        }
        
        if (isNaN(max_capacity)) {
            console.log("Capacidad máxima inválida:", req.body.max_capacity);
            return res.status(400).send("Capacidad máxima inválida");
        }
        
        if (isNaN(latitude)) {
            console.log("Latitud inválida:", req.body.latitude);
            return res.status(400).send("Latitud inválida");
        }
        
        if (isNaN(longitude)) {
            console.log("Longitud inválida:", req.body.longitude);
            return res.status(400).send("Longitud inválida");
        }
        
        if (isNaN(creatUsID)) {
            console.log("ID de usuario creador inválido:", creatUsID);
            return res.status(400).send("ID de usuario creador inválido");
        }

        const loc = await eventService.getOneLocation(id, creatUsID)
        console.log("LOC: "+loc.name)
        if(!loc || loc.length === 0){
            return res.status(400).send({error: "Su usuario no es propietario de este event_location."})
        }

        const result = await eventService.editLocation(id, id_loc, name, full_address, max_capacity, latitude, longitude, creatUsID);
        
        switch(result) {
            case 1:
                return res.status(400).send("El nombre (name) o la dirección (full_address) están vacíos o tienen menos de tres (3) letras.");
            case 2:
                return res.status(400).send("El id_location es inexistente.");
            case 3:
                return res.status(400).send("El max_capacity es el número cero (0) o negativo.");
            case 4:
                return res.status(200).send("Local editado exitosamente.");
            default:
                return res.status(500).send("Error desconocido");
        }
    } catch (error) {
        console.error("Error en editLocation:", error);
        return res.status(500).send("Error interno del servidor");
    }
});

locController.delete("/:id", DecryptToken, async (req,res) => {
    validacionToken(req, res)  
    const locId = req.params.id
    const result = await eventService.killLoc(locId)
    if(result == 1)
    {
        return res.status(404).send("No se encontró un lugar con ese ID")
    }
    else
    {
        return res.status(200).send("Borrado Exitosamente")
    }
})

export default locController