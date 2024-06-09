const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "tp-final";
const LIBROS = "libros";

async function listarLibros(){
    //conecto con la base de datos desde el archivo conn.js
    const client = await conn.getConnection();
    const libros = client.db(DATABASE).collection(LIBROS).find({}).toArray();
}