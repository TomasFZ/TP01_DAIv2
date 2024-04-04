import express from "express";

const controller = express.Router(); //hacer gitignore para el module

const eventService = new EventService();

//listado de Eventos
controller.get("/event", async (req, res) => {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const allEvents = eventService.getAllEvents(limit, offset);
        console.log(allEvents);
        return res.send(allEvents);
    } catch (error) {
        console.log("Error al obtener los eventos", error);
        return res.status(500).send("Error al obtener los eventos");
    }
});

//busqueda de un evento
controller.get("/event/:nombre, fecha, categoria, tag", (req, res) => {
    const listaEventosBuscados = eventService.getEventBuscado(limit, offset, nombre, categoria, fecha, tag);
    return res.status(201).send(
    {
        "id": body.id, 
        "nombre": body.nombre, 
        "fecha": body.fecha, 
        "categoria": body.categoria,
        "tags": body.tags
    }
    )
})

controller.get("/event:id", (req, res) =>{
    const evento = eventService.getEventDetails(params.id);
    return res.status(201).send(
        {
            "id": body.id, 
            "nombre": body.nombre, 
            "fecha": body.fecha, 
            "categoria": body.categoria,
            "tags": body.tags
        })
}



controller.get("/participants", (req, res) => {


})