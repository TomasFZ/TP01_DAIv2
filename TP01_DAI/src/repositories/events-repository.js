import pg from "pg";
import { dbConfig, client, connectToDatabase } from "./db.js";
import { connectToDatabase } from "./db.js";


connectToDatabase();

async function traerTodosLosEventos(){
    const traerTodosLosEventos = "select * from events inner join event_categories on "; //hacer inner join de event categories, enrollments, locations, tags, 
    const request = await client.query(traerTodosLosEventos);
}




//https://tembo.io/docs/getting-started/postgres_guides/connecting-to-postgres-with-nodejs