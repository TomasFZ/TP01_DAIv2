import express from "express";
import EventService from "../servicios/servicios-Eventos.js"
import UserService from "../servicios/servicios-Usuario.js"
import {DecryptToken} from "../Middleware.js" //ver si anda o no con los corchetes estos
import {validacionToken} from "../token.js" 
const controller = express.Router(); //hacer gitignore para el module

const eventService = new EventService();
const userService = new UserService();


console.log("holaaaa")

controller.get("/", async (req, res) => {
    var limit = Number(req.query.limit);
    var offset = Number(req.query.offset);//verificar si son num y si existen. 
    if (isNaN(limit) || isNaN(offset)) {
        limit = 100;
        offset = 1;
    }
        if (req.query.event_name != null | req.query.category != null | req.query.start_date != null  | req.query.tags != null)
        {
            console.log("categoria: "+req.query.category)
            const eventoBuscado = await eventService.getEventBuscado(req.query.event_name, req.query.category, req.query.start_date, req.query.tags); //falta que con la fecha no funciona. 
            if(eventoBuscado.rows[0] == null)
            {
                return res.status(404).send("evento no existe")
            }else{
            return res.status(500).send(eventoBuscado.rows) //aca manda el evento buscado
            }
        }
        else
        {
            // if(limit >= 0 & offset >= 0) //si no ingresa limit y offset se jode y le traemos todo
            //     {
            const allEvents = await eventService.getAllEvents(limit, offset); //aca van todos los events
            return res.send(allEvents);
        }
        // else
        // {
        //     return res.send("Offset o limit invalidos")
        // }
        }
    
    
    );
