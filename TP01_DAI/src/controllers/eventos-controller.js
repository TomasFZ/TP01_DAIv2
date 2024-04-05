import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
const controller = express.Router(); //hacer gitignore para el module

const eventService = new EventService();

//listado de Eventos
console.log("holaaaa")




controller.get("/", (req, res) => {
    // try {
    //     const limit = req.query.limit;
    //     const offset = req.query.offset;
    //     const allEvents = eventService.getAllEvents(limit, offset);
    //     console.log(allEvents);
    //     return res.send(allEvents);
    // } catch (error) {
    //     console.log("Error al obtener los eventos", error);
    //     return res.status(500).send("Error al obtener los eventos");
    // }
        const limit = req.query.limit;
        const offset = req.query.offset;
        const allEvents = eventService.getAllEvents(limit, offset);
        console.log("los all events: " + allEvents);
        return res.send(allEvents);
});

//busqueda de un evento
controller.get("/:nombre, categoria, fecha, tag", (req, res) => {
    const eventoBuscado = eventService.getEventBuscado(limit, offset, nombre, categoria, fecha, tag);
    if (eventoBuscado != null)
    {
        return res.status(201).send( //verificar que el nombre sea string, que la fecha sea posible, etc
            {
                // "id": body.id, 
                // "nombre": body.nombre, 
                // "fecha": body.fecha, 
                // "categoria": body.categoria,
                // "tags": body.tags

                

            }
            )
    }
    else
    {
        return res.status(404).send("Error no se encontró un evento");
    }
    
})

controller.get("/event:id", (req, res) =>{
    const evento = eventService.getEventDetails(limit, offset, params.id);
    return res.status(201).send(
        {
            "id": body.id, 
            "nombre": body.nombre, 
            "fecha": body.fecha, 
            "categoria": body.categoria,
            "tags": body.tags
        })
})



controller.get("/participants", (req, res) => {


})


export default controller