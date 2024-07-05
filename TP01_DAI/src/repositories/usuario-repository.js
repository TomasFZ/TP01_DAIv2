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

    async getUsuariosDeUnEvento(idEvento, nombre, apellido, username, asistio, rating, limit, offset){
        var sql = "Select * from users u inner join event_enrollments e on e.id_user = u.id " //select * from users inner join event_enrollments e on e.id_user = users.id where e.id = 1 

        var cash = 1
        let params = []
        let conditions = []
        


        console.log(asistio + " ASISTIO")
        console.log(idEvento + " ID EVENITNRIFDGNLJ" + typeof idEvento)

        if(idEvento && typeof idEvento === 'number'){
            conditions.push("where e.id = $" + cash);
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
            console.log("ASISTIO: " + attended)
        }
    
        if (rating && typeof rating === 'number') {
            conditions.push("e.rating > $" + cash);
            cash++
            params.push(rating);
        }
        params.push(limit,offset)
        sql += conditions.join(" And ");
        sql += (" Limit $" + cash + " Offset $" + (cash + 1))
        
        //params.push(pageSize, reqPage);
        console.log(sql)
    
        const users = await this.DBClient.query(sql, params);
        console.log(users)
        console.log("Saliendo Repository...")
        return users;
    }
}