const express = require('express');
const router = express.Router();
const { usuarioController } = require('../controllers');

/*
Ruta: POST /api/usuario
Descripcion: Crea un nuevo usuario
request: body: { primerNombre: string, segundoNombre: string, primerApellido: string, segundoApellido: string, correo: string, password: string }
response: { estado : boolean , message : string , data : object usuario }
*/
router.post('/', usuarioController.createUsuario);

/*
Ruta: PUT /api/usuario
Descripcion: Modifica un usuario
request: body: { token : string, usuario : object }
response: { estado : boolean , message : string , data : object usuario }
*/
router.put('/', usuarioController.updateUsuario);

/*
Ruta: DELETE /api/usuario
Descripcion: Modifica un usuario
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object usuario }
*/
router.delete('/', usuarioController.deleteUsuario);

/*
Ruta: GET /api/usuario
Descripcion: btiene un usuario por id
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object usuario }
*/
router.get('/', usuarioController.getUsuario);

module.exports = router;
