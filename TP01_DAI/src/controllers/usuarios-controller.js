import express from "express";
import UserService from "../servicios/servicios-Usuario.js"
import { DecryptToken } from "../Middleware.js";
//import {AuthMiddleware, primerMiddleware} from '../Middleware.js'
//import {ValidateBody} from ''
const UserController = express.Router(); 
const userService = new UserService();
// const jwt = require("jsonwebtoken")

UserController.post("/register", async(req, res) => {
    const first_name = req.body.first_name 
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
        return res.status(201).send("Usuario creado. " + nuevoUsuario);
    }
    catch(e){
        console.log(e)
        //res.status(400).send(e.message);
        return res.status(500).send(e + "Error")
    }
});

UserController.post("/login",  async (req, res) => { //loguea exitosamente al usuario y le brinda un token para validar futuras ejecuciones. 
    const username = req.body.username 
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


//nuevo endpoint exclusivo del tp nuevo de efsi (dlc): 

UserController.get("/getUserID", async(req, res) => {
    const username = req.query.username 
    console.log("Hola yo recibo sas (en el controller): " + username)
    const user = await userService.findUserByUsername(username)
    const userId = user.rows[0].id;
    console.log("En hiatus por (en el controller): " + userId)
    return res.send("userId: "+userId)
})



export default UserController