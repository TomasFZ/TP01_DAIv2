import express from "express";
import UserService from "../servicios/servicios-Usuario.js"
import { DecryptToken } from "../Middleware.js";
//import {AuthMiddleware, primerMiddleware} from '../Middleware.js'
//import {ValidateBody} from ''
const UserController = express.Router(); 
const userService = new UserService();
// const jwt = require("jsonwebtoken")
//https://medium.com/@diego.coder/autenticaci%C3%B3n-en-node-js-con-json-web-tokens-y-express-ed9d90c5b579

UserController.post("/register", async(req, res) => {
    const first_name = req.body.first_name //pase de req.query a req.body, comprobar si sigue funcionando. 
    const last_name = req.body.last_name
    const username = req.body.username
    const password = req.body.password
    console.log(first_name, last_name) 

    if(first_name === "" | last_name === "" | first_name.length < 3 | last_name < 3 | password === "" | password.length < 3){
        return res.status(400).send("Error en el registro. Uno o más de los campos no cumple. ")
    }


    try{
        const nuevoUsuario = await userService.createUser(first_name, last_name, username, password);
        console.log("nuevo usuario: " + username) //funciona. si el username ya existe no lo crea. lo unico que falta seria comunicarlo por pantalla cuando suceda, porque ahora mismo trae un [object: promise]. Pero reitero que funciona
        return res.send("Usuario creado. " + nuevoUsuario)
    }
    catch(e){
        console.log(e)
        //res.status(400).send(e.message);
        return res.status(201).send(e + "Error")
    }
});

UserController.post("/login",  async (req, res) => { //loguea exitosamente al usuario y le brinda un token para validar futuras ejecuciones. 
    const username = req.body.username //ver si es con .body so .query
    const password = req.body.password

    console.log("USENAME CONTROLLER: " +username)

    const token = await userService.loginUserAsync(username, password)                //validateBody valida el login por username y password exclusivamente
    if(token){
        //const token = userService.ObtenerToken(req.query.id, username);
        return res.send("logueado. Token: " + token)
    }else{
        return res.send("Cuenta inexistente.")
    }
})

export default UserController