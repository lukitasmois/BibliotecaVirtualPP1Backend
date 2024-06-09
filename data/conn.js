//llama al archivo .env para luego obtener la uri de la base de datos y conectarse a ella
require('dotenv').config();

//llama a la libreria mongodb para conectarse a la base de datos
const mongoclient = require('mongodb').MongoClient;

//crea una instancia de la base de datos con la uri obtenida del archivo .env
const uri = process.env.MONGODB;
const client = new mongoclient(uri);
let instance = null;

//funcion que se encarga de conectarse a la base de datos
async function getConnection(){
    //si la instancia es nula (o sea no hay ninguna conexion existente)se conecta a la base de datos
    if(instance == null){
        instance = await client.connect();
    }
    return instance;
}

module.exports = {getConnection};