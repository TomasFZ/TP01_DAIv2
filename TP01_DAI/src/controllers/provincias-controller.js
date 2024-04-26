import express from "express";
import ProvinceService from "../servicios/servicios-Provincia.js";
const pController = express.Router(); 
const provinceService = new ProvinceService();


pController.get("/", (req, res) => { //select todos. falta en servicios-Provincia la funcion. 
    const limit = req.query.limit;
    const offset = req.query.offset;
    const listaProvincias = provinceService.getAllProvincias(limit, offset);
    return res.status(501).send(listaProvincias)
})

pController.get("/:id", (req, res) => { //select por id. falta en servicios-Provincia la funcion. 
    console.log("entro a parfait")
    const limit = req.query.limit;
    const offset = req.query.offset;
    const provincia = provinceService.getProvinciaPorId(limit, offset, req.params.id);
    return res.status(501).send(provincia)
})

pController.post("/", (req, res) => {
    const body = req.query //el body es lo que solicita el usuario por postman en formato json
    //console.log(body)
    var yaExiste
    const listaProvincias = provinceService.getAllProvincias();
    for(var i = 0; i<listaProvincias.length; i++){
        console.log("Lo que veo es: " + listaProvincias[i].id)
        if(req.query.id == listaProvincias[i].id){
            yaExiste = true
        }else if(yaExiste != true){
            yaExiste = false
            const provincia = {
                "id": body.id, 
                "name": body.name, 
                "full_name": body.full_name, 
                "latitude": body.latitude, 
                "longitude": body.longitude, 
                "display_order": body.display_order
            }
            provinceService.createProvincia(provincia); //escribir los parametros para la creacion
        }else if(id <1){
            return res.send("id imposible")
        }
    }
    console.log(yaExiste)
    if(!yaExiste){
    return res.send( //hacer el object.keys para la verificacion. 
        { 
        "id": body.id, 
        "name": body.name, 
        "full_name": body.full_name, 
        "latitude": body.latitude, 
        "longitude": body.longitude, 
        "display_order": body.display_order
        })//podria hacerse directamente return res.send(provincia)
    }else{
        res.status(404).send({ message: 'Provincia ya existente' });
    }
})

pController.put('/:id', (req, res) => { //esto es put. entonces se modifica todo. Patch seria que modifica una parte. 
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const id = req.params.id;
        var bool = false
        var provinciaAUpdatear
        var boolName, boolFullName, boolLatitude, boolLongitude, boolDisplayOrder = true;
        const listaProvincias = provinceService.getAllProvincias(limit, offset);
        /*for(var i = 0; i < listaProvincias.length; i++){
            console.
        }*/
        console.log(provinceService.getAllProvincias(limit,offset)) //ESTO RETORNA BIEN. 
        //var queryFilters = Object.keys(req.query).filter((key) => key.includes("name") | key.includes("full_name") | key.includes("latitude") | key.includes("longitude") | key.includes("display_order"))
        // for(var i=0; i < queryFilters.length; i++)
        // {
        //     if(queryFilters[i] == "name" | queryFilters[i] == "full_name" | queryFilters[i] == "latitude" | queryFilters[i] == "longitude" | queryFilters[i] == "display_order"){
        //         bool = true
        //     }
            /* if(req.query.full_name != null){ para cuando se quiera updatear solo un atributo de una provincia y no todo. 
                boolFullName = false
            }
            if(req.query.latitude != null){
                boolLatitude = false
            }
            if(req.query.longitude != null){
                boolLongitude = false
            }
            if(req.query.display_order != null){
                boolDisplayOrder = false
            } */
        // }
            for(var i = 0; i < listaProvincias.length; i++){
                if(listaProvincias[i].id == req.params.id){
                    provinciaAUpdatear = listaProvincias[i]
                    bool = true
                }
            }
            console.log(provinciaAUpdatear.nombre)
            const provinciaUpdated = provinceService.updateProvincia(provinciaAUpdatear) //para cuando este la bd
            return res.send(provinciaUpdated)
        
            if(bool == false) {
                res.status(404).send({ message: 'Provincia no encontrada' });
            }
    } catch (error) {
        console.error('Error al actualizar la provincia:', error);
        res.status(500).send({ message: 'Error al actualizar la provincia' });
    }
})

pController.delete("/:id", (req, res) => {    
    try {
        const id = req.params.id;
        
        const listaProvincias = provinceService.getAllProvincias();
        const provincia = listaProvincias.find(provincia => provincia.id === id);

        if (provincia) {
            provinceService.deleteProvincia(id);
            return res.send("Provincia borrada exitosamente.");
        } else {
            return res.status(404).send("Provincia no encontrada.");
        }
    } catch (error) {
        console.error('Error al eliminar la provincia:', error);
        return res.status(500).send("Error al eliminar la provincia.");
    }
});

export default pController
