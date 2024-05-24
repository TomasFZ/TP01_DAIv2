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
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const username = req.query.username
    const password = req.query.password
    console.log(first_name, last_name) 

    try{
        const nuevoUsuario = await userService.createUser(first_name, last_name, username, password);
        console.log("nuevo usuario: " + nuevoUsuario) //funciona. si el username ya existe no lo crea. lo unico que falta seria comunicarlo por pantalla cuando suceda, porque ahora mismo trae un [object: promise]. Pero reitero que funciona
        return res.send(nuevoUsuario)
    }
    catch(e){
        console.log(e)
        //res.status(400).send(e.message);
        return res.status(201).send(e + "Perrr")
    }
});

UserController.post("/login",  (req, res) => { //loguea exitosamente al usuario y le brinda un token para validar futuras ejecuciones. 
    // if(.length <= 0){

    // }
    const username = req.query.username //ver si es con .body so .query
    const password = req.query.password
    const validacion = userService.loginUserAsync(username, password)                //validateBody valida el login por username y password exclusivamente
    if(validacion){
        //const token = userService.ObtenerToken(req.query.id, username);
        return res.send("logueado")
    }else{
        return res.send("Cuenta inexistente.")
    }
})

export default UserController