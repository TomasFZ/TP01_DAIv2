import express from "express";
import ProvinceService from "../servicios/servicios-Provincia.js";
const pController = express.Router(); 
const provinceService = new ProvinceService();


pController.get("/", async (req, res) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    if(limit >= 0 && offset >= 0){
        const listaProvincias = await provinceService.getAllProvincias(limit, offset);
        console.log("listaProvincias: " + listaProvincias)
        return res.status(200).send(listaProvincias)
    }
    else{
        return res.send("Offset o limit invalidos")
    }
})

pController.get("/:id", async (req, res) => { 
    
    const provincia = await provinceService.getProvinciaPorId(req.params.id);
    if(!provincia){
        return res.status(404).send("Provincia inexistente")
    }
    return res.status(200).send(provincia)
})

pController.get("/:id/locations", async (req, res) => { 
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const provincia = await provinceService.getLocationsPorId(req.params.id, limit, offset);
    if(!provincia){
        return res.status(404).send("Provincia inexistente")
    }
    return res.status(200).send(provincia)
})

pController.post("/", async (req, res) => {
    const body = req.body; // Utiliza req.body para obtener los datos del cuerpo de la solicitud. cual es la diferencia que tiene con query? no se

    var val = await ValidacionProvincia(body)
    console.log("validacion: " + val)
    
    if (val) {
        return res.status(404).send({ message: 'Provincia ya existente' });
    } else {
        await provinceService.createProvincia(body); 
        return res.send("Provincia agregada exitosamente");
    }


});

pController.put("/", async (req, res) => { //esto es put. entonces se modifica todo. Patch seria que modifica una parte. 
    try 
    {
        
        const id = Number(req.body.id)
        const name = req.body.name
        console.log("Controller:" + name)
        const full_name = req.body.full_name
        const latitude = Number(req.body.latitude)
        const longitude = Number(req.body.longitude)
        const display_order = Number(req.body.display_order)
        
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
        const id = Number(req.params.id);
        console.log("ID recibido para eliminar: " + id);

        const listaProvincias = (await provinceService.getAllProvincias()).collection;
        console.log("Lista de provincias obtenida:", listaProvincias);

        var provinciaEncontrada = listaProvincias.find(provincia => {
            console.log(`Comparando ${provincia.id} con ${id}`);
            return provincia.id === id;
        });

        if (provinciaEncontrada) {
            await provinceService.deleteProvincia(id);
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
