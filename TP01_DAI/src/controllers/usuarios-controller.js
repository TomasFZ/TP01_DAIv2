import express from "express";

const UserController = express.Router(); 
console.log("que");
UserController.get("/", (req,res) => {
    console.log("entro a usercontroller");
    return ":v"
})

export default UserController