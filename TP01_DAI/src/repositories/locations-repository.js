import pkg from "pg"
import config from "../dbConfig.js"

export default class LocationRepository{
constructor(){
    const {Client} = pkg
    console.log(config)
    this.DBClient = new Client(config)
    this.DBClient.connect();
}


async getAllLocations(limit, offset) {
    try {
        const sql = "SELECT * FROM locations OFFSET $1 LIMIT $2;"; 
        const locations = await this.DBClient.query(sql, [ offset,limit ]);
        return locations.rows;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
}

async getLocationById(id){
    const sql = "select * from locations where id = $1"
    try{
        const location = await this.DBClient.query(sql, [id]);
        
        return location.rows
    }catch(e){
        console.error("Error al obtener location:", e);
    }}


async getAllLocationsMatchingId(id){
    const sql = `
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
        e.id_creator_user
      FROM 
        events e
      JOIN 
        event_locations el ON e.id_event_location = el.id
      WHERE 
        el.id_location = $1
    `;
    try{
        const locations = await this.DBClient.query(sql, [id]);
        
        return locations.rows
    }catch(e){
        console.error("Error al obtener locations:", e);
    }
}
}
