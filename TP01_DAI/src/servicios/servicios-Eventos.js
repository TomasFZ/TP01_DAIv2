//import pg from "pg";
//mjs

//ATENCIÓN: PARA LA PRIMERA ENTREGA SE TIENE QUE ENVIAR LOS CONTROLLERS CON TODO LO DEMÁS HARDCODEADO. ES DECIR, LOS OBJETOS EVENTO DE ACA SON ESCRITOS EN VEZ DE LLAMAR A LA DB ETC ETC. 
import { query } from "express";
import EventRepository from "../repositories/events-repository.js"
import UserRepository from "../repositories/usuario-repository.js"
const eventRepository = new EventRepository();
const userRepository = new UserRepository()
export default class EventService{

    async getAllEvents(limit, offset) {
        const listaEventos = await eventRepository.getAllEvents(limit, offset);
        // Devuelve directamente los eventos (lista) del repositorio
       

        const nextPage = `${"http://localhost:3000/event"}?limit=${limit}&offset=${offset + 1}`;
        //return listaEventos
        return {
            "collection": listaEventos, 
            "pagination": {
                "limit": limit,
                "offset": offset,
                "nextPage": nextPage, //poner el http 
        }
      }}
    

    async getEventBuscado(nombre, categoria, fecha, tag)
    {
        

        const eventoBuscado = await eventRepository.getEventoBuscado(nombre, categoria, fecha, tag) 
        //console.log("nombre evento: " + eventoBuscado.nombre)
        
        return eventoBuscado;
        
    }
    async getEventDetails(idEvento) //en este creo que no va limit-offset
    {
       
        const eventoBuscado = await eventRepository.getEventoPorId(idEvento)
        
        return eventoBuscado

    }





    async createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
    {
        /*El name o description están vacíos o tienen menos de tres (3) letras.
        El max_assistance es mayor que el max_capacity del  id_event_location.
        El price o duration_in_minutes son menores que cero.*/

        if(name == null | description == null)
        {
            return "Error: El nombre o la descripción son nulos"
        }
        const max_capacity = (id_event_location !== null) ? await eventRepository.getMaxCapacity(id_event_location) : null;
        console.log("cap: " + max_capacity + " ass: " + max_assistance)
        if(max_assistance > max_capacity | max_capacity == null)
        {
            return "Error: El ID de localización es nulo o la localización no tiene la capacidad para alojar la capacidad máxima insertada"
        }
        if(price < 0 | duration_in_minutes < 0)
        {
            return "Error: El precio es menor a 1 o el evento dura ménos de 1 minuto"
        }

        const result = await eventRepository.createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
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


async getUsersFromEvent(idEvento, nombre, apellido, username, asistio, rating){
    const listaUsers = await userRepository.getUsuariosDeUnEvento(idEvento, nombre, apellido, username, asistio, rating);
    console.log("Saliendo Services...")

    const nextPage = `${"http://localhost:3000/event/id/enrollment"}?limit=${limit}&offset=${offset + 1}`;
    //return listaUsers
    return {
        "collection": listaUsers, 
        "pagination": {
            "limit": limit,
            "offset": offset,
            "nextPage": nextPage //poner el http 
    }
}}

async updateRatingEvent(idEvento, rating, observations){
    await userRepository.updateEventEnrollments(idEvento, rating, observations);
}

async enrollUserToEvent(idEvento, idUser, fechaInscripcion){
    await eventRepository.enrollUserToEvent(idEvento, idUser, fechaInscripcion);
}


async deleteUserFromEvent(idEvento, idUser){
    await eventRepository.deleteUserFromEvent(idEvento, idUser);
}

async getAllCategories(limit, offset)
{
    const listaCategories = await eventRepository.getAllCategories(limit, offset);
    const nextPage = `${"http://localhost:3000/event-category"}?limit=${limit}&offset=${offset + 1}`;

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

async createCategory(name)
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
    }
    else
    {
        return await eventRepository.createCategory(name)
    }
}

async editCategory(id, name)
{
    if(name == null)
    {
        return 1
    }
    else if(name.length < 3)
    {
        return 1
    }
    else if((await eventRepository.getOneCategory(id)) == null)
    {
        return 2
    }
    else
    {
        return await eventRepository.editCategory(id, name)
    }
}

async killCategory(idToKill)
{
    if((await eventRepository.getOneCategory(id)) == null)
    {
        return 1
    }
    else
    {
        return await eventRepository.murderCategory(id)
    }
}

}

