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
    async getEventoBuscado(pageSize, reqPage, nombre, categoria, fecha, tag) {
        try {
            let sql = "SELECT * FROM events WHERE ";
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
    
            sql += " LIMIT $5 OFFSET $6"; //error de sintaxis
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

}



//connectToDatabase();



// 


//https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs