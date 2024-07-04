import express from "express";

import controller from "./controllers/eventos-controller.js";
import UserController from "./controllers/usuarios-controller.js";
import pController from "./controllers/provincias-controller.js";
import elController from "./controllers/event-category-controller.js";
import lController from "./controllers/locations-controller.js";
// import { connectToDatabase } from './repositories/db.js'; //mjs
//mjs

const app = express(); 

app.use(express.json()); //este tambien es middleware. 

const port = 3001;

app.use(elController)
app.use("/event", controller); //ESTO ES MUY IMPORTANTE. Estos son middlewares. 
app.use("/user", UserController);
app.use("/province", pController);
app.use("/location", lController);
app.use("/event-category", elController);


app.listen(port, () => {
    console.log("server anda")
})


//para cuando este la db deseditar: mjs
/* connectToDatabase(); */



//toda la capa de controladores. todos los endpoints, parametros, etc. 



