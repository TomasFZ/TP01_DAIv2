//import pg from "pg";
//mjs

//ATENCIÓN: PARA LA PRIMERA ENTREGA SE TIENE QUE ENVIAR LOS CONTROLLERS CON TODO LO DEMÁS HARDCODEADO. ES DECIR, LOS OBJETOS EVENTO DE ACA SON ESCRITOS EN VEZ DE LLAMAR A LA DB ETC ETC. 
import e, { query } from "express";
import EventRepository from "../repositories/events-repository.js"
import UserRepository from "../repositories/usuario-repository.js"
const eventRepository = new EventRepository();
const userRepository = new UserRepository()
export default class EventService{

    async getAllEvents(limit, offset) {
        const listaEventos = await eventRepository.getAllEvents(limit, offset);
        // Devuelve directamente los eventos (lista) del repositorio
       //console.log("listaEventosAllEvents: " + listaEventos[0].name)

        const nextPage = `${"http://localhost:3000/api/event"}?limit=${limit}&offset=${offset + 1}`;
        //return listaEventos
        return {
            "collection": listaEventos, 
            "pagination": {
                "limit": limit,
                "offset": offset,
                "nextPage": nextPage
        }
      }}
    
      async getEventBuscado(nombre, categoria, fecha, tag, limit, offset) {
        const eventoBuscado = await eventRepository.getEventoBuscado(nombre, categoria, fecha, tag, limit, offset);
        return eventoBuscado;
    }
    async getEventDetails(idEvento)
    {
        const eventoBuscado = await eventRepository.getEventoPorId(idEvento)
        console.log("evento buscado en service: " + eventoBuscado.event_name)
        return eventoBuscado

    }


    async createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
    {
        /*El name o description están vacíos o tienen menos de tres (3) letras.
        El max_assistance es mayor que el max_capacity del  id_event_location.
        El price o duration_in_minutes son menores que cero.*/
        console.log("idroigjosdhg: NAN" + id_event_location)
        if(name == null | description == null)
        {
            return "Error: El nombre o la descripción son nulos"
        }
        const max_capacity = (id_event_location !== null) ? await eventRepository.getMaxCapacity(id_event_location) : null;
        console.log("cap: " + max_capacity + " assistance: " + max_assistance)
        if(max_assistance > max_capacity | max_capacity == null)
        {
            return "Error: El ID de localización es nulo o la localización no tiene la capacidad para alojar la capacidad máxima insertada"
        }
        if(price < 0 | duration_in_minutes < 0)
        {
            return "Error: El precio es menor a 1 o el evento dura menos de 1 minuto"
        }

        const result = await eventRepository.createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        console.log("Resultado: " + result)
        return result
    }

    async deleteEvent(id){
        const validacion = await eventRepository.deleteEventById(id)
        if(validacion === 0){
            return 0
        }else if(validacion === 1){
            return 1
        }else if(validacion === 2){
            return 2
        }else{
            return 3
        }
    }

