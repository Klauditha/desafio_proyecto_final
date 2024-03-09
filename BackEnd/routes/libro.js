const express = require('express');
const router = express.Router();
const { libroController } = require('../controllers');

/*
Ruta: POST /api/libro
Descripcion: Crea un nuevo libro
request: body: 
response: { estado : boolean , message : string , data : object libro }
*/
router.post('/', libroController.createLibro);

/*
Ruta: PUT /api/libro
Descripcion: Modifica un libro
request: body: { token : string, libro : object }
response: { estado : boolean , message : string , data : object libro }
*/
router.put('/', libroController.updateLibro);

/*
Ruta: DELETE /api/libro
Descripcion: Modifica un libro
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object libro }
*/
router.delete('/', libroController.deleteLibro);

/*
Ruta: GET /api/libro
Descripcion: Obtiene un libro por id
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object libro }
*/
router.get('/', libroController.getLibro);

module.exports = router;