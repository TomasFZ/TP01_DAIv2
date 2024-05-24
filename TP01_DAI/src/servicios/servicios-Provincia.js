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

    async updateProvincia(id, name, full_name, id_province, latitude, longitude){
        const provinceRepository = new ProvinceRepository();
        const ogProvince = provinceRepository.getProvinceById(id)
        const finalProvince = provinceRepository.updateProvince(ogProvince, name, full_name, id_province, latitude, longitude)

    }
    async deleteProvincia(id){
        //query
        var mental = "borrado"
        //¯\_(ツ)_/¯
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