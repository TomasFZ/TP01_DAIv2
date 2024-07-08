export function validacionToken(req, res){
    if(req.user === undefined){
        return res.status(400).send("Error. Token incorrecto.")
    }
}

export function validacionLimitOffset(limit, offset){
    if (isNaN(limit)) {
        limit = 100;
    }if(isNaN(offset)){
        offset=1
    }
    return { limit: limit, offset: offset };
}