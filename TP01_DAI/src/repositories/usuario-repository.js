import pkg from "pg"
import config from "../dbConfig.js"

export default class UserRepository {
    constructor() {
    const { Client } = pkg
    this.DBClient = new Client(config)
    this.DBClient.connect();
}

    async findUserByUsername(username)
    {
        try
        {
            const sql = "Select username From users Where username = $1"
            const usersFound = await this.DBClient.query(sql, [username])
            //console.log("usuario encontrado: " + usersFound)
            if(usersFound.rows.length <= 0)
            {   
                console.log("No existen usuarios con el username: " + username)
                return false
            }
            console.log("Que!?!? Existen otros usuarios llamados: " + username)
            return true
        }
        catch(error)
        {
            console.log("Error en la query JSJSJSJSJJSJSJSJJSS" + error)

        }
    }

    async insertUser(first_name, last_name, username, password){
        try {
            //console.log("FN: " + first_name + " LN: " + last_name + " UN: " + username + " PW: " + password)
            const sql = "Insert Into users (first_name, last_name, username, password) Values ($1, $2, $3, $4)";
            const newUser = await this.DBClient.query(sql, [ first_name, last_name, username, password ]);
            console.log(newUser)
            return newUser;
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    }
}