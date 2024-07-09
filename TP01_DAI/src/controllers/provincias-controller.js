import express from "express";
import ProvinceService from "../servicios/servicios-Provincia.js";
import EventService from "../servicios/servicios-Eventos.js";

const pController = express.Router();
const provinceService = new ProvinceService();

pController.get("/", async (req, res) => {
    var limit = Number(req.query.limit);
    var offset = Number(req.query.offset);
    if (isNaN(limit) || isNaN(offset)) {
        limit = 100;
        offset = 1;
    }
    console.log("LIMIT: " + limit)
    const listaProvincias = await provinceService.getAllProvincias(limit, offset);
    console.log("listaProvincias: " + listaProvincias)
    return res.status(200).send(listaProvincias)
});

pController.get("/:id", async (req, res) => {
    const provincia = await provinceService.getProvinciaPorId(req.params.id);
    if (!provincia) {
        return res.status(404).send("Provincia inexistente")
    }
    return res.status(200).send(provincia)
});

pController.get("/:id/locations", async (req, res) => {
    var limit = Number(req.query.limit);
    var offset = Number(req.query.offset);
    if (isNaN(limit) || isNaN(offset)) {
        limit = 100;
        offset = 1;
    }
    const provincia = await provinceService.getLocationsPorId(req.params.id, limit, offset);
    if (!provincia) {
        return res.status(404).send("Provincia inexistente")
    }
    return res.status(200).send(provincia)
});

pController.post("/", async (req, res) => {
    const name = req.body.name;
    const full_name = req.body.full_name;
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const display_order = Number(req.body.display_order);
    console.log("typeof de latitude = " + (typeof latitude) +" y es " +latitude)
    if (!ValidacionBody(name, full_name, latitude, longitude, display_order)) {
        return res.status(400).send("Bad request");
    }

    const val = await ValidacionProvincia(full_name);
    console.log("validacion: " + val)

    if (val) {
        return res.status(404).send({ message: 'Provincia ya existente' });
    } else {
        await provinceService.createProvincia(name, full_name, latitude, longitude, display_order);
        return res.send("Provincia agregada exitosamente");
    }
});

pController.put("/", async (req, res) => {
    try {
        const id = Number(req.body.id);
        const name = req.body.name;
        const full_name = req.body.full_name;
        const latitude = Number(req.body.latitude);
        const longitude = Number(req.body.longitude);
        const display_order = Number(req.body.display_order);

        
        if (!ValidacionBody(name, latitude, longitude, full_name, display_order)) {
            return res.status(400).send("Bad request");
        }
        const provincia = await provinceService.getProvinciaPorId(req.params.id);
        if (!provincia) {
        return res.status(404).send("Provincia inexistente")
        }
        
        await provinceService.updateProvincia(id, name, full_name, latitude, longitude, display_order);
       
        

        return res.status(201).send("Provincia Actualizada Correctamente.");
    } catch (error) {
        console.error('Error al actualizar la provincia:', error);
        res.status(500).send({ message: 'Error al actualizar la provincia' });
    }
});

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

async function ValidacionProvincia(full_name) {
    var yaExiste = false;
    var i = 0;
    //console.log(body);
    const provincias = await provinceService.getAllProvincias();
    while (i < provincias.length && !yaExiste) {
        if (full_name === provincias[i].full_name) {
            yaExiste = true;
            console.log("esa provincia ya existe")
        }
        i++;
    }
    console.log(yaExiste);
    return yaExiste;
}

function ValidacionBody(name, full_name, latitude, longitude, display_order) {
    // if (name === "" || name.length < 3 || typeof latitude !== "number" || isNaN(latitude) || isNaN(longitude) || typeof longitude !== "number" || typeof full_name !== "string" || typeof name !== "string" || typeof display_order !== "number" || display_order < 0) {
    //     return false;
    // } else {
    //     return true;
    // }

    if (name === "") {
        console.log("El nombre está vacío.");
        return false;
    }
    
    if (name.length < 3) {
        console.log("El nombre tiene menos de 3 caracteres.");
        return false;
    }
    
    if (typeof latitude !== "number" || isNaN(latitude)) {
        console.log("La latitud no es un número.");
        console.log(typeof latitude)
        return false;
    }
    
    if (typeof longitude !== "number" || isNaN(longitude)) {
        console.log("La longitud no es un número.");
        return false;
    }
    
    if (typeof full_name !== "string") {
        console.log("El nombre completo no es una cadena.");
        return false;
    }
    
    if (typeof name !== "string") {
        console.log("El nombre no es una cadena.");
        return false;
    }
    
    return true;
    
}

export default pController;
