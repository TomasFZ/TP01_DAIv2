import express from "express";
const app = express();
const port = 3000;



function primerMiddleware(token){
    
}

export function DecryptToken(req, res, next){
    if(!req.headers.authorization){
        res.status(401).send('forbidden')
    }else{
        const token = req.headers.authorization.split('')[1];
        const decryptedToken = DecryptToken(token)
        req.user = decryptedToken.payload
        const secretKey = "officerboleswahahahahamcityyeahimmanjonklergottajonkleproaslumepillsgwenbonekillercockimproudofyoudickehtthebin"
        try{
            const payload = jwt.verify(token, secretKey)
        }catch(error){
        
        }

    }
    next();
}

// app.use(primerMiddleware);
