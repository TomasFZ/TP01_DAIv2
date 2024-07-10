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
        console.log("Estoy empezando a buscar usuarios repetidos")
        try
        {
            const sql = "Select * From users Where username = $1"
            console.log("Fijandome si hay users repetidos con el user: " + username)
            const usersFound = await this.DBClient.query(sql, [username])
            console.log("Comprobando resultados")
            if(usersFound.rows.length <= 0)
            {   
                console.log("No existen usuarios con el username: " + username)
                return false
            }
            console.log("Existen otros usuarios llamados: " + username)
            return usersFound
        }
        catch(error)
        {
            console.log("Error en la query " + error)
        }
    }

    async getUserById(id){
        const sql = "select * from users where id = $1";
        const user = await this.DBClient.query(sql, [id])
        return user;
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

    async getUsuariosDeUnEvento(idEvento, nombre, apellido, username, asistio, rating, limit, offset) {
        let sql = "SELECT u.* FROM users u INNER JOIN event_enrollments e ON e.id_user = u.id";
        let params = [];
        let conditions = [];
    
        if (idEvento && !isNaN(idEvento)) {
            conditions.push("e.id_event = $" + (params.length + 1));
            params.push(Number(idEvento));
        }
        if (nombre) {
            conditions.push("u.first_name = $" + (params.length + 1));
            params.push(nombre);
        }
        if (apellido) {
            conditions.push("u.last_name = $" + (params.length + 1));
            params.push(apellido);
        }
        if (username) {
            conditions.push("u.username = $" + (params.length + 1));
            params.push(username);
        }
        if (asistio !== undefined) {
            conditions.push("e.attended = $" + (params.length + 1));
            params.push(asistio);
        }
        if (rating !== undefined && !isNaN(rating)) {
            conditions.push("e.rating > $" + (params.length + 1));
            params.push(Number(rating));
        }
    
        if (conditions.length > 0) {
            sql += " WHERE " + conditions.join(" AND ");
        }
    
        sql += " ORDER BY u.id";
    
        if (limit !== undefined && !isNaN(limit)) {
            sql += " LIMIT $" + (params.length + 1);
            params.push(Number(limit));
        }
    
        if (offset !== undefined && !isNaN(offset)) {
            sql += " OFFSET $" + (params.length + 1);
            params.push(Number(offset));
        }
    
        console.log("SQL Query:", sql);
        console.log("SQL Params:", params);
    
        try {
            const result = await this.DBClient.query(sql, params);
            console.log("Número de usuarios encontrados:", result.rows.length);
            return result.rows;
        } catch (error) {
            console.error("Error en la consulta SQL:", error);
            throw error;
        }
    }}