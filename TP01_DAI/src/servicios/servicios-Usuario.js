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

    ObtenerToken(userId, nombreUsuario){
        const payload = {
            id: userId, 
            username: nombreUsuario
        }
        const secretKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

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
        console.log("USER: "+user.rows[0].username)
        console.log("Password escrita por persona: " + password)
        console.log("Password de la bd: " + user.rows[0].password)
        if (!user) { // || user.password !== password
            throw new Error("Username invalido.");
        }else if (user && user.rows[0].password === password){
            console.log("success")
            const token = this.ObtenerToken(user.id, user.username);
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