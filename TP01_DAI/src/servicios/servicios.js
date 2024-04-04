import pg from "pg";
export class EventService{
    getAllEvents(pageSize, reqPage){
        const query = "select * from events limit $(pageSize) offset $(reqPage) inner join categories on events.id_event_category = event_categories.id inner join "  //continuar haciendo los inner join de localizacion, usuario creador, etc.   //ver si en realidad tiene que ser la query en events-repository.js           //en realidad es pg. y el query pero por ahora a hardcodear
        const query2 = ""
        //en realidad las queerys tienen que ser igualadas a funciones de events-repository.js que van a ser exportadas aca. 
        const listaDB = query.execute();
        return {
            "collection": listaDB,
            "pagination": {
            "limit": pageSize,
            "offset": reqPage,
            "nextPage": reqPage + 1, //poner el http
            "total": "1"
            }
        }
    }

    getEventBuscado(pageSize, reqPage, nombre, categoria, fecha, tag){//tal vez se puede hacer un vector que contenga estos parametros y vaya buscando uno por uno en un ciclo. 
        const query = "" //tiene que ser UN solo evento especifico en base a los filtros
        const listaEventosBuscados = query.execute(); 
        const vectorFiltros = [nombre, categoria, fecha, tag]
        
        const busqueda = listaEventosBuscados.filter(evento => {
            
            var verificacion = true;
            if(evento.nombre !== nombre){
                verificacion = false;
            }
            if(){
                //y asi
            }

            return verificacion



        })
        return {
            "collection": busqueda
        }

    }

    getEventDetails(pageSize, reqPage, localizacionEvento, idEvento, nombreEvento, descripcionEvento, fechaInicioEvento, duracionEvento, precioEvento, enrollmentDisponible, asistenciaMax){
        const query = ""
        const evento = query.execute(); 

        return {
            "collection": evento
        }

    }

    getAllParticipants(pageSize, reqPage, nombre, apellido, username, asistencia, rating){

    }


}