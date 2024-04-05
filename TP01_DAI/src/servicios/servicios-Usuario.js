import pg from "pg";

export class UserService
{

    getUser(username, password)
    {
        const query = "select * from users where users.username = $(username) and users.password = $(password)" //fetch user from db
        const DBresponse = query.execute(); //DRAGON BALL RESPONSE WOOOOOOOOOOOO
        if(DBresponse.username == username && DBresponse.password == password)
        {
            return //*insertar token* COMO MIERDA GENERO UN TOKEN PARA QUE EL USUARIO SE LOGUEE??????????????
        }
    }

    writeUser(first_name, last_name, username, password)
    {

    }

}