import express from "express";

import controller from "./controllers/eventos-controller.js";
import UserController from "./controllers/usuarios-controller.js";
import pController from "./controllers/provincias-controller.js";
import servicios from "./servicios/servicios-Eventos.js";
// import { connectToDatabase } from './repositories/db.js'; //mjs
//mjs

const app = express(); 

app.use(express.json()); //este tambien es middleware. 

const port = 3000;

app.use("/event", controller); //ESTO ES MUY IMPORTANTE. Estos son middlewares. 
app.use("/user", UserController);
app.use("/province", pController);


app.listen(port, () => {
    console.log("server anda")
})


//para cuando este la db deseditar: mjs
/* connectToDatabase(); */



//toda la capa de controladores. todos los endpoints, parametros, etc. 



