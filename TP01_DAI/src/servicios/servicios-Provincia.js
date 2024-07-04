import ProvinceRepository from "../repositories/province-repository.js"
export default class ProvinceService{
 
    
    async getAllProvincias(limit, offset){
        
        const provinceRepository = new ProvinceRepository();
        const listaProvincias = await provinceRepository.getAllProvincias(limit, offset); //error: Maximum Call Stack Exceeded. 

        //return listaProvincias
        const nextPage = `${"http://localhost:3000/province"}?limit=${limit}&offset=${offset + 1}`;

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
        console.log("provincia nombrne: "+provincia)
        return provincia
    }

    async getLocationsPorId(id, limit, offset){
        const provinceRepository = new ProvinceRepository();
        const locations = await provinceRepository.getLocationsById(id, limit, offset)
        //return locations//paginacion

        const nextPage = `${"http://localhost:3000/province/id/locations"}?limit=${limit}&offset=${offset + 1}`;

        return {
            "collection": locations, 
            "pagination": {
                "limit": limit,
                "offset": offset,
                "nextPage": nextPage //poner el http 
        }}
    }

    async createProvincia(body){
        const provinceRepository = new ProvinceRepository();
        const provincia = await provinceRepository.insertProvincia(body)
        return provincia
    }

    async updateProvincia(id, name, full_name, latitude, longitude, display_order){
        const provinceRepository = new ProvinceRepository();
        console.log("name: " +name)
        if(name.length < 3)
        {
            return "name_too_short"
        }
        console.log("latitude es: " + typeof latitude)
        if(typeof latitude !== 'number')
        {
            return "latitude_not_number"
        }
        console.log("longitude es: " + typeof longitude)
        if(typeof longitude !== 'number')
        {
            return "longitude_not_number"
        }

        const result = await provinceRepository.updateProvince(id, name, full_name, latitude, longitude, display_order)
        return result
    }
    async deleteProvincia(id){
        const provinceRepository = new ProvinceRepository();
        provinceRepository.deleteProvincia(id)
    }
}

