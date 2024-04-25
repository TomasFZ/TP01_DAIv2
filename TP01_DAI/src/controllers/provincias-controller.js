import express from "express";
import ProvinceService from "../servicios/servicios-Provincia.js";
const controller = express.Router(); 
const provinceService = new ProvinceService();


controller.get("/", (req, res) => { //select todos. falta en servicios-Provincia la funcion. 
    const limit = req.query.limit;
    const offset = req.query.offset;
    const listaProvincias = provinceService.getAllProvincias(limit, offset);
    return res.status(501).send(listaProvincias)
})

controller.get("/:id", (req, res) => { //select por id. falta en servicios-Provincia la funcion. 
    const limit = req.query.limit;
    const offset = req.query.offset;
    const provincia = provinceService.getProvinciaPorId(limit, offset, req.query.id);
    return res.status(501).send(provincia)
})

controller.post("/", (req, res) => {
    const body = req.body //el body es lo que solicita el usuario por postman en formato json
    console.log(body)
    return res.send( //hacer el object.keys para la verificacion. 
        { 
        "id": body.id, 
        "name": body.name, 
        "full_name": body.fullName, 
        "latitude": body.latitude, 
        "longitude": body.longitude, 
        "display_order": body.displayOrder
        }
    )
})

controller.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nombre = req.body.nombre;
        
        const listaProvincias = await provinceService.getAllProvincias();

        const provincia = listaProvincias.find(provincia => provincia.id === id);

        if (provincia) {
            provincia.nombre = nombre;
            provinceService.updateProvincia(provincia);
            res.send({ message: 'Provincia actualizada correctamente' });
        } else {
            res.status(404).send({ message: 'Provincia no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la provincia:', error);
        res.status(500).send({ message: 'Error al actualizar la provincia' });
    }
});

controller.delete("/:id", (req, res) => {    
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
