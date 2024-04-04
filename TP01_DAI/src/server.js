import express from "express";

import controller from "./controllers/eventos-controller.js";
import servicios from "./servicios/servicios.js";
import { connectToDatabase } from './repositories/db.js'; //mjs


const app = express(); 

app.use(express.json());

const port = 3000;




// app.use("/controller", controller);

app.listen(port, () => {
    console.log("server anda")
})

connectToDatabase();



