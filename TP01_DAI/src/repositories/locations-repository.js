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
        const sql = `
            SELECT 
                l.id, l.name, l.id_province, l.latitude, l.longitude,
                el.id as event_location_id, el.name as event_location_name, 
                el.full_address, el.max_capacity, el.latitude as el_latitude, 
                el.longitude as el_longitude, el.id_creator_user,
                p.id as province_id, p.name as province_name, 
                p.latitude as province_latitude, p.longitude as province_longitude, 
                p.display_order
            FROM locations l
            LEFT JOIN event_locations el ON el.id_location = l.id
            LEFT JOIN provinces p ON l.id_province = p.id
            ORDER BY l.id, el.id
            OFFSET $1 LIMIT $2
        `;
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


async getAllLocationsMatchingId(limit, offset, id, userId){
    console.log("id_location:")
    const sql = `
      select * from event_locations where id_location = $1 and id_creator_user = $2 limit $3 offset $4`;
    try{
        const locations = await this.DBClient.query(sql, [id, userId, limit, offset]);
        return locations.rows
    }catch(e){
        console.error("Error al obtener locations:", e);
    }
}
}
