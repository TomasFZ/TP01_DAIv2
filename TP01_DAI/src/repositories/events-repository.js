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
    try {
        const sql = `
            SELECT
                e.id AS id,
                e.name AS name,
                e.description AS description,
                JSON_BUILD_OBJECT('id', ec.id, 'name', ec.name) AS event_category,
                JSON_BUILD_OBJECT('id', el.id, 'name', el.name, 'full_address', el.full_address, 'max_capacity', el.max_capacity, 'latitude', el.latitude, 'longitude', el.longitude, 
                    'location', JSON_BUILD_OBJECT('id', l.id, 'name', l.name, 'latitude', l.latitude, 'longitude', l.longitude, 'province', JSON_BUILD_OBJECT('id', p.id, 'name', p.full_name, 'latitude', p.latitude, 'longitude', p.longitude, 'display_order', p.display_order))) AS event_location,
                e.start_date AS start_date,
                e.duration_in_minutes AS duration_in_minutes,
                e.price AS price,
                e.enabled_for_enrollment AS enabled_for_enrollment,
                e.max_assistance AS max_assistance,
                JSON_BUILD_OBJECT('id', u.id, 'username', u.username, 'first_name', u.first_name, 'last_name', u.last_name) AS creator_user,
                JSON_AGG(JSON_BUILD_OBJECT('id', t.id, 'name', t.name)) AS tags
            FROM
                events e
                INNER JOIN event_categories ec ON e.id_event_category = ec.id
                INNER JOIN event_locations el ON e.id_event_location = el.id
                INNER JOIN locations l ON l.id = el.id_location
                INNER JOIN provinces p ON p.id = l.id_province
                INNER JOIN users u ON u.id = e.id_creator_user
                LEFT JOIN event_tags et ON et.id_event = e.id
                LEFT JOIN tags t ON t.id = et.id_tag
            GROUP BY
                e.id, ec.id, ec.name, el.id, el.name, el.full_address, el.max_capacity, el.latitude, el.longitude, l.id, l.name, l.latitude, l.longitude, p.id, p.full_name, p.latitude, p.longitude, p.display_order, u.id, u.username, u.first_name, u.last_name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance
            OFFSET $1 LIMIT $2;`;
        
        const eventos = await this.DBClient.query(sql, [ offset, limit ]);
        
        const eventosMapeados = eventos.rows.map(event => ({
            id: event.id,
            name: event.name,
            description: event.description,
            event_category: event.event_category,
            event_location: event.event_location,
            start_date: event.start_date,
            duration_in_minutes: event.duration_in_minutes,
            price: event.price,
            enabled_for_enrollment: event.enabled_for_enrollment,
            max_assistance: event.max_assistance,
            creator_user: event.creator_user,
            tags: event.tags
        }));
        
        return eventosMapeados;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        throw error; 
    }
}

    // En tu servicio
    async getEventoBuscado(nombre, categoria, fecha, tag) {
        try {
            let sql = `
                SELECT
                    e.id,
                    e.name,
                    e.description,
                    e.id_event_category,
                    e.id_event_location,
                    e.start_date,
                    e.duration_in_minutes,
                    e.price,
                    e.enabled_for_enrollment,
                    e.max_assistance,
                    e.id_creator_user,
                    STRING_AGG(t.name, ', ' ORDER BY t.name) AS tag_names
                FROM
                    events e
                    Left JOIN event_tags et ON et.id_event = e.id
                    Left JOIN tags t ON t.id = et.id_tag
                    Left JOIN event_categories ec ON ec.id = e.id_event_category`
    
            let params = [];
            let conditions = [];
            let cash = 1;
    
            if (nombre) {
                conditions.push(`e.name = $${cash}`);
                params.push(nombre);
                cash++;
            }
    
            if (categoria) {
                conditions.push(`ec.name = $${cash}`);
                params.push(categoria);
                cash++;
            }
    
            if (fecha) {
                conditions.push(`e.start_date = $${cash}`);
                params.push(fecha);
                cash++;
            }
    
            if (tag) {
                conditions.push(`t.name = $${cash}`);
                params.push(tag);
                cash++;
            }
    
            if (conditions.length > 0) {
                sql += ` WHERE ${conditions.join(" AND ")}`;
            }
    
            sql += `
                GROUP BY
                    e.id,
                    e.name,
                    e.description,
                    e.id_event_category,
                    e.id_event_location,
                    e.start_date,
                    e.duration_in_minutes,
                    e.price,
                    e.enabled_for_enrollment,
                    e.max_assistance,
                    e.id_creator_user`;
            console.log("Query: " + sql)
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
                JOIN tags t ON et.id_tag = t.id
                WHERE et.id_event = e.id
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
            e.id = $1`//Select * From events Where id = $1
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

    async updateEvent(id, nombreEvento, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) {
        let sql = "UPDATE events SET ";
        let params = [];
        let conditions = [];
        let cash = 1;
    
        if (nombreEvento) {
            conditions.push(`name = $${cash}`);
            params.push(nombreEvento);
            cash++;
        }
    
        if (description) {
            conditions.push(`description = $${cash}`);
            params.push(description);
            cash++;
        }
    
        if (id_event_category) {
            conditions.push(`id_event_category = $${cash}`);
            params.push(id_event_category);
            cash++;
        }
    
        if (id_event_location) {
            conditions.push(`id_event_location = $${cash}`);
            params.push(id_event_location);
            cash++;
        }
    
        if (start_date) {
            conditions.push(`start_date = $${cash}`);
            params.push(start_date);
            cash++;
        }
    
        if (duration_in_minutes) {
            conditions.push(`duration_in_minutes = $${cash}`);
            params.push(duration_in_minutes);
            cash++;
        }
    
        if (price) {
            conditions.push(`price = $${cash}`);
            params.push(price);
            cash++;
        }
    
        if (enabled_for_enrollment) {
            conditions.push(`enabled_for_enrollment = $${cash}`);
            params.push(enabled_for_enrollment);
            cash++;
        }
    
        if (max_assistance) {
            conditions.push(`max_assistance = $${cash}`);
            params.push(max_assistance);
            cash++;
        }
    
        if (id_creator_user) { 
            conditions.push(`id_creator_user = $${cash}`);
            params.push(id_creator_user);
            cash++;
        }
    
        sql += conditions.join(", ");
        sql += ` WHERE id = $${cash}`;
        params.push(id);
    
        await this.DBClient.query(sql, params);
    
        console.log("SQL Final:" + sql);
    }
    
    async deleteEventById(idEvent) {
        console.log("Entro al repositorio");
    
        try {
          
            const sqlUsers = "SELECT * FROM users INNER JOIN event_enrollments e ON e.id_user = users.id WHERE e.id = $1";
            const users = await this.DBClient.query(sqlUsers, [idEvent]);
            console.log("Usuarios inscriptos:");
            console.log(users.rows); 
    
           
            const sqlEvent = "SELECT * FROM events WHERE id = $1";
            const event = await this.DBClient.query(sqlEvent, [idEvent]);
            console.log("Evento:");
            console.log(event.rows); 
    
            if (users.rows.length === 0 && event.rows.length > 0 && typeof event.rows[0].name === "string") {
                const deleteQuery = "DELETE FROM events WHERE id = $1";
                await this.DBClient.query(deleteQuery, [idEvent]);
                console.log("Evento borrado con éxito");
                return 0; 
            } else if (users.rows.length > 0) {
                console.log("No se puede borrar el evento, hay usuarios inscritos.");
                return 1; 
            } else if (event.rows.length === 0 || event.rows[0].name === undefined) {
                console.log("No se encontró el evento.");
                return 2; 
            } else {
                console.log("Otro caso no contemplado.");
                return 3; 
            }
        } catch (e) {
            console.error("Error en deleteEventById:", e); 
            throw e; 
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
        console.log("idEventLocatirgi<: "+id_event_location)
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
    const result = await this.DBClient.query(sql, params)
    return result.rows
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
{//Viola Clave Foránea ._.
    const sql = "Delete From event_categories Where id = $1"
    const params = [id]
    return await this.DBClient.query(sql,params)
}

async getAllLocations()
{
    const sql = "Select * From event_locations"
    const result = await this.DBClient.query(sql)
    return result.rows
}

async getOneLocation(id)
{
    const sql = "Select * From event_locations Where id = $1"
    const params = [id]
    const result = await this.DBClient.query(sql, params)
    return result.rows
}

async locationCheck(id_location)
{
    const sql = "Select * From locations Where id = $1"
    const params = [id_location]
    const result = await this.DBClient.query(sql, params)
    return result.rows
}

async createLocation(id_location, name, full_address, max_capacity, latitude, longitude)
{
    const sql = "Insert Into event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) Values ($1, $2, $3, $4, $5, $6, $7)"
    const params = [id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user]
    const result = await this.DBClient.query(sql, params)
    console.log(result)
    return 4
}

async editLocation(id, id_location, name, full_address, max_capacity, latitude, longitude)
{
    const sql = "Update event_locations Set id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6 Where id = $7"
    const params = [id_location, name, full_address, max_capacity, latitude, longitude, id]
    const result = await this.DBClient.query(sql, params)
    console.log(result)
    return 4
}

async murderLoc(id)
{//Igual que en murderCategory, viola clave foránea.
    const sql = "Delete From event_locations Where id = $1"
    const params = [id]
    return await this.DBClient.query(sql, params)
}

async getEventById(id){
    const sql = "select * from events where id = $1"
    return await this.DBClient.query(sql, [id]);
}

}





// 


//https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs