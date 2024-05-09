import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
const controller = express.Router(); //hacer gitignore para el module

const eventService = new EventService();

//listado de Eventos


//lista de puntos hechos (sin contar servicios): 
//listado de eventos (2)
//Busqueda de un evento (3)
//Detalle de un evento (4)
//



console.log("holaaaa")

controller.get("/", (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    var bool = false
    if (req.query.name != null | req.query.category != null | req.query.tag != null | req.query.startDate != null)
    {
        console.log("ok ahora si")
        console.log(req.query.name)
        const eventoBuscado = eventService.getEventBuscado(limit, offset, req.query.name, req.query.category, req.query.startDate, req.query.tag);
        return res.status(500).send(eventoBuscado) //aca manda el evento buscado
    }
    else
    {
        console.log("escefmdiknoigd")  //aca manda la lista completa de eventos
        const allEvents = eventService.getAllEvents(limit, offset);
        console.log("TYPEOF DE ALLEVENTS EN CONTROLLER: "+typeof allEvents)
        console.log(allEvents) //no contiene nada. 
        //console.log("los all events: " + allEvents);
        console.log("I'm about to BLOW")
        return res.send(allEvents);
    }
});

controller.get("/:id", (req, res) =>{ //cuando se quiere buscar uno por id o lo que sea por params y no por query escrita por el usuario, se pone en postman http://localhost:3000/event/1 en lugar de poner una key con value. 
    const limit = req.query.limit;
    const offset = req.query.offset;
    console.log("entro a sans")
    const evento = eventService.getEventDetails(limit, offset, req.params.id);
    return res.status(201).send(evento)
})



controller.put("/", (req, res) => {


})

controller.post("/", (req, res) => {
    const body = req.body
    var queryFiltersUsuarios = Object.keys(req.query).filter((key) => key.includes("name") && key.includes("description") && key.includes("start_date") && key.includes("duration_in_minutes") && key.includes("price") && key.includes("enabled_for_enrollment") && key.includes("max_assistance"))
    const nuevoEvento = eventService.crearEvento(limit, offset, req.query.name, req.query.description, req.query.category, req.query.startDate, req.query.tag)
    return res.send(nuevoEvento)
})

controller.delete("/", (req, res) => {


})


export default controller