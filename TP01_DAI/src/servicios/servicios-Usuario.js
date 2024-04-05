// import pg from "pg";
//mjs
export class UserService
{

    getUser(username, password)
    {
        const query = "select * from users where users.username = $(username) and users.password = $(password)"; //fetch user from db
        const DBresponse = query.execute(); //DRAGON BALL RESPONSE WOOOOOOOOOOOO
        if(DBresponse.username == username && DBresponse.password == password)
        {
            return //*insertar token* COMO MIERDA GENERO UN TOKEN PARA QUE EL USUARIO SE LOGUEE??????????????
        }
        else
        {
            return null;
        }
    }

    writeUser(first_name, last_name, username, password)
    {
        const fetchQuery = "select * from users where users.username = $(username)";
        const DBuserExists = fetchQuery.execute();
        if(DBuserExists.username == username)
        {
            return "Dos cuentas no pueden tener el mismo usuario";
        }
        else
        {
            const writeQuery = "insert into users (first_name, last_name, username, password) values ($(first_name), $(last_name), $(username), $(password))";
        }
    }

}