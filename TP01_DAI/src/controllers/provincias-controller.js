import express from "express";
import ProvinceService from "../servicios/servicios-Provincia.js";
const pController = express.Router(); 
const provinceService = new ProvinceService();


pController.get("/", async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    if(limit >= 0 && offset >= 0){
        const listaProvincias = await provinceService.getAllProvincias(limit, offset);
        console.log("listaProvincias: " + listaProvincias)
        return res.status(501).send(listaProvincias)
    }
    else{
        return res.send("Offset o limit invalidos")
    }
})

pController.get("/:id", async (req, res) => { 
    const limit = req.query.limit;
    const offset = req.query.offset;
    const provincia = await provinceService.getProvinciaPorId(limit, offset, req.params.id);
    console.log(provincia)
    return res.status(501).send(provincia)
})

pController.post("/", async (req, res) => {
    const body = req.query; // Utiliza req.body para obtener los datos del cuerpo de la solicitud. cual es la diferencia que tiene con query? no se, nunca lo vimos. 

    var val = await ValidacionProvincia(body)
    console.log("validacion: " + val)
    
    if (val) {
        return res.status(404).send({ message: 'Provincia ya existente' });
    } else {
        const newProvince = await provinceService.createProvincia(body); 
        return res.send("Provincia creada exitosamente");
    }


});

pController.put("/", async (req, res) => { //esto es put. entonces se modifica todo. Patch seria que modifica una parte. 
    try 
    {
        
        const id = Number(req.query.id)
        const name = req.query.name
        console.log("Controller:" + name)
        const full_name = req.query.full_name
        const latitude = Number(req.query.latitude)
        const longitude = Number(req.query.longitude)
        const display_order = Number(req.query.display_order)
        
        const result = await provinceService.updateProvincia(id, name, full_name, latitude, longitude, display_order)
        console.log("Result que obtuve fué: " + result)
        
        if(result == "name_too_short" | result == "latitude_not_number" | result == "longitude_not_number")
        {
            return res.status(400).send(result);
        }

        return res.status(201).send("Provincia Actualizada Correctamente :)")
    } 
    
    catch (error) 
        {
            console.error('Error al actualizar la provincia:', error);
            res.status(500).send({ message: 'Error al actualizar la provincia' });
        }
})

pController.delete("/:id", async (req, res) => {    
    try {
        const id = req.params.id;
        const listaProvincias = await provinceService.getAllProvincias();
        //const provincia = listaProvincias.id.find(provincia => provincia.id === id);
        console.log(listaProvincias)
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
            return res.status(201).send("Provincia borrada exitosamente.");
        } else {
            return res.status(404).send("Provincia no encontrada.");
        }
    } catch (error) {
        console.error('Error al eliminar la provincia:', error);
        return res.status(500).send("Error al eliminar la provincia.");
    }
});


async function ValidacionProvincia(body){
    var yaExiste = false;
    var i = 0
    console.log(body)
    const provincias = await provinceService.getAllProvincias();
    while(i<provincias.length && yaExiste != true) {
        if (body.full_name == provincias[i].full_name) {
            yaExiste = true;
            console.log("esa provincia ya existe")
        }
        i++;
    }
    console.log(yaExiste)
    return yaExiste
}

export default pController