    async updateEvento(id, nombreEvento, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        await eventRepository.updateEvent(id, nombreEvento, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
    }

    async getMaxCapacity(idEventLocation){
        const maxCapacity = await eventRepository.getMaxCapacity(idEventLocation);
        return maxCapacity;
    }


    async getUsersFromEvent(idEvento, nombre, apellido, username, asistio, rating, limit, offset) {
        const listaUsers = await userRepository.getUsuariosDeUnEvento(idEvento, nombre, apellido, username, asistio, rating, limit, offset);
        const nextPage = `http://localhost:3000/api/event/id/enrollment?limit=${limit}&offset=${offset + 1}`;
        
        return {
            "collection": listaUsers,
            "pagination": {
                "limit": limit,
                "offset": offset,
                "nextPage": nextPage
            }
        };
    }
    

async updateRatingEvent(id, rating, observations, idUser){
    await eventRepository.updateEventEnrollments(id, rating, observations, idUser);
}

async enrollUserToEvent(idEvento, idUser, fechaInscripcion){
    await eventRepository.enrollUserToEvent(idEvento, idUser, fechaInscripcion);
}


async deleteUserFromEvent(idEvento, idUser){
    await eventRepository.deleteUserFromEvent(idEvento, idUser);
}

async getAllCategories(limit, offset)
{
    console.log("limit service: " + limit)

    const listaCategories = await eventRepository.getAllCategories(limit, offset);
    const nextPage = `${"http://localhost:3000/api/event-category"}?limit=${limit}&offset=${offset + 1}`;

        return {
            "collection": listaCategories, 
            "pagination": {
                "limit": limit,
                "offset": offset,
                "nextPage": nextPage //poner el http 
        }
      }
  
}

async getOneCategory(id)
{
    return await eventRepository.getOneCategory(id)
}

async createCategory(name, display_order)
{
    if(name == null)
    {
        console.log("soy null")
        return 1
    }
    else if(name.length < 3)
    {
        console.log("Soy menor de 3")
        return 1
    }else if(display_order <= 0 || isNaN(display_order)){
        return 1
    }   
    else
    {
        return await eventRepository.createCategory(name, display_order)
    }
}

async editCategory(id, name, display_order)
{
    if(name == null)
    {
        return 1
    }
    else if(name.length < 3)
    {
        return 1
    }else if(display_order <= 0 || isNaN(display_order)){
        return 1
    }   
    else if((await eventRepository.getOneCategory(id)) == null)
    {
        return 2
    }
    else
    {
        return await eventRepository.editCategory(id, name, display_order)
    }
}

async killCategory(idToKill)
{
    if((await eventRepository.getOneCategory(idToKill)) == null)
    {
        return 1
    }
    else
    {
        return await eventRepository.murderCategory(idToKill)
    }
}

async getAllLocations(userId, limit, offset)
{
    return await eventRepository.getAllLocations(userId, limit, offset)
}

async getOneLocation(id, id_creator_user)
{
    
    const result = await eventRepository.getOneLocation(id, id_creator_user)
    // if(result[0] == undefined)
    // {
    //     return 1
    // }
    // else if(result[0].id_creator_user != id_creator_user)
    // {
    //     return 1
    // }
    return result
}

async createLocation(id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user)
{
    if(name === undefined || full_address === undefined)
    {
        return 1
    }
    if(name.length < 3 || full_address.length < 3)
    {
        return 1
    }
    const isIdLocReal = await eventRepository.locationCheck(id_location)
    const locationId = isIdLocReal[0]?.id
    console.log("id location: " + locationId)
    if(isIdLocReal.length === 0)
    {
        return 2
    }
    if(max_capacity < 1)
    {
        return 3
    }

    return await eventRepository.createLocation(id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user)
}

async editLocation(id, id_location, name, full_address, max_capacity, latitude, longitude, creatUsID) {
    if (name == null || full_address == null || name.length < 3 || full_address.length < 3) {
        return 1;
    }

    const isIdLocReal = await eventRepository.locationCheck(id_location);
    if (isIdLocReal.length === 0) {
        return 2;
    }

    if (max_capacity < 1) {
        return 3;
    }

    //TODO: Checkear si le pertenece al usuario

    try {
        return await eventRepository.editLocation(id, id_location, name, full_address, max_capacity, latitude, longitude, creatUsID);
    } catch (error) {
        console.error("Error en editLocation del servicio:", error);
        throw error;
    }
}

async killLoc(id, id_creator_user)
{
    const isReal = await eventRepository.getOneLocation(id, id_creator_user)
    console.log("is real: " + isReal)
    if(isReal.length === 0 || !isReal)
    {
        return 1
    }
    else
    {
        await eventRepository.murderLoc(id)
         return 0
    }
}

async getEventEnrollmentsById(id){
    const eventEnrollment = await eventRepository.getEventEnrollmentsById(id);
    //console.log("eventEnrollment.id_event en service:" + eventEnrollment.id_event)
    return eventEnrollment;
}
}

