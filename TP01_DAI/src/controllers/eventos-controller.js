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
    var queryFilters = Object.keys(req.query).filter((key) => key.includes("name") | key.includes("category") | key.includes("startDate") | key.includes("tag"))
    //if (Object.keys(req.query).length > "0")
    console.log(queryFilters[0])
    var bool = false
    for(var i=0; i < queryFilters.length; i++)
    {
        if(queryFilters[i] == "name" | queryFilters[i] == "category" | queryFilters[i] == "tag" | queryFilters[i] == "startDate"){
            bool = true
        }
    }
    if (bool)
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
        console.log("los all events: " + allEvents);
        
        return res.send(allEvents);
    }
});

controller.get("/:id", (req, res) =>{
    const limit = req.query.limit;
    const offset = req.query.offset;
    console.log("entro a sans")
    const evento = eventService.getEventDetails(limit, offset, req.params.id);
    return res.status(201).send(evento)
        // {
        //     "id": body.id, 
        //     "nombre": body.nombre, 
        //     "fecha": body.fecha, 
        //     "categoria": body.categoria,
        //     "tags": body.tags
        // })
})



controller.put("/", (req, res) => {


})

controller.post("/", (req, res) => {

    const nuevoEvento = eventService.crearEvento(limit, offset, req.query.name, req.query.description, req.query.category, req.query.startDate, req.query.tag)

})

controller.delete("/", (req, res) => {


})


export default controller