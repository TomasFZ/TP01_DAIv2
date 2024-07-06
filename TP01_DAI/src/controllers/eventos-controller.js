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
    console.log("evento en controller evento en controller: " + evento.event_name)

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

    const event1 = await eventService.getEventDetails(id);
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
        return res.status(400).send({ error: 'nombre y descripcion deben tener al menos 3 caracteres' });
    }

    if (max_assistance) {
        // Aquí deberías obtener max_capacity del id_event_location (supongamos que se obtiene de algún servicio o base de datos)
        const max_capacity = await eventService.getMaxCapacity(id_event_location);
        if (max_assistance > max_capacity) {
            return res.status(400).send({ error: 'Max assistance mayor a max capacity' });
        }
    }

    if (price < 0 || duration_in_minutes < 0) {
        return res.status(400).send({ error: 'precio y duracion menores a 0' });
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
controller.post("/:id/enrollment", DecryptToken, async (req, res) => {
    const userId = req.user?.id; //
    console.log("User ID de token: ", userId);
    
    if (!userId) {
        return res.status(400).send("Usuario no encontrado");
    }

    try {
        const evento = await eventService.getEventDetails(req.params.id);
        //console.log("evento.name: " + evento.rows[0].name)
        console.log("enabled para enrollment: " + evento.enabled_for_enrollment)
        const user = await userService.getUserById(userId);
        console.log("USER: " + userId);
        
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        
        const listaUsers = await eventService.getUsersFromEvent(req.params.id);
        
        let usuarioRegistrado = false; //mala practica de programacion, pero no hay tiempo. 
        for (let i = 0; i < listaUsers.length; i++) {
            if (listaUsers[i].id === user.id) {
                usuarioRegistrado = true;
                break;
            }
        }

       
        if (usuarioRegistrado) {
            return res.status(400).send("Usuario ya registrado en el evento");
        }

        if (!evento) {
            return res.status(404).send("Evento no encontrado");
        }

        if (!evento.enabled_for_enrollment) {
            return res.status(400).send({ error: 'Evento no habilitado para enrollment' });
        }

        const fechaHoy = new Date();
        const eventStartDate = new Date(evento.start_date);
        if (eventStartDate <= fechaHoy) {
            return res.status(400).json({ error: 'Evento ya iniciado' });
        }

        await eventService.enrollUserToEvent(evento.event_id, userId, fechaHoy);
        return res.status(201).send("Usuario registrado en el evento.");
    } catch (e) {
        console.error(e);
        return res.status(500).send("Error interno del servidor");
    }
});


//deleteUserFromEvent
controller.delete("/:id/enrollment", DecryptToken, async (req, res) => {//sacar usuario de un evento
    const idEvento = req.params.id;
    const userId = req.user?.id; //
    console.log("User ID de token: ", userId);
    
    if (!userId) {
        return res.status(400).send("Usuario no encontrado");
    }
  
    try{
    const user = await userService.getUserById(userId);
    const evento = await eventService.getEventDetails(idEvento);

    if(!user){
        return res.status(404).send("Usuario no encontrado");
    }
    if (!evento) {
        return res.status(404).send("Evento no encontrado");
    }

    const listaUsers = await eventService.getUsersFromEvent(req.params.id);
        
        let usuarioRegistrado = false;

        
        for (let i = 0; i < listaUsers.length; i++) {//mala practica de programacion, pero no hay tiempo. 
            if (listaUsers[i].id === user.id) {
                usuarioRegistrado = true;
                console.log("es true")
                break;
            }
        }

    if (!usuarioRegistrado) {
        return res.status(400).send("Usuario no registrado en el evento");
    }

    const fechaHoy = new Date();
    const eventStartDate = new Date(evento.start_date);
    if (eventStartDate <= fechaHoy) {
      return res.status(400).json({ error: 'Evento ya iniciado o pasado' });
    }

    await eventService.deleteUserFromEvent(idEvento, userId); //

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
controller.patch("/:id/enrollment/:rating", DecryptToken, async (req, res) => {
    const enrollmentId = req.params.id;
    const rating = Number(req.params.rating);
    const { feedback: observations } = req.body;

    // Validación del rating
    if (isNaN(rating) || rating < 1 || rating > 10) {
        return res.status(400).send({ error: 'El rating debe ser un número entre 1 y 10.' });
    }

    try {
        const events = await eventService.getAllEvents();
        const event_enrollment = await eventService.getEventEnrollmentsById(enrollmentId);

        // const foundEvent = events.rows.find(event => event.id === event_enrollment.id_event);
        var foundEvent = null;

for (let i = 0; i < events.collection.length; i++) {//mala practica de programacion, pero no hay tiempo. 
    console.log("EVENT COLLECTION ID "+events.collection[i].id + " + EVENT_ENROLLMENTS ID "+event_enrollment.id_event)
    if (events.collection[i].id === event_enrollment.id_event) {
        console.log("dentroDelBucleuuuu " +events.collection[i].id)
        foundEvent = events.collection[i];
        break;
    }
}

        if (!foundEvent) {
            return res.status(404).send({ error: 'El evento asociado a esta inscripción no existe.' });
        }

        const fechaHoy = new Date();
        if (foundEvent.start_date > fechaHoy) {
            return res.status(400).send({ error: 'El evento asociado a esta inscripción no ha finalizado aún.' });
        }

        await eventService.updateRatingEvent(enrollmentId, rating, observations);

        return res.status(200).send({ message: 'El rating y feedback fueron actualizados correctamente.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error interno del servidor.' });
    }
});


export default controller