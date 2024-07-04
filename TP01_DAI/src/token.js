import jwt from 'jsonwebtoken';

const payload = {
    id: userId, //le pasamos los datos
    username: nombreUsuario
}

const secretKey = "djfjsflj"

const token = jwt.sign(payload, secretKey)
console.log(token)