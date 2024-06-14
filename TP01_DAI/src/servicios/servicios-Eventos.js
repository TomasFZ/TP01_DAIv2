//import pg from "pg";
//mjs

//ATENCIÓN: PARA LA PRIMERA ENTREGA SE TIENE QUE ENVIAR LOS CONTROLLERS CON TODO LO DEMÁS HARDCODEADO. ES DECIR, LOS OBJETOS EVENTO DE ACA SON ESCRITOS EN VEZ DE LLAMAR A LA DB ETC ETC. 
import { query } from "express";
import EventRepository from "../repositories/events-repository.js"
import UserRepository from "../repositories/usuario-repository.js"
export default class EventService{

    async getAllEvents(limit, offset) {
        const eventRepository = new EventRepository();
        console.log("detdetdetdet")
        const listaEventos = await eventRepository.getAllEvents(limit, offset);
        //console.log("SANS SKIBIDI SIGMA: " + listaEventos[0].name)
        console.log("akakakkakakkakakakak")
        // Devuelve directamente los eventos (lista) del repositorio
        console.log("TYPEOF LISTAEVENTOS EN SERVICE"+typeof listaEventos);
        return listaEventos;
      }
      
    

    async getEventBuscado(nombre, categoria, fecha, tag, limit, offset)
    {
        

        const eventRepository = new EventRepository();
        const eventoBuscado = await eventRepository.getEventoBuscado(nombre, categoria, fecha, tag, limit, offset) 
        //console.log("nombre evento: " + eventoBuscado.nombre)
        
        return {
            "collection": eventoBuscado,
            "pagination": {
            "limit": limit,
            "offset": offset,
            "nextPage": offset + 1, //poner el http
            "total": "1" //no se que es esto
            }
        }
        
    }
    async getEventDetails(pageSize, reqPage, idEvento)
    {
       const eventRepository = new EventRepository(); 
       
        const eventoBuscado = await eventRepository.getEventoPorId(pageSize, reqPage, idEvento)
        
        return {
            "collection": eventoBuscado, 
            "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
        }

    }

    // getAllParticipants(pageSize, reqPage, nombre, apellido, username, asistencia, rating)
    // {

    // }


}
    async createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
    {
        /*El name o description están vacíos o tienen menos de tres (3) letras.
        El max_assistance es mayor que el max_capacity del  id_event_location.
        El price o duration_in_minutes son menores que cero.*/
        const eventRepository = new EventRepository();

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
        const eventRepository = new EventRepository(); 
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
        const eventRepository = new EventRepository(); 
        await eventRepository.updateEvent(id, nombreEvento, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
    }


async getUsersFromEvent(idEvento, nombre, apellido, username, asistio, rating){
    const userRepository = new UserRepository(); 
    const listaUsers = await userRepository.getUsuariosDeUnEvento(idEvento, nombre, apellido, username, asistio, rating);
    console.log("Saliendo Services...")
    return listaUsers
}

}