//getEventDetails
controller.get("/:id", async (req, res) =>{ //cuando se quiere buscar uno por id o lo que sea por params y no por query escrita por el usuario, se pone en postman http://localhost:3000/event/1 en lugar de poner una key con value. 
    console.log("id: " + req.params.id)
    const evento = await eventService.getEventDetails(req.params.id);
    if (!evento) {
        return res.status(404).send("Evento no encontrado");
    }
    return res.status(200).send(evento) //agregar un return 404 si no reconoce el id
    
})
//updateEvent
controller.put("/", DecryptToken, async (req, res) => {//implementar el token. Ponerle ("/", Middleware, async (req, res) mas tarde. 
    
    validacionToken(req, res);
    const id = req.body.id
    const name = req.body.name
    const description = req.body.description
    const id_event_category = Number(req.body.id_event_category)
    const id_event_location = Number(req.body.id_event_location)
    const start_date = req.body.start_date
    const duration_in_minutes = Number(req.body.duration_in_minutes)
    const price = Number(req.body.price)
    const enabled_for_enrollment = Boolean(req.body.enabled_for_enrollment)
    const max_assistance = Number(req.body.max_assistance)
    const id_creator_user = Number(req.body.id_creator_user)

    const event1 = await eventService.getEventById(id);
    if(event1.rows[0] === undefined)
        {
            return res.status(404).send("evento no existe")
        }

    if (!name || !description || name.length < 3 || description.length < 3) {
        return res.status(400).json({ error: 'nombre y descripcion deben tener al menos 3 caracteres' });
    }

    if (max_assistance) {
        const max_capacity = await eventService.getMaxCapacity(id_event_location);
        if (max_assistance > max_capacity) {
            return res.status(400).json({ error: 'Max assistance mayor a max capacity' });
        }
    }

    if (price < 0 || duration_in_minutes < 0) {
        return res.status(400).json({ error: 'precio y/o duracion menores a 0' });
    }

    const evento = eventService.getEventDetails(id);
    if(evento){
        try{
        await eventService.updateEvento(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        return res.send("actualizado")
        }catch(e){
            console.log(e)
        }
    }else if(!evento){
        return res.status(404).send("error. El evento no existe.")
    }


})
//createEvent
controller.post("/", DecryptToken, async (req, res) => { //implementar el token. Ponerle ("/", DecryptToken, async (req, res) mas tarde. 
    
    // if(req.user === undefined){
    //     return res.status(400).send("Error. Token incorrecto.")
    // }
    validacionToken(req, res);
    const name = req.body.name
    const description = req.body.description
    const id_event_category = Number(req.body.id_event_category)
    const id_event_location = Number(req.body.id_event_location)
    const start_date = req.body.start_date
    const duration_in_minutes = Number(req.body.duration_in_minutes)
    const price = Number(req.body.price)
    const enabled_for_enrollment = Boolean(req.body.enabled_for_enrollment)
    const max_assistance = Number(req.body.max_assistance)
    const id_creator_user = Number(req.body.id_creator_user)
    
    
    if (!name || !description || name.length < 3 || description.length < 3) {
        return res.status(400).json({ error: 'nombre y descripcion deben tener al menos 3 caracteres' });
    }

    if (max_assistance) {
        // Aquí deberías obtener max_capacity del id_event_location (supongamos que se obtiene de algún servicio o base de datos)
        const max_capacity = await eventService.getMaxCapacity(id_event_location);
        if (max_assistance > max_capacity) {
            return res.status(400).json({ error: 'Max assistance mayor a max capacity' });
        }
    }

    if (price < 0 || duration_in_minutes < 0) {
        return res.status(400).json({ error: 'precio y duracion menores a 0' });
    }

    try{
    const result = await eventService.createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)

    return res.send(result)
    }catch(e){
        return res.status(500).send("error");
    }
})
//deleteEvent
controller.delete("/:id", DecryptToken, async (req, res) => { 
    validacionToken(req, res);
    const id = req.params.id
    const event1 = await eventService.getEventById(id);
    if(event1.rows[0] === undefined)
        {
            return res.status(404).send("evento no existe")
        }

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
//registerUserToEvent
controller.post("/:id/enrollment", DecryptToken, async (req, res) => { //primero me tengo que loguear para tener un token valido por 1hora de uso. 
    
    const username = req.body.username
    const fechaInscripcion = req.body.fechaInscripcion;
    try{
    const evento = await eventService.getEventDetails(req.params.id);
    const user = await userService.findUsername(username);
    if(!user){
        return res.status(404).send("Usuario no encontrado");
    }
    const listaUsers = await eventService.getUsersFromEvent(req.params.id);
    const validacionUsuarioRegistrado = listaUsers.some(userI => userI.id === user.id);

    if (validacionUsuarioRegistrado) {
        return res.status(400).send("Usuario ya registrado en el evento");
    }
    if (!evento) {
        return res.status(404).send("Evento no encontrado");
    }
    if (!evento.enabled_for_enrollment) {
        return res.status(400).json({ error: 'Evento no habilitado para enrollment' });
    }
    const fechaHoy = new Date();
    const eventStartDate = new Date(evento.start_date);
    if (eventStartDate <= fechaHoy) {
      return res.status(400).json({ error: 'Evento ya iniciado' });
    }
    await eventService.enrollUserToEvent(evento.id, user.id, fechaInscripcion);
    return res.status(201).send("Usuario registrado en el evento.");
}catch(e){console.log(e)}

})
//deleteUserFromEvent
controller.delete("/:id/enrollment", DecryptToken, async (req, res) => {//sacar usuario de un evento
    const idEvento = req.params.id;
    const username = req.body.username;
    try{
    const user = await userService.findUsername(username);
    const evento = await eventService.getEventDetails(req.params.id);

    if(!user){
        return res.status(404).send("Usuario no encontrado");
    }
    if (!evento) {
        return res.status(404).send("Evento no encontrado");
    }

    const listaUsers = await eventService.getUsersFromEvent(req.params.id);
    const validacionUsuarioRegistrado = listaUsers.some(userI => userI.id === user.id);

    if (!validacionUsuarioRegistrado) {
        return res.status(400).send("Usuario no registrado en el evento");
    }

    const fechaHoy = new Date();
    const eventStartDate = new Date(evento.start_date);
    if (eventStartDate <= fechaHoy) {
      return res.status(400).json({ error: 'Evento ya iniciado o pasado' });
    }

    await eventService.deleteUserFromEvent(idEvento, user.id); //

    return res.status(200).send("Usuario removido de su suscripción al evento.");
}catch(e){
    console.log(e)
}
})
//ListadoParticipantes de un event
//por las dudas el siguiente controller estaba en .delete, pero es Listado de participantes. Ahora esta en .get.
controller.get("/:id/enrollment", async (req, res) => { //Listado de participantes. 
    //filtros
    const idEvento = Number(req.params.id) //params
    console.log("idEvento"+idEvento)
    const nombre = req.query.name
    const apellido = req.query.last_name
    const username = req.query.username
    const asistio = req.query.attended
    const rating = Number(req.query.rating)

    const limit = req.query.limit;
    const offset = req.query.offset; //verificar que existan
    console.log("asistio controller: " + asistio + "asistio og: " + req.query.attended)
    try{
    const listaUsuarios = await eventService.getUsersFromEvent(idEvento, nombre, apellido, username, asistio, rating, limit, offset)
        console.log("Saliendo Controller...")
        return res.send(listaUsuarios)
    }
    catch(e){
        console.log(e)
    }
})
//user pone rating a evento
controller.patch("/:id/enrollment/rating", DecryptToken, async (req, res) => { //chequear si anda
    const idEvento = req.params.id;
    const enrollmentId = req.params.enrollmentId;
    const rating = req.params.rating
    const { feedback: observations } = req.body;
    

    if (rating < 1 || rating > 10 && typeof(rating) !== Number) {
        return res.status(400).send({ error: 'El rating debe estar entre 1 y 10.' });
    }

    try {
        const event = await eventService.getEventDetails(idEvento);
        if (!event) {
            return res.status(404).send({ error: 'El evento no existe.' });
        }
        const fechaHoy = new Date();
        if (event.start_date > fechaHoy) {
            return res.status(400).send({ error: 'El evento no ha finalizado aún.' });
        }

        // Actualizar el rating y el feedback del evento
        await eventService.updateRatingEvent(enrollmentId, rating, observations);

        return res.status(200).send({ message: 'El rating y feedback fueron actualizados correctamente.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error interno del servidor.' });
    }
})

export default controller