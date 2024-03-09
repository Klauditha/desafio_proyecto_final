const express = require('express');
const router = express.Router();
const { autorController } = require('../controllers');

/*
Ruta: POST /api/autor
Descripcion: Crea un nuevo autor
request: body: 
response: { estado : boolean , message : string , data : object autor }
*/
router.post('/', autorController.createAutor);

/*
Ruta: PUT /api/autor
Descripcion: Modifica un autor
request: body: { token : string, autor : object }
response: { estado : boolean , message : string , data : object autor }
*/
router.put('/', autorController.updateAutor);

/*
Ruta: DELETE /api/autor
Descripcion: Modifica un autor
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object autor }
*/
router.delete('/', autorController.deleteAutor);

/*
Ruta: GET /api/autor
Descripcion: Obtiene un autor por id
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object autor }
*/
router.get('/', autorController.getAutor);

module.exports = router;