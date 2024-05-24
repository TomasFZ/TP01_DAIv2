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
        const sql = "SELECT * FROM provinces OFFSET $1 LIMIT $2;"; 
        const provincias = await this.DBClient.query(sql, [ offset,limit ]);
        return provincias.rows;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
}

async getProvinceById (id){
    try{
        const sql = "select * from provinces p where p.id = $1"
        const result = await this.DBClient.query(sql, [id])
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

async updateProvince(ogProvince, id, name, full_name, id_province, latitude, longitude)
{
    const cashID = 2
    try
    {
        const sql = "Update provinces Set name = $1, "
        if(full_name != null)
        {
            sql += "full_name = $" + cashID + ", "
            num += 1
        }
        if(id_province == null)
        {
            sql += "id_province = $" + cashID +", longitude = $" + (cashID + 1) + ", Where id = $" + (cashID + 2) 
            num += 1
        }

        sql += "latitude = $" + cashID + ", "
        //const cashes = [name, full_name, id_province. latitude, longitude] intended full result
        const result = await this.DBClient.query(sql, [id])
    }

    catch(guB)
    {

    }
}

async insertProvincia(body){ //terminar. marca error de sintaxis. 
    try {
        const sql = "Insert into provinces (name, full_name, latitude, longitude, display_order) values ($1, $2, $3, $4, $5)"; 
        const provincias = await this.DBClient.query(sql, [ body.name, body.full_name, body.latitude, body.longitude, body.display_order ]);
        return provincias.rows;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
}

async getOfficerBoles(){

}



}