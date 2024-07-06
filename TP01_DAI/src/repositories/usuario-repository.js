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
            console.log("Que!?!? Existen otros usuarios llamados: " + username)
            return usersFound
        }
        catch(error)
        {
            console.log("Error en la query JSJSJSJSJJSJSJSJJSS" + error)
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
        let sql = "SELECT * FROM users u INNER JOIN event_enrollments e ON e.id_user = u.id ";
        let cash = 1;
        let params = [];
        let conditions = [];
    
        if (idEvento && typeof idEvento === 'number') {
            conditions.push("e.id = $" + cash);
            params.push(idEvento);
            cash++;
        }
        if (nombre && typeof nombre === 'string') {
            conditions.push("u.first_name = $" + cash);
            params.push(nombre);
            cash++;
        }
        if (apellido && typeof apellido === 'string') {
            conditions.push("u.last_name = $" + cash);
            params.push(apellido);
            cash++;
        }
        if (username && typeof username === 'string') {
            conditions.push("u.username = $" + cash);
            params.push(username);
            cash++;
        }
        if (asistio) {
            conditions.push("e.attended = $" + cash);
            params.push(asistio);
            cash++;
        }
        if (rating && typeof rating === 'number') {
            conditions.push("e.rating > $" + cash);
            params.push(rating);
            cash++;
        }
        params.push(limit, offset);
        sql += conditions.join(" AND ");
        sql += " LIMIT $" + cash + " OFFSET $" + (cash + 1);
    
        const result = await this.DBClient.query(sql, params);
        return result.rows;
    }
    
}