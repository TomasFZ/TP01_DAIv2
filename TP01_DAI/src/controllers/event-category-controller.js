import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import {DecryptToken} from "../Middleware.js" 
import {validacionToken, validacionLimit, validacionOffset} from "../funciones.js" 

const elController = express.Router(); //hacer gitignore para el module

const eventService = new EventService();

elController.get("/event-category", DecryptToken, async (req,res) => {
    var limit = Number(req.query.limit);
    var offset = Number(req.query.offset);
    limit = validacionLimit(limit)
    offset = validacionOffset(offset)
    console.log("limit controller: " + limit)
    return res.status(200).send(await eventService.getAllCategories(limit, offset))
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
    const display_order = Number(req.body.display_order)
    const output = await eventService.createCategory(name, display_order)
    if (output == "1")
    {
        return res.status(400).send("El nombre está vacío o tiene menos de tres letras o el display_order está mal.")
    }
    else
    {
        return res.status(200).send("Creado Exitosamente")
    }

})

elController.put("/event-category", DecryptToken, async (req,res) => {

    const idCat = Number(req.body.id)
    const name = req.body.name
    const display_order = req.body.display_order
    const harvest = eventService.editCategory(idCat, name, display_order)
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

elController.delete("/event-category/:id", DecryptToken, async (req,res) => {

    const idToKill = Number(req.params.id)
    console.log("id en controller:" + idToKill)
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