//import pg from "pg";
//mjs

//ATENCIÓN: PARA LA PRIMERA ENTREGA SE TIENE QUE ENVIAR LOS CONTROLLERS CON TODO LO DEMÁS HARDCODEADO. ES DECIR, LOS OBJETOS EVENTO DE ACA SON ESCRITOS EN VEZ DE LLAMAR A LA DB ETC ETC. 
import { query } from "express";
import EventRepository from "../repositories/events-repository.js"
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
      
    

    async getEventBuscado(pageSize, reqPage, nombre, categoria, fecha, tag)
    {//tal vez se puede hacer un vector que contenga estos parametros y vaya buscando uno por uno en un ciclo. (cuando este la db)
        //const query = "" //tiene que ser UN solo evento especifico en base a los filtros. lo vamos a harcdodear asi que por ahora nada de bd
        //const listaEventosBuscados = query.execute(); 
        // const eventoBuscado = listaEventosBuscados.filter(evento => {
        //     if(evento.nombre === nombre, evento.categoria === categoria, evento.fecha === fecha, evento.tag === tag){
        //         return evento
        //     }else return null;
        //     }
        // )
        var arrayFiltrosIniciales = [nombre, categoria, fecha, tag]
        var arrayFiltros = []
        for(var i = 0; i < arrayFiltrosIniciales.length; i++){
            if(arrayFiltrosIniciales[i]){
                arrayFiltros.push(arrayFiltrosIniciales[i])
            }
        }

        const eventRepository = new EventRepository();
        const eventoBuscado = await eventRepository.getEventoBuscado(limit, offset, arrayFiltros) 
        
        return {
            "collection": eventoBuscado,
            "pagination": {
            "limit": pageSize,
            "offset": reqPage,
            "nextPage": reqPage + 1, //poner el http
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
    async crearEvento(pageSize, reqPage, name, description, category, startDate, tag){
        const eventRepository = new EventRepository(); 
        const eventoCreado = await eventRepository.insertEvento(pageSize, reqPage, name, description, category, startDate, tag);
        return {
            "collection": nuevoEvento, 
            "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
        }
    }
}}
