const express = require('express');
const router = express.Router();
const { categoriaController } = require('../controllers');

//Crear categoria
router.post('/', categoriaController.createCategoria);

//Editar categoria
router.put('/', categoriaController.updateCategoria);

//Eliminar categoria
router.delete('/', categoriaController.deleteCategoria);

//Obtener categoria
router.get('/', categoriaController.getCategoria);

module.exports = router;
