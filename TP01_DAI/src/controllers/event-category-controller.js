import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import {DecryptToken} from "../Middleware.js" //ver si anda o no con los corchetes estos
const elController = express.Router(); //hacer gitignore para el module

const eventService = new EventService();

elController.get("/event-category", async (req,res) => {

    return res.status(200).send(await eventService.getAllCategories())

})

elController.get("/event-category/:id", async (req,res) => {

    const catId = req.params.id;
    const result = await eventService.getOneCategory(catId)
    if(result.rows[0] == null)
    {
        res.status(404).send("No se encontró una categoría con ese ID")
    }
    return res.status(200).send(result.rows)

})

elController.post("/event-category", async (req,res) => {

    const name = req.query.name
    const output = await eventService.createCategory(name)
    if (output == "1")
    {
        console.log("Pedilo")
        return res.status(400).send("El nombre (name) está vacío o tiene menos de tres (3) letras")
    }
    else
    {
        console.log("me aburro")
        return res.status(200).send("Creado Exitósamente")
    }

})
/* Descomentar después, lo comenté para que se pueda correr sin crashear
elController.put("/event-category", async (req,res) => {

    const idCat = Number(req.query.id)
    const name = req.query.name
    const harvest = eventService.editCategory(idCat, name)


})*/

export default elController