import express from "express";
import jwt from 'jsonwebtoken';

export function DecryptToken(req, res, next) {
    const secretKey = "batmanbtamnfisnf";
    
    if (!req.headers.authorization) {
        return res.status(401).send('No ingresó el token para confirmar que usted es el usuario');
    }
    
    const tokenRecibido = req.headers.authorization.split(' ')[1];
    console.log("TOKEN RECIBIDO: " + tokenRecibido)
    try {
        const payload = jwt.verify(tokenRecibido, secretKey);
        req.user = payload; 
        console.log("payload: ", payload);
        console.log("PAYLOAD ID " + payload.id)
        console.log("requser ID " + req.user.id)

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send('Token inválido');
    }
}
