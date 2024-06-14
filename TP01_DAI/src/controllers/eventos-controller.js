import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import UserService from "../servicios/servicios-Usuario.js"
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
        if (req.query.event_name != null | req.query.id_event_category != null | req.query.start_date != null  | req.query.tags != null)
        {
            console.log(req.query.start_date)
            const eventoBuscado = await eventService.getEventBuscado(req.query.event_name, req.query.event_category, req.query.start_date, req.query.tags, limit, offset); //falta que con la fecha no funciona. 
            //console.log("nombre evento: " + eventoBuscado.collection.rows[0].name)
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
    const id = req.query.id
    const name = req.query.name
    const description = req.query.description
    const id_event_category = Number(req.query.id_event_category)
    const id_event_location = Number(req.query.id_event_location)
    const start_date = req.query.start_date
    const duration_in_minutes = Number(req.query.duration_in_minutes)
    const price = Number(req.query.price)
    const enabled_for_enrollment = Boolean(req.query.enabled_for_enrollment)
    const max_assistance = Number(req.query.max_assistance)
    const id_creator_user = Number(req.query.id_creator_user)
    const evento = eventService.getEventDetails(id);
    if(evento){
        await eventService.updateEvento(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        return res.send("hola")
    }


})

controller.post("/", async (req, res) => { //implementar el token. Ponerle ("/", DecryptToken, async (req, res) mas tarde. 
    const name = req.query.name
    const description = req.query.description
    const id_event_category = Number(req.query.id_event_category)
    const id_event_location = Number(req.query.id_event_location)
    const start_date = req.query.start_date
    const duration_in_minutes = Number(req.query.duration_in_minutes)
    const price = Number(req.query.price)
    const enabled_for_enrollment = Boolean(req.query.enabled_for_enrollment)
    const max_assistance = Number(req.query.max_assistance)
    const id_creator_user = Number(req.query.id_creator_user)
    
    const result = await eventService.createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)

    return res.send(result)
})

controller.delete("/:id", DecryptToken, async (req, res) => { 
    const id = req.params.id
    console.log("Id de evento a borrar: " + id)
    const validacion=await eventService.deleteEvent(id)
    if(validacion === 0){
        return res.status(200).send("Borrado exitosamente")
    }else if(validacion === 1){
        return res.status(400).send("No se pudo borrar el evento. Existe uno o más usuarios inscriptos.")
    }else if(validacion === 2){ //en caso de que no este autenticado, el error se muestra en DecryptToken. No es necesario escribirlo aca. 
        return res.status(404).send("No se encontró el evento a borrar. ¿Estará bien el ID?")
    }else{
        return res.send("No hay usuario ni evento")
    }
})

controller.post("/:id/enrollment", DecryptToken, async (req, res) => { //primero me tengo que loguear para tener un token valido por 1hora de uso. 
    const eventName = req.body.evento
    userService.enrollUserToEvent(req.body.evento, req.body.username);
    //falta agregar a la base de datos al nuevo usuario registrado. Insert. 
})

controller.delete("/:id/enrollment", async (req, res) => { //Listado de participantes. No esta terminado
    //filtros
    const idEvento = req.body.id
    console.log("idEvento"+idEvento)
    const nombre = req.query.name
    const apellido = req.query.last_name
    const username = req.query.username
    const asistio = req.query.attended
    const rating = req.query.rating

    try{
    const listaUsuarios = await eventService.getUsersFromEvent(idEvento, nombre, apellido, username, asistio, rating)
        console.log("Saliendo Controller...")
        return res.send(listaUsuarios.rows)
    }
    catch(e){
        console.log(e)
    }
})



export default controller