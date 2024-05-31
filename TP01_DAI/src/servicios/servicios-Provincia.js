import ProvinceRepository from "../repositories/province-repository.js"
export default class ProvinceService{
 
    
    async getAllProvincias(pageSize, reqPage){
        
        const provinceRepository = new ProvinceRepository();
        const listaProvincias = await provinceRepository.getAllProvincias(pageSize, reqPage); //error: Maximum Call Stack Exceeded. 

        return listaProvincias
        // return { //ver como va, si solo devuelve la lista o el limit, etc. 
        //     "collection": listaProvincias,
        //     "pagination": {
        //     "limit": pageSize,
        //     "offset": reqPage,
        //     "nextPage": reqPage + 1, //poner el http
        //     "total": "1" //no se que es esto
        //     }
        // }
    }
    async getProvinciaPorId(pageSize, reqPage, idP){
        const provinceRepository = new ProvinceRepository();
        console.log("id provincia: " + idP)
        const provincia = await provinceRepository.getProvinceById(idP)
        console.log("provincia nombrne: "+provincia)
        return provincia
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


// ⠀⠸⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣈⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⠂⠀⠀
// ⠀⠀⢿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣶⣤⣄⡀⠀⢨⣿⣿⣿⣿⡇⠀⠀
// ⠀⢠⠞⢻⣿⣿⣿⣿⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠋⠉⠀⠺⣿⣿⣿⣯⠴⢶⡄
// ⠀⣾⣶⣶⡿⣿⣿⣿⠁⠀⠀⣠⣴⣦⣀⠀⠀⠀⠀⠀⢀⠀⢸⡄⢰⣿⣿⣿⣿⣿⣿⡿⠛⣿⣿⡿⢿⠆⠀⢸⣿⣿⣿⣠⣾⣿
// ⠀⢻⣹⣿⡇⢸⣿⡏⠀⠀⠟⠋⠉⠈⢻⣧⠀⠀⠀⠀⠈⢷⡀⣿⣾⣿⣿⡟⣻⣿⡟⢁⡾⠋⠁⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⡿
// ⠀⠈⠏⠁⣰⣄⣿⣇⠀⠀⠀⣦⣸⣄⣤⣿⣷⣄⠀⠀⠀⢸⣷⣿⣿⣿⣿⢣⡿⢫⣶⣟⣥⣄⣀⣤⣴⣶⡄⣸⣿⡏⣾⡇⠘⠀
// ⠀⠀⠀⢸⣿⠋⢻⣿⠀⠀⠀⠘⠟⢻⣟⠉⠙⠛⢷⣤⣴⣼⣡⣇⣿⣿⣇⣻⡶⠿⡿⠟⣉⡿⣿⣿⣿⣿⣿⣿⣿⠁⢻⣧⡀⠀
// ⠀⠀⠰⡎⢻⣦⣈⣗⠀⠀⠀⠀⠀⠀⠭⣰⣶⣶⠿⠟⠉⠏⠈⠉⣿⣿⢾⣿⣷⣌⣙⣋⣉⣠⣿⣿⣿⣿⡉⠁⡏⢠⡾⠏⠃⠀
// ⠀⠀⠀⢳⡀⢸⠏⠉⠀⠀⠀⠀⠀⠀⣀⡈⠉⠁⠀⠀⠀⠀⠀⠀⠿⠋⠀⢿⣿⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠡⠿⠁⠀⠀⠀
// ⠀⠀⠀⠀⠉⠀⠀⠀⠀⣶⣶⣶⣶⣾⣿⣿⣦⣤⡄⠀⠀⠀⠀⠀⢾⣿⣶⡾⠿⠟⠻⠿⢿⣿⣿⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⡿⣿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡟⢹⣿⣿⣿⣷⣿⣿⣿⣷⣾⠇⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⢿⣶⣤⡀⠀⠀⠀⢀⣄⡀⠀⠀⣰⠟⢇⣸⣿⠿⣿⣟⡽⣟⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⢻⣿⣿⣷⣶⣤⣀⡀⠙⠦⠴⣿⣾⣿⣿⣿⣿⡿⢿⣾⡿⠉⣶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢷⠀⠀⠀⠀⢿⣿⡉⠉⠛⠿⠿⣷⢶⣶⣿⣭⠹⡿⠉⠀⠀⢸⣿⠁⢠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣇⠀⠀⠀⠘⣿⣧⣤⣀⡀⠀⠁⠀⠋⠀⠀⠀⡀⢠⣤⣴⣿⠇⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣦⠀⠀⠀⠘⣿⣤⠀⠉⠓⠂⠀⠀⠠⠟⠛⢛⠉⣴⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢺⠳⠄⠀⠀⠘⢿⣦⡄⡀⢀⠀⡀⢠⢀⣼⣼⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡆⠀⢱⡄⠀⠈⢻⣿⣷⣬⣤⣿⣿⣿⣿⣿⢿⠅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⢱⡄⠀⠀⠉⠛⢿⣿⣿⣿⣿⠿⠛⠃⠀⠀⠀