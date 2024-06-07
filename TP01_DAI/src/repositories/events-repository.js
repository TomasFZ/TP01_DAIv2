// import pg from "pg";
// import { dbConfig, client, connectToDatabase } from "./db.js";
// import { connectToDatabase } from "./db.js";
//todo esto mjs

import pkg from "pg"
import config from "../dbConfig.js"
export default class EventRepository{
constructor(){
    const {Client} = pkg
    console.log(config)
    this.DBClient = new Client(config)
    this.DBClient.connect();
}
 async getAllEvents(limit, offset) {
    console.log("ESTOY AQUÍ")
    limit = 10;//despues fijarse si anda sacandole estos. 
    offset = 0;
    try {
        const sql = "SELECT * FROM events OFFSET $1 LIMIT $2;"; 
        const eventos = await this.DBClient.query(sql, [ offset,limit ]);
        return eventos.rows;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
}

    // En tu servicio
    async getEventoBuscado(nombre, categoria, fecha, tag) {
        try {
            let sql = "Select * From events Where ";
            let params = [];
            let conditions = [];
    
            if (nombre) {
                conditions.push("nombre = $1");
                params.push(nombre);
            }
            if (categoria) {
                conditions.push("categoria = $2");
                params.push(categoria);
            }
            if (fecha) {
                conditions.push("fecha = $3");
                params.push(fecha);
            }
            if (tag) {
                conditions.push("tag = $4");
                params.push(tag);
            }
    
            sql += conditions.join(" AND ");
    
            // sql += " LIMIT $5 OFFSET $6"; //error de sintaxis
            params.push(pageSize, reqPage);
            console.log(sql)
    
            const eventos = await this.DBClient.query(sql, params);
            return eventos.rows;
        } catch (error) {
            console.error("Error al obtener eventos:", error);
            throw error;
        }
    }

    async getEventoPorId(limit, offset, id){
        try{
            const sql = "Select * From events Where id = $1" //chequear despues con $1, $2, y $3
            const evento = await this.DBClient.query(sql, [id]);
            console.log("id: " + id)
            console.log("nombre evento 1: " + evento[1] + " Es undefined?:" + evento)
            return evento.rows
        }catch(e){
            console.error("Error al obtener eventos:", e);
        }
    }

    async insertEvento(limit, offset, name, description, category, startDate, tag){
        const sql = "Insert into Eventos e (name, description, category, startDate, tag) values ($1, $2, $3, $4, $5 OFFSET $6 LIMIT $7)"
        const eventoCreado = await this.DBClient.query(sql, [name, description, category, startDate, tag, offset, limit])
        return eventoCreado
    }

    async deleteEventById(idEvent){
        console.log("Entro al repositorio")
        const sql = "select * from users inner join event_enrollments e on e.id_user = users.id where e.id = $1" //verificar si hay usuarios inscriptos al evento para evitar borrarlo o no.
        const users = await this.DBClient.query(sql, [idEvent])
        console.log("------------------------------------------------------------------------------------")
        //console.log("Usuarios: "+ users.rows[0].first_name)
        console.log(users.rows[0])
        const sqlEvent = "select * from events where id= $1" //verificar si existe evento. 
        const event = await this.DBClient.query(sqlEvent, [idEvent]);
        //console.log("Evento: " + users.rows[0])
        try{
        if(users.rows[0] === undefined && typeof(event.rows[0].name === "string")){
            const deleteQuery = "Delete from events where id = $1"
            await this.DBClient.query(deleteQuery, [idEvent]);
            console.log("kfjskhlfjlisjlfjlisjflijslifjlis")
            return 0
        }else if(users.rows[0] !== undefined){
            return 1
        }else if(event.rows[0].name == undefined){
            return 2
        }else{
            return 3
        }
    }catch(e){
            
        }
    }

    async createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
    {
        try
        {
            const sql = "Insert Into events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_distance, id_creator_user) Values ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10)"
            const params= [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user]
            const result = await this.DBClient.query(sql, params);
            return result
        }
        catch(e)
        {
            console.log("Error: " + e)
        }
    }
    
    async getMaxCapacity(id_event_location)
    {
        const sql = "Select max_capacity From event_locations Where id = $1"
        const params= [id_event_location]
        const loc = await this.DBClient.query(sql, params);
        return loc
    }

}



//connectToDatabase();



// 


//https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs