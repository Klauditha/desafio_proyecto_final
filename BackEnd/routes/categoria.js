const express = require('express');
const router = express.Router();
const { categoriaController } = require('../controllers');

/*
Ruta: POST /api/categoria
Descripcion: Crea una nueva categoria
request: body: 
response: { estado : boolean , message : string , data : object categoria }
*/
router.post('/', categoriaController.createCategoria);

/*
Ruta: PUT /api/categoria
Descripcion: Modifica una categoria
request: body: { token : string, categoria : object }
response: { estado : boolean , message : string , data : object categoria }
*/
router.put('/', categoriaController.updateCategoria);

/*
Ruta: DELETE /api/categoria
Descripcion: Modifica una categoria
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object categoria }
*/
router.delete('/', categoriaController.deleteCategoria);

/*
Ruta: GET /api/categoria
Descripcion: Obtiene un categoria por id
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object categoria }
*/
router.get('/', categoriaController.getCategoria);

module.exports = router;
