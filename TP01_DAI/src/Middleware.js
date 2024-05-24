import express from "express";
import jwt from 'jsonwebtoken';
export function DecryptToken(req, res, next){
    const secretKey = "officerboleswahahahahamcityyeahimmanjonklergottajonkleproaslumepillsgwenbonekillercockimproudofyoudickehtthebin"
    if(!req.headers.authorization){
        res.status(401).send('forbidden')
    }else{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized: Missing token');
        }
        //req.user = decryptedToken.payload
        try{
            const payload = jwt.verify(token, secretKey)
            req.query.username = payload.username;
        }catch(error){
            console.log(error)
        }
    }
    next();
}

// app.use(primerMiddleware);
