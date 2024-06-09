var express = require('express');
var router = express.Router();
var libros = require('../data/libros');


router.get('/', async function(req, res, next) {
  try {
    const librosADevolver = await libros.listarLibros();
    res.json(librosADevolver);
  } catch {
    console.error(error);
    res.status(500).send("Error al obtener libros");
  }
});

module.exports = router;
