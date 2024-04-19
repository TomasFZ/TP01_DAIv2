import express from "express";
import UserService from "../servicios/servicios-Usuario.js"
const UserController = express.Router(); 
const userService = new UserService();
console.log("que");
UserController.get(":/id/enrollment", (req, res) => {
    console.log("entro a usercontroller");

    var queryFiltersUsuarios = Object.keys(req.query).filter((key) => key.includes("name") | key.includes("apellido") | key.includes("username") | key.includes("attended") | key.includes("rating"))
    var bool = false
    for(var i=0; i < queryFiltersUsuarios.length; i++)
    {
        if(queryFiltersUsuarios[i] == "name" | queryFiltersUsuarios[i] == "apellido" | queryFiltersUsuarios[i] == "username" | queryFiltersUsuarios[i] == "attended" | queryFiltersUsuarios[i] == "rating"){
            bool = true
        }
    }
    if (bool)
    {
        console.log("ds")
        const listaUsuarios = userService.getUser(req.params.idEvento, req.query.username, req.query.password, req.query.attended);
        return res.status(500).send(listaUsuarios) //aca manda los usuarios del evento buscado
    }
    else
    {
        console.log("kgggfgdgf")  //no encontro ningun usuario que coincida
        return null;
    }
})

export default UserController