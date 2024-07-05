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
    //limit = 10;//despues fijarse si anda sacandole estos. 
    //offset = 0;
    try {
        const sql = "SELECT e.id AS event_id, e.name AS event_name, e.description AS event_description, e.id_event_category AS event_category, e.id_event_location AS event_location, e.start_date AS e_date, e.duration_in_minutes AS event_duration, e.price AS event_price, e.enabled_for_enrollment AS event_enabled_for_enrollment, e.max_assistance AS event_max_assistance, e.id_creator_user AS event_creator_user, el.id AS event_location_id, el.name AS event_location_name, el.full_address AS event_location_full_address, el.max_capacity AS event_location_max_capacity, el.latitude AS event_location_latitude, el.longitude AS event_location_longitude, el.id_creator_user AS event_location_id_creator_user, l.id AS location_id, l.name AS location_name, l.id_province AS location_id_province, l.latitude AS location_latitude, l.longitude AS location_longitude, p.id AS province_id, p.full_name AS province_full_name, p.latitude AS province_latitude, p.longitude AS province_longitude, p.display_order AS province_display_order, u.id AS user_id, u.first_name AS user_first_name, u.last_name AS user_last_name, u.username AS user_username, u.password AS user_password, et.id AS event_tags_id, et.id_tag AS event_tags_id_tag, t.id AS tag_id, t.name AS tag_name FROM events e INNER JOIN event_locations el ON e.id_event_location = el.id INNER JOIN locations l ON l.id = el.id_location INNER JOIN provinces p ON p.id = l.id_province INNER JOIN users u ON u.id = e.id_creator_user INNER JOIN event_tags et ON et.id_event = e.id INNER JOIN tags t ON t.id = et.id_tag OFFSET $1 LIMIT $2;"; 
        const eventos = await this.DBClient.query(sql, [ offset,limit ]);
        return eventos.rows;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
}

    // En tu servicio
    async getEventoBuscado(nombre, categoria, fecha, tag) {
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
            const sql = `
    SELECT 
        e.id AS event_id,
        e.name AS event_name,
        e.description AS event_description,
        e.id_event_category,
        e.id_event_location,
        e.start_date,
        e.duration_in_minutes,
        e.price,
        e.enabled_for_enrollment,
        e.max_assistance,
        e.id_creator_user,
        el.id AS event_location_id,
        el.id_location AS event_location_id_location,
        el.name AS event_location_name,
        el.full_address AS event_location_full_address,
        el.max_capacity AS event_location_max_capacity,
        el.latitude AS event_location_latitude,
        el.longitude AS event_location_longitude,
        el.id_creator_user AS event_location_creator_user_id,
        l.id AS location_id,
        l.name AS location_name,
        l.id_province,
        l.latitude AS location_latitude,
        l.longitude AS location_longitude,
        p.id AS province_id,
        p.name AS province_name,
        p.full_name AS province_full_name,
        p.latitude AS province_latitude,
        p.longitude AS province_longitude,
        uc.id AS creator_user_id,
        uc.first_name AS creator_user_first_name,
        uc.last_name AS creator_user_last_name,
        uc.username AS creator_user_username,
        uc.password AS creator_user_password,
        ARRAY(
            SELECT json_build_object(
                'id', t.id,
                'name', t.name
            )
            FROM event_tags et
            JOIN tags t ON et.tag_id = t.id
            WHERE et.event_id = e.id
        ) AS tags,
        ec.id AS event_category_id,
        ec.name AS event_category_name,
        ec.display_order AS event_category_display_order
    FROM 
        events e
    LEFT JOIN 
        event_locations el ON e.id_event_location = el.id
    LEFT JOIN 
        locations l ON el.id_location = l.id
    LEFT JOIN 
        provinces p ON l.id_province = p.id
    LEFT JOIN 
        users uc ON e.id_creator_user = uc.id
    LEFT JOIN 
        event_categories ec ON e.id_event_category = ec.id
    WHERE 
        e.id = $1;`//Select * From events Where id = $1
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

            if (id_creator_user) { 
                conditions.push("id_creator_user = $" + cash);
                cash++
                params.push(id_creator_user);
            }

            conditions.push("where id= " + cash);
            sql += conditions.join("");

            await this.DBClient.query(sql, params);

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

    async updateEventEnrollments(idEvento, rating, observations){
        const sql = "update event_enrollments set id_event = $1, rating = $2, observations = $3 where idEvent = $1" //iduser q
        await this.DBClient.query(sql, [idEvento, rating, observations]);
    }

    async enrollUserToEvent(idEvento, idUser, fechaInscripcion){
        const sql = `
            INSERT INTO event_enrollments (id_event, id_user, description, registration_date_time) 
            VALUES ($1, $2, ?, $4)`;
            await this.DBClient.query(sql, [idEvento, idUser, fechaInscripcion]);
    }
    async deleteUserFromEvent(idEvento, idUser){
        const sql = "delete from event_enrollments where id_event = $1 and id_user = $2"
        await this.DBClient.query(sql, [idEvento, idUser]);
    }



async getAllCategories()
{
    const sql = "Select * From event_categories"
    const result = await this.DBClient.query(sql)
    return result.rows;
}

async getOneCategory(id)
{
    const sql = "Select * From event_categories Where id = $1"
    const params = [id]
    console.log(id)
    return await this.DBClient.query(sql, params)
}

async createCategory(name)
{
    const sql = "Insert Into event_categories (name) Values ($1)"
    const params = [name]
    return await this.DBClient.query(sql, params)
}

async editCategory(id, name)
{
    const sql = "Update event_categories Set name = $1 Where id = $2"
    const params = [name, id]
    return await this.DBClient.query(sql, params)
}

async murderCategory(id)
{
    const sql = "Delete event_categories Where id = $1"
    const params = [id]
    return await this.DBClient.query(sql,params)
}

}





// 


//https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs