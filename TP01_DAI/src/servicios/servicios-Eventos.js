//import pg from "pg";
//mjs

//ATENCIÓN: PARA LA PRIMERA ENTREGA SE TIENE QUE ENVIAR LOS CONTROLLERS CON TODO LO DEMÁS HARDCODEADO. ES DECIR, LOS OBJETOS EVENTO DE ACA SON ESCRITOS EN VEZ DE LLAMAR A LA DB ETC ETC. 


export default class EventService{
    getAllEvents(pageSize, reqPage){
        const query = "select * from events limit $(pageSize) offset $(reqPage) inner join categories on events.id_event_category = event_categories.id inner join "  //continuar haciendo los inner join de localizacion, usuario creador, etc.   //ver si en realidad tiene que ser la query en events-repository.js           //en realidad es pg. y el query pero por ahora a hardcodear
        const query2 = ""
        //en realidad las queerys tienen que ser igualadas a funciones de events-repository.js que van a ser exportadas aca. 
        // const listaDB = query.execute();
        
        //hardcodear todos los objetos de la listaDB
        const listaDB = [
            {
                "id": 1, 
                "name": "eventoRock", 
                "description": "el mejor evento de rock", 
                "id_event_category": 1, 
                "id_event_location": 1, 
                "start_date": 12-12-24, 
                "duration_in_minutes": 60, 
                "price": 120, 
                "enabled_for_enrollment": true, 
                "max_assistance": 600, 
                "id_creator_user": 1
            }, 
            {
                "id": 2, 
                "name": "eventoJazz", 
                "description": "el peor evento de jazz", 
                "id_event_category": 2, 
                "id_event_location": 3, 
                "start_date": 12-11-24, 
                "duration_in_minutes": 10, 
                "price": 12000, 
                "enabled_for_enrollment": false, 
                "max_assistance": 100, 
                "id_creator_user": 2
            }
        ]
        console.log("estamos en construccion: pasa por getAllEvents en servicios-Events")
        return {
            "collection": listaDB,
            "pagination": {
            "limit": pageSize,
            "offset": reqPage,
            "nextPage": reqPage + 1, //poner el http
            "total": "1" //que era esto de total? //Eran las páginas totales o algo así
            }
        }
    }
    

    getEventBuscado(pageSize, reqPage, nombre, categoria, fecha, tag)
    {//tal vez se puede hacer un vector que contenga estos parametros y vaya buscando uno por uno en un ciclo. (cuando este la db)
        //const query = "" //tiene que ser UN solo evento especifico en base a los filtros. lo vamos a harcdodear asi que por ahora nada de bd
        //const listaEventosBuscados = query.execute(); 
        // const eventoBuscado = listaEventosBuscados.filter(evento => {
        //     if(evento.nombre === nombre, evento.categoria === categoria, evento.fecha === fecha, evento.tag === tag){
        //         return evento
        //     }else return null;
        //     }
        // )

        const eventoBuscado = {
                "id": 2, 
                "name": "eventoJazz", 
                "description": "el peor evento de jazz", 
                "id_event_category": 2, 
                "id_event_location": 3, 
                "start_date": 12-11-24, 
                "duration_in_minutes": 10, 
                "price": 12000, 
                "enabled_for_enrollment": false, 
                "max_assistance": 100, 
                "id_creator_user": 2
        }

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
    getEventDetails(pageSize, reqPage, idEvento)
    {
        // const query = ""
        // const evento = query.execute(); 
        // const provincia = 
        
        const evento = {
                "id": 2, 
                "name": "eventoJazz", 
                "description": "el peor evento de jazz", 
                "id_event_category": 2, 
                "id_event_location": 3, 
                "start_date": 12-11-24, 
                "duration_in_minutes": 10, 
                "price": 12000, 
                "enabled_for_enrollment": false, 
                "max_assistance": 100, 
                "id_creator_user": 2
        }
        
        //falta el event locations y las provincias
        
        return {
            "collection": evento, 
        }

    }

    // getAllParticipants(pageSize, reqPage, nombre, apellido, username, asistencia, rating)
    // {

    // }


}
