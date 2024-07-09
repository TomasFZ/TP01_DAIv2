import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import {DecryptToken} from "../Middleware.js" 
import {validacionToken} from "../funciones.js" 

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
    else
    {
        return res.status(200).send(result)
    }

})

elController.post("/event-category", DecryptToken, async (req,res) => {

    const name = req.body.name
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





export default elController