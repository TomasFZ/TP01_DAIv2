import express from "express";
import jwt from 'jsonwebtoken';
export function DecryptToken(req, res, next){
    const secretKey = "officerboleswahahahahamcityyeahimmanjonklergottajonkleproaslumepillsgwenbonekillercockimproudofyoudickehtthebin"
    if(!req.headers.authorization){
        res.status(401).send('No ingresó el token para confirmar que usted es el usuario')
    }else{
        const tokenRecibido = req.headers.authorization.split(' ')[1];
        if (!tokenRecibido) {
            return res.status(401).send('Unauthorized: Missing token');
        }
        //req.user = decryptedToken.payload
        try{
            const payload = jwt.verify(tokenRecibido, secretKey)
            req.query.username = payload.username;
            console.log("Autenticación exitosa")
        }catch(error){
            console.log(error)
        }
    }
    next();
}

// app.use(primerMiddleware);
