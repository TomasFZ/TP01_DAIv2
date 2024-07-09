export function validacionToken(req, res){
    if(req.user === undefined){
        return res.status(400).send("Error. Token incorrecto.")
    }
}

export function validacionLimit(limit){
    if (isNaN(limit) || limit <0) {
        limit = 100;
    }
    return limit;
}

export function validacionOffset(offset){
    
    if(isNaN(offset) || offset<0){
        offset=1
    }
    return offset;
}