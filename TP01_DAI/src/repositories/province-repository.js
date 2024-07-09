import pkg from "pg"
import config from "../dbConfig.js"

export default class ProvinceRepository {
    constructor() {
    const { Client } = pkg
    this.DBClient = new Client(config)
    this.DBClient.connect();
}

async getAllProvincias(limit, offset){
    try {
        const sql = "SELECT * FROM provinces ORDER BY id ASC OFFSET $1 LIMIT $2;"; 
        const provincias = await this.DBClient.query(sql, [ offset,limit ]);
        console.log("provincias repository: " + provincias)
        console.log("provincias.rows repository: " + provincias.rows)

        return provincias.rows;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
}

async getProvinceById (id){
    console.log(id + "id provincia es  ESTA")
    try{
        const sql = "select * from provinces p where p.id = $1"
        const result = await this.DBClient.query(sql, [id])
        console.log("provincia nombre repository: " + result.rows.name)
        if(result.rows.length > 0)
        {
            console.log("Retornando: " + result.rows)
	        return result.rows
        }else
        {
            return  "No existen Provincias con ese ID"
        }
    }
    catch (error){
        console.log(error)
    }
}

async getLocationsById(id, limit, offset){
    try{
        const sql = "SELECT * FROM locations WHERE id_province = $1 OFFSET $2 LIMIT $3;"
        const result = await this.DBClient.query(sql, [id, offset, limit])
        if(result.rows.length > 0)
        {
            console.log("Retornando: " + result.rows)
	        return result.rows
        }else
        {
            return  "No existen Provincias con ese ID"
        }
    }
    catch (error){
        console.log(error)
    }
}

async updateProvince(id, name, full_name, latitude, longitude, display_order)
{
    try
    {
        const sql = "Update provinces Set name = $1, full_name = $2, longitude = $3, latitude = $4, display_order = $5 Where id = $6"
        const cashes = [name, full_name, longitude, latitude, display_order, id]
        await this.DBClient.query(sql, cashes)
        
        }

    catch(guB)
    {
        console.log(guB)
        //malditos bugs

    }
}

async insertProvincia(name, full_name, latitude, longitude, display_order){ //terminar. marca error de sintaxis. 
    try {
        const sql = "Insert into provinces (name, full_name, latitude, longitude, display_order) values ($1, $2, $3, $4, $5)"; 
        const provincia = await this.DBClient.query(sql, [ name, full_name, Number(latitude), Number(longitude), Number(display_order) ]);
        return provincia.rows;
    } catch (error) {
        console.error("Error :", error);
    }
}


async deleteProvincia(id){
    const sql = "delete from provinces where id = $1"
    const sqlLocations = "delete from locations where id_Province = $1"
    await this.DBClient.query(sqlLocations, [id]);
    await this.DBClient.query(sql, [id]);
   
}
}