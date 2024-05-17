import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

export function primerMiddleware(req, res, next){
    if(!req.headers.authorization){


        next();
    }else{

    }
}

app.use(primerMiddleware);
