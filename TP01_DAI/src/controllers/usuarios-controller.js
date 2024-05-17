import express from "express";
import UserService from "../servicios/servicios-Usuario.js"
const UserController = express.Router(); 
const userService = new UserService();

UserController.post("/register", (req, res) => {
    console.log("el user: " + req.query.username);
    return {
        
    }
});

UserController.post("/login", (req, res) => {
    const username = body.username
    const password = body.password
    const token = ObtenerToken();
})


export default UserController
//:)