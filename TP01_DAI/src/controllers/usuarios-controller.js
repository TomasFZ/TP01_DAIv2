import express from "express";
import UserService from "../servicios/servicios-Usuario.js"
//import {AuthMiddleware, primerMiddleware} from '../Middleware.js'
//import {ValidateBody} from ''
const UserController = express.Router(); 
const userService = new UserService();
// const jwt = require("jsonwebtoken")
//https://medium.com/@diego.coder/autenticaci%C3%B3n-en-node-js-con-json-web-tokens-y-express-ed9d90c5b579

UserController.post("/register", (req, res) => {
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const username = req.query.username
    const password = req.query.password
    console.log(first_name, last_name) 

    try{
        const nuevoUsuario = userService.createUser(first_name, last_name, username, password);
        console.log(nuevoUsuario) 
        return res.send(nuevoUsuario)
    }
    catch(e){
        console.log(e)
        res.status(400).send(error.message);
    }
});

UserController.post("/login", (req, res) => {
    // if(.length <= 0){

    // }
    const username = req.body.username //ver si es con .body so .query
    const password = req.body.password
    const validacion = userService.ValidateBody(username, password)                //validateBody valida el login por username y password exclusivamente
    if(validacion){
        const token = userService.ObtenerToken(req.query.id, username);
    }else{
        return res.send("Cuenta inexistente.")
    }
})



export default UserController
//:)