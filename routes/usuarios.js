var express = require('express');
var router = express.Router();
var usuarios = require('../data/usuarios.js');

router.post("/crearUsuario", async function (req, res) {
  try {
    const crearUsuario = req.body;
    const result = await usuarios.aniadirUsuario(crearUsuario);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

  

  module.exports = router;