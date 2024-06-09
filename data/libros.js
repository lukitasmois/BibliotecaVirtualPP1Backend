const conn = require("./conn");
const DATABASE = "practiasdb";
const LIBROS = "libros";

async function listarLibros(){
    //conecto con la base de datos desde el archivo conn.js
    const client = await conn.getConnection();
    const libros = client.db(DATABASE).collection(LIBROS).find({}).toArray();
    return libros;
}

async function buscarLibro(titulo, autor, genero){
    const client = await conn.getConnection();
    
    const query = {};

    if(titulo){
        query.nombre = { $regex: new RegExp(titulo, 'i') }
    }
    if (autor) {
        query.autor = { $regex: new RegExp(autor, 'i') }
    }
    if (genero) {
        query.genero = { $regex: new RegExp(genero, 'i') }
    }

    const libros = client.db(DATABASE).collection(LIBROS).find(query).toArray(); 
    return libros;
}

module.exports = {listarLibros, buscarLibro};