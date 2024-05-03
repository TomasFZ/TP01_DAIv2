import pkg from "pg"
import config from "../dbConfig.js"

export default class ProvinceRepository {
    constructor() {
    const { Client } = pkg
    this.DBClient = new Client(config)
    this.DBClient.connect();
}

async getProvinceById (id){
    let returnEntity = null
    try{
        const sql = "select * from provinces p where p.id = $id"
        const values = {id}
        const result = await this.DBClient.query(sql, values)
        await this.DBClient.query("SQL", [])
        if(result.rows.length > 0){
	        returnEntity = result.rows[0];
        }else{
//no encontro nada la query

}
}catch (error){
    console.log(error)
}

return returnEntity}


async getOfficerBoles(){

}



}