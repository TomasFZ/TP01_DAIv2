import express from "express";
import ProvinceService from "../servicios/servicios-Provincia.js";
const pController = express.Router(); 
const provinceService = new ProvinceService();


pController.get("/", (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const listaProvincias = provinceService.getAllProvincias(limit, offset);
    return res.status(501).send(listaProvincias)
})

pController.get("/:id", (req, res) => {  
    console.log("entro a parfait")
    const limit = req.query.limit;
    const offset = req.query.offset;
    const provincia = provinceService.getProvinciaPorId(limit, offset, req.params.id);
    return res.status(501).send(provincia)
})

pController.post("/", (req, res) => {
    const body = req.query; // Utiliza req.body para obtener los datos del cuerpo de la solicitud. cual es la diferencia que tiene con query? no se, nunca lo vimos. 
    var yaExiste = false;
    var i = 0
    console.log(body)
    const provincias = provinceService.getAllProvincias().collection;
    console.log(provincias[0])
    while(i<provincias.length - 1 && yaExiste != true) {
        console.log(i)
        if (body.id == provincias[i].id) {
            yaExiste = true;
            console.log("id de la provincia looooooool: " + provincias[i].id)
        }
        i++;
    }
    if (yaExiste) {
        return res.status(404).send({ message: 'Provincia ya existente' });
    } else {
        const provincia = {
            "id": body.id,
            "name": body.name,
            "full_name": body.full_name,
            "latitude": body.latitude,
            "longitude": body.longitude,
            "display_order": body.display_order
        };
        provinceService.createProvincia(provincia); 
        return res.send(provincia);
    }
});

pController.put('/:id', (req, res) => { //esto es put. entonces se modifica todo. Patch seria que modifica una parte. 
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const id = req.params.id;
        var bool = false
        var provinciaAUpdatear
        const listaProvincias = provinceService.getAllProvincias(limit, offset).collection;
            for(var i = 0; i < listaProvincias.length - 1; i++){
                if(listaProvincias[i].id == req.params.id){
                    provinciaAUpdatear = {
                        "id": id, 
                        "name": req.query.name, 
                        "full_name": req.query.full_name, 
                        "latitude": req.query.latitude, 
                        "longitude": req.query.longitude, 
                        "display_order": req.query.display_order
                    }
                }
            }
            console.log(provinciaAUpdatear.name)
            const provinciaUpdated = provinceService.updateProvincia(provinciaAUpdatear, id) //para cuando este la bd
            console.log("nombre nuevo de provincia: " + provinciaUpdated.name)
            return res.send(provinciaUpdated)
    } catch (error) {
        console.error('Error al actualizar la provincia:', error);
        res.status(500).send({ message: 'Error al actualizar la provincia' });
    }
})

pController.delete("/:id", (req, res) => {    
    try {
        const id = req.params.id;
        const listaProvincias = provinceService.getAllProvincias().collection;
        //const provincia = listaProvincias.id.find(provincia => provincia.id === id);
        var i = 0
        var provincia
        var encontrado = false
        while(i < listaProvincias.length && encontrado == false){
            if(listaProvincias[i].id == id){
                encontrado = true
                provincia = listaProvincias[i]
            }
            i++;
        }
        console.log("privocinsas nombrefjrkwns: " + provincia.name)
        if (encontrado) {
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
