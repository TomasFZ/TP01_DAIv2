import express from "express";
import jwt from 'jsonwebtoken';
export function DecryptToken(req, res, next){
    const secretKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"//"officerboleswahahahahamcityyeahimmanjonklergottajonkleproaslumepillsgwenbonekillercockimproudofyoudickehtthebin"
    if(!req.headers.authorization){
        res.status(401).send('No ingresó el token para confirmar que usted es el usuario')
    }else{
        const tokenRecibido = req.headers.authorization.split(' ')[1];
        if (!tokenRecibido) {
            return res.status(401).send('falta el token');
        }
        req.user = decryptedToken.payload
        try{
            const payload = jwt.verify(tokenRecibido, secretKey)
            //req.query.username = payload.username;
            console.log("Autenticación exitosa")
        }catch(error){
            console.log(error)
        }
    }
    next();
}


