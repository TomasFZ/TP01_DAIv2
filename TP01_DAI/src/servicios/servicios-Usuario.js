// import pg from "pg";
//mjs
import UserRepository from "../repositories/usuario-repository.js"
import jwt from 'jsonwebtoken'
export default class UserService
{
//no hacer el 6, 9, y 10. 
    getUser(idEvento, username, password, nombreEvento, attended, pageSize, reqPage) //pasarle un objeto en vez de un monton de parametros
    {
        //const query = "select * from users where users.username = $(username) and users.password = $(password)"; //fetch user from db
        //const DBresponse = query.execute(); //DRAGON BALL RESPONSE WOOOOOOOOOOOO
        if(DBresponse.username == username && DBresponse.password == password && DBresponse.idEvento == idEvento && DBresponse.attended == attended)
        {
            return //*insertar token* COMO MIERDA GENERO UN TOKEN PARA QUE EL USUARIO SE LOGUEE??????????????
        }
        else
        {
            return null;
        }
    }

    getParticipants(idEvento, username, nombre, apellido, attended, rating, pageSize, reqPage)
    {
        //const query = "select * from users where users.username = $(username) and events.id = $(idEvento) and event_enrollment.attended = $(attended) and event_enrollment.attended = true inner join event_enrollments on event_enrollments.id_event = events.id inner join users on users.id = event_enrollment.id_user"; //fetch user from db
        //const queryTodosUsuarios = "select * from users where events.id = $(idEvento) inner join event_enrollments on event_enrollments.id_event = events.id inner join users on users.id = event_enrollments.id_user"; //fetch user from db
        //const DBresponse = queryTodosUsuarios.execute(); //DRAGON BALL RESPONSE WOOOOOOOOOOOO

        const participante1 = {
            "id": 1, 
            "name": "Janemba", 
            "last_name": "el peor evento de jazz", 
            "id_event": 2, 
            "username": "emmmmm", 
            "attended": true, 
            "rating": 2
        }
        const participante2 = {
            "id": 2, 
            "name": "Mortis Rockabilly", 
            "last_name": "segunda estelar segundo gadget refuerzo de escudo refuerzo de gadget balon brawl II", 
            "id_event": 1, 
            "username": "morits", 
            "attended": false, 
            "rating": 9
        }

        const participante3 = {
            "id": 3, 
            "name": "Nerf Poco", 
            "last_name": "despidan a adrian", 
            "id_event": 3, 
            "username": "lets get this party sterted", 
            "attended": true, 
            "rating": 8
        }

        var listaParticipantes = [participante1,participante2,participante3]

        if(idEvento == 1){
            return {
                "collection": listaParticipantes[0],
                "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
                }
            }
        }

        else if(idEvento == 2){
            return {
                "collection": listaParticipantes[1],
                "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
                }
            }
        }

        else if(idEvento == 3){
            return {
                "collection": listaParticipantes[2],
                "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
                }
            }
        }

        if (attended == true)
        {
            return {
                "collection": listaParticipantes[0],
                "collection": listaParticipantes[2],
                "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
                }
            }
        }

        else if (attended == false)
        {
            return {
                "collection": listaParticipantes[1],
                "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
                }
            }
        }

        if (rating == 2)
        {
            return {
                "collection": listaParticipantes[0],
                "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
                }
            }
        }
        
        else if (rating == 9)
        {
            return {
                "collection": listaParticipantes[1],
                "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
                }
            }
        }

        else if (rating == 8)
        {
            return {
                "collection": listaParticipantes[2],
                "pagination": {
                "limit": pageSize,
                "offset": reqPage,
                "nextPage": reqPage + 1, //poner el http
                "total": "1" //no se que es esto
                }
            }
        }
    }

    // writeUser(first_name, last_name, username, password)
    // {
    //     const fetchQuery = "select * from users where users.username = $(username)";
    //     const DBuserExists = fetchQuery.execute();
    //     if(DBuserExists.username == username)
    //     {
            
            
            
            
    //         return "Dos cuentas no pueden tener el mismo usuario";
    //     }
    //     else
    //     {
    //         const writeQuery = "insert into users (first_name, last_name, username, password) values ($(first_name), $(last_name), $(username), $(password))";
    //     }
    // }

    async createUser(first_name, last_name, username, password) {
        const userRepository = new UserRepository();
        console.log("FN: " + first_name + " LN: " + last_name + " US: " + username + " PA: " +password)
        
        try {
            const real = await userRepository.findUserByUsername(username);
            console.log("validacion: "+ real);
            
            if(real) {
                console.log("Ya existe Usuario con ese Username");
                return "Error. Ese usuario ya existe.";
            } else {
                console.log("Creando Usuario: " + username);
                const nuevoUsuario = await userRepository.insertUser(first_name, last_name, username, password);
                console.log("Usuario Creado");
                return nuevoUsuario;
            }
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return "Error al crear usuario.";
        }
    }

    ObtenerToken(userId, nombreUsuario){
        const payload = {
            id: userId, 
            username: nombreUsuario
        }
        const secretKey = "officerboleswahahahahamcityyeahimmanjonklergottajonkleproaslumepillsgwenbonekillercockimproudofyoudickehtthebin"

        const options = {
            expiresIn: '1h'
        }

        const token = jwt.sign({ payload }, secretKey, options); //, {options}
        console.log(token)
        return token
    }

    async loginUserAsync(username, password){
        //si existe el user, firmo un token
        const userRepository = new UserRepository();

        const user = await userRepository.findUserByUsername(username);
        if (!user) { // || user.password !== password
            throw new Error("Invalid username or password.");
        }else if (user){
            console.log("success")
            const token = this.ObtenerToken(user.id, user.username);
            return token;
        }
    }

    async enrollUserToEvent(event, username){
        const eventRepository = new EventRepository();
        
    }
}