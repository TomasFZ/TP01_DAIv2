export default class ProvinceService{
 
    
    getAllProvincias(pageSize, reqPage){
        const listaProvincias = [
            {
                "id": 1, 
                "name": "CallMeTheDrink", 
                "full_name": "Parfait", 
                "latitude": 1, 
                "longitude": 1, 
                "display_order": 1
            }, 
            {
                "id": 2, 
                "name": "Sandwich", 
                "full_name": "SnowGlobe", 
                "latitude": 2, 
                "longitude": 4, 
                "display_order": 7
            }
        ]
        return {
            "collection": listaProvincias,
            "pagination": {
            "limit": pageSize,
            "offset": reqPage,
            "nextPage": reqPage + 1, //poner el http
            "total": "1" //no se que es esto
            }
        }
    }
    getProvinciaPorId(pageSize, reqPage, idP){
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
    updateProvincia(provinciaUpdates){
        return provinciaUpdates //aca iria una query que modifique la provincia pero como no hay bd no podemos entonces solo devolvemos lo mismo. 
    }
}