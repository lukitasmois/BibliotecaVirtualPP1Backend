const conn = require("./conn");
const DATABASE = "practiasdb";
const USUARIOS = "usuarios";
const bcrypt = require("bcrypt");

async function aniadirUsuario(usuario) {
  try {
    console.log(usuario);
    verificarUsuario(usuario);

    // Si el rol es "ESTUDIANTE", inicializar el campo cantLibrosReservados
    if (usuario.rol === 'ESTUDIANTE') {
      usuario.cantLibrosReservados = 0;
    }

    // Si el rol es "BIBLIOTECARIO", eliminar el campo cantLibrosReservados si existe
    if (usuario.rol === 'BIBLIOTECARIO' && usuario.cantLibrosReservados) {
      delete usuario.cantLibrosReservados;
    }

    // Encriptar la contraseña
    usuario.password = await bcrypt.hash(usuario.password, 8);

    const connection = await conn.getConnection();
    const result = await connection
      .db(DATABASE)
      .collection(USUARIOS)
      .insertOne(usuario);

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

function verificarUsuario(usuario) {
  // Validar que el usuario tenga los campos obligatorios
  if (!usuario.dni || !usuario.fullName || !usuario.userName || !usuario.email || !usuario.password || !usuario.rol) {
    throw new Error('Faltan campos obligatorios para crear el usuario.');
  }

  // Validar que el rol del usuario sea válido
  if (usuario.rol !== 'BIBLIOTECARIO' && usuario.rol !== 'ESTUDIANTE') {
    throw new Error('El rol del usuario debe ser "BIBLIOTECARIO" o "ESTUDIANTE".');
  }

  return true;
}

  module.exports = {aniadirUsuario}