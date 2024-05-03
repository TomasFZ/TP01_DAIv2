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
async getAllEvents(limit, offset){
    const sql = "select * from events"; //hacer inner join de event categories, enrollments, locations, tags, 
    const eventos = await this.DBClient.query(sql,null)
    return {
        collection: eventos,
        limit: limit,
        offset: offset,
        nextPage: offset +1
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