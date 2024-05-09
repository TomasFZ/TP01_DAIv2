// import pg from "pg";
// import { dbConfig, client, connectToDatabase } from "./db.js";
// import { connectToDatabase } from "./db.js";
//todo esto mjs

import pkg from "pg"
import config from "../dbConfig.js"
export default class EventRepository{
constructor(){
    const {Client} = pkg
    this.DBClient = new Client(config)
    this.DBClient.connect();
}
  getAllEvents(limit, offset) { //despues le agregamos el async y el await, el tema es que si lo hacemos ahora se queda pensando y no termina completa la funcion. 
    console.log("ESTOY AQUÍ")
    limit = 10;
    offset = 0;
    console.log(typeof limit, typeof offset) //son undefined. los defini arriba como nums pero entran como undefined. 
    try {
        const sql = "SELECT * FROM events OFFSET ${offset} LIMIT ${limit};"; 
        console.log("PASÓ LA PRUEBA 1")
        const eventos = this.DBClient.query(sql, [ limit, offset ]);
        console.log("PASÓ LA PRUEBA 2")
        // return {
        //     collection: eventos.rows,    
        //     limit: limit,
        //     offset: offset,
        //     nextPage: offset + 1
        // };
        console.log("TYPEOF EVENTOS EN REPOSITORIES: "+typeof eventos);
        return eventos.rows;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
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