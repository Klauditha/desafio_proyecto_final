const express = require('express');
const router = express.Router();
const { libroController } = require('../controllers');

//Crear editorial
router.post('/', libroController.createLibro);

//Editar editorial
router.put('/', libroController.updateLibro);

//Eliminar editorial
router.delete('/', libroController.deleteLibro);

//Obtener editorial
router.get('/', libroController.getLibro);

module.exports = router;