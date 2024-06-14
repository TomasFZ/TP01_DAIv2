// import pg from "pg";
// import { dbConfig, client, connectToDatabase } from "./db.js";
// import { connectToDatabase } from "./db.js";
//todo esto mjs

import pkg from "pg"
import config from "../dbConfig.js"
import e from "express"
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
    async getEventoBuscado(nombre, categoria, fecha, tag, pageSize, reqPage) {
        try {
            //let sql = "SELECT events.*, event_categories.name as category_name FROM events INNER JOIN event_tags et ON et.id_event = events.id INNER JOIN tags ON tags.id = et.id_tag INNER JOIN event_categories ON event_categories.id = events.id_event_category WHERE ";
            var sql = (tag) ? "SELECT events.*, event_categories.name as category_name FROM events INNER JOIN event_tags et ON et.id_event = events.id INNER JOIN tags ON tags.id = et.id_tag INNER JOIN event_categories ON event_categories.id = events.id_event_category WHERE " : "SELECT events.*, event_categories.name as category_name FROM events INNER JOIN event_categories ON event_categories.id = events.id_event_category WHERE ";
            let params = [];
            let conditions = [];
            var cash = 1
            
            if (nombre) { //NIJ
                conditions.push("events.name = $" + cash);
                cash++
                params.push(nombre);
            }
            if (categoria) { //IJC
                conditions.push("event_categories.name = $" + cash);
                cash++
                params.push(categoria);
            }
            if (fecha) { //NIJ
                conditions.push("events.start_date = $" + cash);
                cash++
                params.push(fecha);
                console.log("hizo date")
            }
            if (tag) { //IJT
                conditions.push("tags.name = $" + cash);
                cash++
                params.push(tag);
                console.log("hizo tag")
            }

            sql += conditions.join(" AND ");
    
            sql += " LIMIT $" + cash +" OFFSET $" + (cash + 1); //error de sintaxis
            params.push(pageSize, reqPage);
            console.log("SQL Final:" + sql)
            const eventos = await this.DBClient.query(sql, params);
            return eventos;
        } catch (error) {
            console.error("Error al obtener eventos:", error);
            throw error;
        }
    }

    async getEventoPorId(id){
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

    async updateEvent(id, nombreEvento, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        var sql = "update events set ";

        let params = [];
        let conditions = [];
            var cash = 1
            if (nombreEvento) {
                conditions.push("name = $" + cash + ", ");
                cash++
                params.push(nombreEvento);
            }

            if (description) {
                conditions.push("description = $" + cash) + ", ";
                cash++
                params.push(description);
            }

            if (id_event_category) {
                conditions.push("id_event_category = $" + cash + ", ");
                cash++
                params.push(id_event_category);
            }

            if (id_event_location) {
                conditions.push("id_event_location = $" + cash + ", ");
                cash++
                params.push(id_event_location);
            }

            if (start_date) {
                conditions.push("start_date = $" + cash + ", ");
                cash++
                params.push(start_date);
            }

            if (duration_in_minutes) {
                conditions.push("duration_in_minutes = $" + cash + ", ");
                cash++
                params.push(duration_in_minutes);
            }

            if (price) {
                conditions.push("price = $" + cash + ", ");
                cash++
                params.push(price);
            }

            if (enabled_for_enrollment) {
                conditions.push("enabled_for_enrollment = $" + cash + ", ");
                cash++
                params.push(enabled_for_enrollment);
            }

            if (max_assistance) {
                conditions.push("max_assistance = $" + cash + ", ");
                cash++
                params.push(max_assistance);
            }

            if (id_creator_user) { //seria el id del usuario que creo el evento. 
                conditions.push("id_creator_user = $" + cash);
                cash++
                params.push(id_creator_user);
            }

            conditions.push("where id= " + cash);
            sql += conditions.join("");

            console.log("SQL Final:" + sql)
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
            const sql = "Insert Into events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) Values ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10)"
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
        return loc.rows[0].max_capacity
    }

}



//connectToDatabase();



// 


//https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs