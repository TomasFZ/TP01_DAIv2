// import pg from "pg";
//mjs
import UserRepository from "../repositories/usuario-repository.js"
import jwt from 'jsonwebtoken'
export default class UserService
{
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

   ObtenerToken(userId, nombreUsuario) {
    const payload = {
        id: userId, 
        username: nombreUsuario
    };
    const secretKey = "batmanbtamnfisnf";

    const options = {
        expiresIn: '1h',
        issuer: 'localhost'
    };

    const token = jwt.sign(payload, secretKey, options);
    console.log("payload.id: " + payload.id)
    console.log(  "TOKENTOKENTOKENTOKEN "+  token, token.id);
    
    return token;
}


    async loginUserAsync(username, password){
        //si existe el user, firmo un token
        const userRepository = new UserRepository();

        const user = await userRepository.findUserByUsername(username);
        console.log("USER: "+user.rows[0].username)
        console.log("Password escrita por persona: " + password)
        console.log("Password de la bd: " + user.rows[0].password)
        console.log("user.id: " + user.rows[0].id)
        if (!user) { // || user.password !== password
            throw new Error("Username invalido.");
        }else if (user && user.rows[0].password === password){
            console.log("success")
            const token = this.ObtenerToken(user.rows[0].id, user.rows[0].username);
            return token;
        }
    }

    async findUserByUsername(username){
        const userRepository = new UserRepository();
        const user = await userRepository.findUserByUsername(username);
        return user;
    }

    async getUserById(id){
        const userRepository = new UserRepository();
        const user = await userRepository.getUserById(id);
        return user;
    }
}