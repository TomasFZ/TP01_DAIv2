export function validacionToken(req, res){
    if(req.user === undefined){
        return res.status(400).send("Error. Token incorrecto.")
    }
}