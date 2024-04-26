import express from "express";
import UserService from "../servicios/servicios-Usuario.js"
const UserController = express.Router(); 
const userService = new UserService();

UserController.get("/register", (req, res) => {
    return ("Cuenta creada con exito! Usuario:" + req.query.username + " Nombre:" + req.query.first_name)
});

export default UserController
//:)