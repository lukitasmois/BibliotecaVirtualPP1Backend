const { ObjectId } = require("mongodb");
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
    console.log('Consulta construida:', titulo, autor, genero)
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

    ;
    
    const libros = client.db(DATABASE).collection(LIBROS).find(query).toArray(); 
    return libros;
}

async function cargarLibro(libro){
    try {
        await verificarLibro(libro);
        const connectiondb = await conn.getConnection();
        const result = await connectiondb
          .db(DATABASE)
          .collection(LIBROS)
          .insertOne(libro);
        return result;
      } catch (error) {
        throw new Error(error.message);
      }

}

async function verificarLibro(libro){
    if(!libro){
        throw new Error('No se recibió un libro');
    }
    else if(!libro.titulo || !libro.autor || !libro.genero || !libro.isbn){
        throw new Error('El libro recibido no tiene todos los datos necesarios');
    }
    const connectiondb = await conn.getConnection();
    const libroExistente = await connectiondb.db(DATABASE).collection(LIBROS).findOne({ isbn: libro.isbn });
    if (libroExistente) {
        console.log(libroExistente);
        throw new Error('El ISBN ya existe en la base de datos');
    }
    return true;
}


module.exports = {listarLibros, buscarLibro, cargarLibro};
