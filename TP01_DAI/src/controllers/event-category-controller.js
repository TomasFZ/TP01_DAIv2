import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import {DecryptToken} from "../Middleware.js" 
const elController = express.Router(); //hacer gitignore para el module

const eventService = new EventService();

elController.get("/event-category", DecryptToken, async (req,res) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    if(limit >= 0 & offset >= 0)
    {
    return res.status(200).send(await eventService.getAllCategories(limit, offset))
    }else return res.send("Offset o limit invalidos")
})

elController.get("/event-category/:id", DecryptToken, async (req,res) => {

    const catId = req.params.id;
    const result = await eventService.getOneCategory(catId)
    if(result[0] == null)
    {
        res.status(404).send("No se encontró una categoría con ese ID")
    }
    return res.status(200).send(result)

})

elController.post("/event-category", DecryptToken, async (req,res) => {

    const name = req.query.name
    const output = await eventService.createCategory(name)
    if (output == "1")
    {
        return res.status(400).send("El nombre está vacío o tiene menos de tres letras")
    }
    else
    {
        return res.status(200).send("Creado Exitosamente")
    }

})

elController.put("/event-category", DecryptToken, async (req,res) => {

    const idCat = Number(req.query.id)
    const name = req.query.name
    const harvest = eventService.editCategory(idCat, name)
    if(harvest == 1)
    {
        return res.status(400).send("El nombre (name) está vacío o tiene menos de tres letras.")
    }
    else if (harvest == 2)
    {
        return res.status(404).send("ID no existente.")
    }
    else
    {
        return res.status(200).send("Editado Exitosamente")
    }

})

elController.delete("/event-category", DecryptToken, async (req,res) => {

    const idToKill = Number(req.query.id)
    const crimeScene = eventService.killCategory(idToKill)
    if(crimeScene == 1)
    {
        return res.status(404).send("ID no existente.")
    }
    else
    {
        return res.status(200).send("Borrado Exitosamente.")
    }
})

elController.get("/event-location", DecryptToken, async (req,res) => {

    const locs = eventService.getAllLocations()
    return res.status(200).send(locs)

})

elController.get("/event-location/:id", DecryptToken, async (req,res) => {
    //TODO: Agregar el checkeo de ID Logueado
    const idLoc = Number(req.params.id)
    const userLog = req.user
    const output = await eventService.getOneLocation(idLoc, userLog.id)
    if(output == 1)
    {
        res.status(404).send("No se encontró una categoría con ese ID o el local no es suyo")
    }
    return res.status(200).send(output)

})

elController.post("/event-location", DecryptToken, async (req,res) => {
    //TODO: Asignar el id_creator_user al usuario logueado
    const id_loc = Number(req.query.id_location)
    const name = req.query.name
    const full_address = req.query.full_address
    const max_capacity = Number(req.query.max_capacity)
    const latitude = Number(req.query.latitude)
    const longitude = Number(req.query.longitude)
    const creatUsID = req.user.id

    const result = eventService.createLocation(id_loc, name, full_address, max_capacity, latitude, longitude, creatUsID)
    switch(result)
    {
        case 1:
            return res.status(400).send("El nombre  (name) o la dirección (full_address) están vacíos o tienen menos de tres (3) letras.")
        break;

        case 2:
            return res.status(400).send("El id_location es inexistente.")
        break;

        case 3:
            return res.status(400).send("El max_capacity es el número cero (0) o negativo.")
        break;

        case 4:
            return res.status(200).send("Local Creado Exitsamente.")
        break;
    }

})

elController.put("/event-location", DecryptToken, async (req,res) => {
    const id = Number(req.query.id)
    const id_loc = Number(req.query.id_location)
    const name = req.query.name
    const full_address = req.query.full_address
    const max_capacity = Number(req.query.max_capacity)
    const latitude = Number(req.query.latitude)
    const longitude = Number(req.query.longitude)
    const creatUsID = req.user.id

    const result = await eventService.editLocation(id, id_loc, name, full_address, max_capacity, latitude, longitude, creatUsID)
    switch(result)
    {
        case 1:
            return res.status(400).send("El nombre  (name) o la dirección (full_address) están vacíos o tienen menos de tres (3) letras.")
        break;

        case 2:
            return res.status(400).send("El id_location es inexistente.")
        break;

        case 3:
            return res.status(400).send("El max_capacity es el número cero (0) o negativo.")
        break;

        case 4:
            return res.status(200).send("Local Creado Exitosamente.")
        break;
    }
})

elController.delete("/event-location/:id", DecryptToken, async (req,res) => {

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

export default elController