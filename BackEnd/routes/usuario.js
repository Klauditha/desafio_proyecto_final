const express = require('express');
const router = express.Router();
const { usuarioController } = require('../controllers');

//Crear usuario
router.post('/', usuarioController.createUsuario);

//Editar usuario
router.put('/', usuarioController.updateUsuario);

//Eliminar usuario
router.delete('/', usuarioController.deleteUsuario);

//Obtener usuario
router.get('/', usuarioController.getUsuario);

module.exports = router;