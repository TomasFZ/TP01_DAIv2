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
    console.log("entro a parfait")
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
        return res.send(newProvince);
    }


});

pController.put("/", async (req, res) => { //esto es put. entonces se modifica todo. Patch seria que modifica una parte. 
    try 
    {
        const limit = req.query.limit;
        const offset = req.query.offset;
        
        const id = req.query.id
        const name = req.query.name
        const full_name = req.query.full_name
        const id_province = req-query.id_province
        const latitude = req.query.latitude
        const longitude = req.query.longitude

        /* const listaProvincias = provinceService.getAllProvincias(limit, offset);
        console.log(provinciaAUpdatear.name) */
        
        const provinciaUpdated = provinceService.updateProvincia(provinciaAUpdatear, id) //para cuando este la bd
        console.log("nombre nuevo de provincia: " + provinciaUpdated.name)

        return res.send(provinciaUpdated)
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


async function ValidacionProvincia(body){
    var yaExiste = false;
    var i = 0
    console.log(body)
    const provincias = await provinceService.getAllProvincias();
    while(i<provincias.length - 1 && yaExiste != true) {
        if (body.id == provincias[i].id | body.full_name == provincias[i].full_name) {
            yaExiste = true;
            console.log("esa provincia ya existe")
        }
        i++;
    }
    console.log(yaExiste)
    return yaExiste
}

export default pController
