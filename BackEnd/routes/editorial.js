const express = require('express');
const router = express.Router();
const { editorialController } = require('../controllers');

/*
Ruta: POST /api/editorial
Descripcion: Crea una nueva editorial
request: body: 
response: { estado : boolean , message : string , data : object editorial }
*/
router.post('/', editorialController.createEditorial);

/*
Ruta: PUT /api/editorial
Descripcion: Modifica una editorial
request: body: { token : string, editorial : object }
response: { estado : boolean , message : string , data : object editorial }
*/
router.put('/', editorialController.updateEditorial);

/*
Ruta: DELETE /api/editorial
Descripcion: Modifica una editorial
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object editorial }
*/
router.delete('/', editorialController.deleteEditorial);

/*
Ruta: GET /api/editorial
Descripcion: Obtiene una editorial por id
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object editorial }
*/
router.get('/', editorialController.getEditorial);

module.exports = router;