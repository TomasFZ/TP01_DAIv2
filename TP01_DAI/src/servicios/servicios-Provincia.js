import ProvinceRepository from "../repositories/province-repository.js"
export default class ProvinceService{
 
    
    async getAllProvincias(limit, offset){
        console.log("limit en service " + limit)
        const provinceRepository = new ProvinceRepository();
        const listaProvincias = await provinceRepository.getAllProvincias(limit, offset); //error: Maximum Call Stack Exceeded. 
        console.log(listaProvincias)
        //return listaProvincias
        const nextPage = `${"http://localhost:3000/api/province"}?limit=${limit}&offset=${offset + 1}`;

        return {
            "collection": listaProvincias, 
            "pagination": {
                "limit": limit,
                "offset": offset,
                "nextPage": nextPage //poner el http 
        }}
    }
    async getProvinciaPorId(idP){
        const provinceRepository = new ProvinceRepository();
        const provincia = await provinceRepository.getProvinceById(idP)
        console.log("provincia nombrne: "+provincia.name)
        return provincia
    }

    async getLocationsPorId(id, limit, offset){
        const provinceRepository = new ProvinceRepository();
        const locations = await provinceRepository.getLocationsById(id, limit, offset)
        //return locations//paginacion

        const nextPage = `${"http://localhost:3000/api/province/id/locations"}?limit=${limit}&offset=${offset + 1}`;

        return {
            "collection": locations, 
            "pagination": {
                "limit": limit,
                "offset": offset,
                "nextPage": nextPage //poner el http 
        }}
    }

    async createProvincia(name, full_name, latitude, longitude, display_order){
        const provinceRepository = new ProvinceRepository();
        const provincia = await provinceRepository.insertProvincia(name, full_name, latitude, longitude, display_order)
        return provincia
    }

    async updateProvincia(id, name, full_name, latitude, longitude, display_order){
        const provinceRepository = new ProvinceRepository();
        console.log("name: " +name)
        

        await provinceRepository.updateProvince(id, name, full_name, latitude, longitude, display_order)
        
    }
    async deleteProvincia(id){
        const provinceRepository = new ProvinceRepository();
        provinceRepository.deleteProvincia(id)
    }
}

