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
            const sql = "Select username From users Where username = $1"
            console.log("Fijandome si hay users repetidos con el user: " + username)
            const usersFound = await this.DBClient.query(sql, [username])
            console.log("Comprobando resultados")
            if(usersFound.rows.length <= 0)
            {   
                console.log("No existen usuarios con el username: " + username)
                const real = false
                return real
            }
            console.log("Que!?!? Existen otros usuarios llamados: " + username)
            const real = true
            return real
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

    async getUsuariosDeUnEvento(idEvento, nombre, apellido, username, asistio, rating){
        var sql = "Select * from users u inner join event_enrollments e on e.id_user = u.id where " //select * from users inner join event_enrollments e on e.id_user = users.id where e.id = 1 
        
        var cash = 1
        let params = []
        let conditions = []
    

        if(idEvento && typeof idEvento === 'number'){
            conditions.push("e.id = $" + cash);
            cash++
            params.push(idEvento);
        }
        if(nombre && typeof nombre === 'string'){
            conditions.push("u.first_name = $" + cash);
            cash++
            params.push(nombre);
        }
        if (apellido && typeof apellido === 'string') {
            conditions.push("u.last_name = $" + cash);
            cash++
            params.push(apellido);
        }
        if (username && typeof idUsuario === 'string') {
            conditions.push("u.username = $" + cash);
            cash++
            params.push(username);
        }
        if (asistio && typeof asistio === 'bool') {
            conditions.push("e.attended = $" + cash);
            cash++
            params.push(asistio);
        }
    
        if (rating && typeof rating === 'number') {
            conditions.push("e.rating > $" + cash);
            cash++
            params.push(rating);
        }
        sql += conditions.join(" AND ");
    
        //params.push(pageSize, reqPage);
        //console.log(sql)
    
        const users = await this.DBClient.query(sql, params);
        console.log(users)
        console.log("Saliendo Repository...")
        return users;
    }
}