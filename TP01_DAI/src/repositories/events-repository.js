// import pg from "pg";
// import { dbConfig, client, connectToDatabase } from "./db.js";
// import { connectToDatabase } from "./db.js";
//todo esto mjs

import pg from "pg"
import config from "../dbConfig.js"
export default class EventRepository{
constructor(){
    const {Client} = pg
    this.DBClient = new Client(config)
    this.DBClient.connect();
}
async getAllEvents(limit, offset) {
    console.log("ESTOY AQUÍ")
    try {
        const sql = "select * from events"; 
        console.log("PASÓ LA PRUEBA 1")
        const eventos = await this.DBClient.query(sql, { limit, offset });
        console.log("PASÓ LA PRUEBA 2")
        // return {
        //     collection: eventos.rows,
        //     limit: limit,
        //     offset: offset,
        //     nextPage: offset + 1
        // };
        return {
            collection: eventos.rows,
        };
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        throw error; 
    }
}

    
    async getEventoPorId(idEvento){
        const sql = "select * from events e where id = $id"
        const values = [id= idEvento]
        const evento = await this.DBClient.query(sql, values)
        //const evento = query.execute();
        return evento
    }

    
}



//connectToDatabase();



// 


//https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs