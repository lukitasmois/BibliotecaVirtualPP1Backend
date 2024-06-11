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

router.post("/aniadirLibro", async (req, res) => {
  try {    
    await libros.cargarLibro(req.body.libro);
    res.status(201).json("Libro agregado con éxito");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.post('/buscar', async function(req, res) {
   try {
    console.log(req.body.busqueda.titulo);

    const titulo = req.body.busqueda.titulo;
    const autor = req.body.busqueda.autor;
    const genero = req.body.busqueda.genero;

    const librosADevolver = await libros.buscarLibro(titulo, autor, genero);
    res.json(librosADevolver);
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).send("Error al buscar libros");
  }

})

module.exports = router;
