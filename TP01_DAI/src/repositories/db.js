
// export const DBConfig = {
//     host: "localhost", 
//     port: 3000,
//     user: "root", 
//     password: "root", 
//     database: "DAI-eventos"
// }


const { Client } = require('pg');

const dbConfig = {
    host: "localhost", 
    port: 3000,
    user: "root", 
    password: "root", 
    database: "DAI-eventos"
}

const client = new Client(dbConfig);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Conectado a PostgreSQL');
    } catch (error) {
        console.error('Error al conectar a PostgreSQL');
    }
}

export { connectToDatabase };
export {dbConfig, client};



















