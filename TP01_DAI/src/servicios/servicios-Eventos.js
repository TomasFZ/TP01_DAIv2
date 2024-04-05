import pg from "pg";


//ATENCIÓN: PARA LA PRIMERA ENTREGA SE TIENE QUE ENVIAR LOS CONTROLLERS CON TODO LO DEMÁS HARDCODEADO. ES DECIR, LOS OBJETOS EVENTO DE ACA SON ESCRITOS EN VEZ DE LLAMAR A LA DB ETC ETC. 

export class EventService{
    getAllEvents(pageSize, reqPage){
        const query = "select * from events limit $(pageSize) offset $(reqPage) inner join categories on events.id_event_category = event_categories.id inner join "  //continuar haciendo los inner join de localizacion, usuario creador, etc.   //ver si en realidad tiene que ser la query en events-repository.js           //en realidad es pg. y el query pero por ahora a hardcodear
        const query2 = ""
        //en realidad las queerys tienen que ser igualadas a funciones de events-repository.js que van a ser exportadas aca. 
        const listaDB = query.execute();
        
        
        
        
        //hardcodear todos los objetos de la listaDB
        
        
        
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
    {//tal vez se puede hacer un vector que contenga estos parametros y vaya buscando uno por uno en un ciclo. 
        const query = "" //tiene que ser UN solo evento especifico en base a los filtros
        const listaEventosBuscados = query.execute(); 
        const eventoBuscado = listaEventosBuscados.filter(evento => {
            if(evento.nombre === nombre, evento.categoria === categoria, evento.fecha === fecha, evento.tag === tag){
                return evento
            }else return null;
            }
        )


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
    // getEventDetails(pageSize, reqPage, idEvento)
    // {
    //     const query = ""
    //     const evento = query.execute(); 
    //     const provincia = 
    //     return {
    //         "collection": evento, 
    //     }

    // }

    getAllParticipants(pageSize, reqPage, nombre, apellido, username, asistencia, rating)
    {

    }


}