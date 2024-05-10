export default class ProvinceService{
 
    
    async getAllProvincias(pageSize, reqPage){
        
        const provinceService = new ProvinceService();
        const listaProvincias = await provinceService.getAllProvincias(pageSize, reqPage); //error: Maximum Call Stack Exceeded. 
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
        if(idP == 1)
        {
            return {
            "id": 1, 
            "name": "CallMeTheDrink", 
            "full_name": "Parfait", 
            "latitude": 1, 
            "longitude": 1, 
            "display_order": 1
            }
        }
        else if(idP == 2)
        {
            return {
                "id": 2, 
                "name": "Sandwich", 
                "full_name": "SnowGlobe", 
                "latitude": 2, 
                "longitude": 4, 
                "display_order": 7
            }
        }
        else
        {
            return("El ID no existe")
        }
    }

    async createProvincia(provincia){
        //query

        return {
            "id": provincia.id, 
            "name": provincia.name, 
            "full_name": provincia.full_name, 
            "latitude": provincia.latitude, 
            "longitude": provincia.longitude, 
            "display_order": provincia.display_order
        }
    }

    async updateProvincia(provinciaUpdates, id){

        const prov = {
            "id": id, 
            "name": provinciaUpdates.name, 
            "full_name": provinciaUpdates.full_name, 
            "latitude": provinciaUpdates.latitude, 
            "longitude": provinciaUpdates.longitude, 
            "display_order": provinciaUpdates.display_order
        }
        console.log("nombre nuevo: " + prov.name)
        return prov //aca iria una query que modifique la provincia pero como no hay bd no podemos entonces solo devolvemos lo mismo. 
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