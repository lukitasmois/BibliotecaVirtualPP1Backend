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

router.get('/buscar', async function(req, res) {
  console.log("sad")
  try{
    const librosADevolver = await libros.buscarLibro(req.query.titulo, req.query.autor, req.query.genero);
    
    res.json(librosADevolver)
  } catch{
    console.error(error)
    res.status(500).send("Error al buscar libros")
  }

})

module.exports = router;
