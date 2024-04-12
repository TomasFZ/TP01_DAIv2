import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
const controller = express.Router(); //hacer gitignore para el module

const eventService = new EventService();

//listado de Eventos
console.log("holaaaa")




controller.get("/", (req, res) => {
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
        return res.status(500).send("sgcx") //aca manda el evento buscado
    }
    else
    {
        console.log("escefmdiknoigd")  //aca manda la lista completa de eventos
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
    }
});

//busqueda de un evento
controller.get("/", (req, res) => {
    console.log("tablos controla mi mente")
    const eventoBuscado = eventService.getEventBuscado(limit, offset, req.query.nombre, req.query.categoria, req.query.fecha, req.query.tag);
    if (eventoBuscado != null)
    {
        // return res.status(201).send( //verificar que el nombre sea string, que la fecha sea posible, etc
        //     {
        //         // "id": body.id, 
        //         // "nombre": body.nombre, 
        //         // "fecha": body.fecha, 
        //         // "categoria": body.categoria,
        //         // "tags": body.tags
        //         eventoBuscado
                

        //     }
        //     )
        return res.send(eventoBuscado);
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