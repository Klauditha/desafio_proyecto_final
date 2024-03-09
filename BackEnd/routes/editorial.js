const express = require('express');
const router = express.Router();
const { editorialController } = require('../controllers');

//Crear editorial
router.post('/', editorialController.createEditorial);

//Editar editorial
router.put('/', editorialController.updateEditorial);

//Eliminar editorial
router.delete('/', editorialController.deleteEditorial);

//Obtener editorial
router.get('/', editorialController.getEditorial);

module.exports = router;