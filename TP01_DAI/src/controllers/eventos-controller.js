import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import {DecryptToken} from "../Middleware.js" //ver si anda o no con los corchetes estos
const controller = express.Router(); //hacer gitignore para el module

const eventService = new EventService();
const userService = new UserService();
//listado de Eventos


//lista de puntos hechos (sin contar servicios): 
//listado de eventos (2)
//Busqueda de un evento (3)
//Detalle de un evento (4)
//

console.log("holaaaa")

controller.get("/", async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;//verificar si son num y si existen. 
    if(limit >= 0 & offset >= 0)
    {
        if (req.query.name != null | req.query.category != null | req.query.tag != null | req.query.startDate != null)
        {
            console.log(req.query.name)
            const eventoBuscado = await eventService.getEventBuscado(req.query.name, req.query.category, req.query.startDate, req.query.tag);
            console.log("nombre evento: " + eventoBuscado.name)
            return res.status(500).send(eventoBuscado) //aca manda el evento buscado
        }
        else
        {
            const allEvents = await eventService.getAllEvents(limit, offset); //aca van todos los events
            return res.send(allEvents);
        }
    }
    else
    {
        return res.send("Offset o limit invalidos")
    }
});

controller.get("/:id", async (req, res) =>{ //cuando se quiere buscar uno por id o lo que sea por params y no por query escrita por el usuario, se pone en postman http://localhost:3000/event/1 en lugar de poner una key con value. 
    const limit = req.query.limit;
    const offset = req.query.offset;
    if(limit >= 0 && offset >= 0){
    console.log("entro a sans")
    const evento = await eventService.getEventDetails(limit, offset, req.params.id);
    return res.status(200).send(evento) //agregar un return 404 si no reconoce el id
    }else{
        return res.status(404).send("Offset o limit invalidos")
    }
})

controller.put("/", async (req, res) => {//implementar el token. Ponerle ("/", Middleware, async (req, res) mas tarde. 


})

controller.post("/", async (req, res) => { //implementar el token. Ponerle ("/", Middleware, async (req, res) mas tarde. 
    const body = req.body
    var queryFiltersUsuarios = Object.keys(req.query).filter((key) => key.includes("name") && key.includes("description") && key.includes("start_date") && key.includes("duration_in_minutes") && key.includes("price") && key.includes("enabled_for_enrollment") && key.includes("max_assistance"))
    const nuevoEvento = eventService.crearEvento(limit, offset, req.query.name, req.query.description, req.query.category, req.query.startDate, req.query.tag)
    return res.send(nuevoEvento)
})

controller.delete("/", async (req, res) => { 


})



controller.post("/:id/enrollment", DecryptToken, async (req, res) => {
    const user = req.body.username
    const password = req.body.password
    const token = userService.ObtenerToken(req.body.id, username)
})




export default controller