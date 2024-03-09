const express = require('express');
const router = express.Router();
const { autorController } = require('../controllers');

//Crear autor
router.post('/', autorController.createAutor);

//Editar autor
router.put('/', autorController.updateAutor);

//Eliminar autor
router.delete('/', autorController.deleteAutor);

//Obtener autor
router.get('/', autorController.getAutor);

module.exports = router;