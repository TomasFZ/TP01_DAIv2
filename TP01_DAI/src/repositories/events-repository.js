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

    async getEventoBuscado(limit, offset, arrayFiltros){
        try {
            const sql = "Select * from events where " //temrinar
            const eventos = await this.DBClient.query(sql, [ offset,limit ]);
            return eventos.rows;
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }

    }

    async getEventoPorId(limit, offset, id){
        try{
            const sql = "select * from events where id = $1" //chequear despues con $1, $2, y $3
            const evento = await this.DBClient.query(sql, [id]);
            console.log("id: " + id)
            console.log("nombre evento: " + evento.nombre)
            return evento
        }catch(e){
            console.error("Error al obtener eventos:", e);
        }
    }

    async insertEvento(limit, offset, name, description, category, startDate, tag){
        const sql = "Insert into Eventos e (name, description, category, startDate, tag) values ($name, $description, $category, $startDate, $tag OFFSET $off LIMIT $limit)"
        const eventoCreado = await this.DBClient.query(sql, [name, description, category, startDate, tag, offset, limit])
        return eventoCreado
    }

}



//connectToDatabase();



// 


//https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs