var express = require('express');
var router = express.Router();


router.get('/', async function(req, res, next) {
  try {
    const libros = await libros.listarLibros();
    res.json(libros);
  } catch {
    console.error(error);
    res.status(500).send("Error al obtener libros");
  }
});

module.exports = router;
