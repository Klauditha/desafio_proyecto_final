const UsuarioService = require('../services/usuario.services');
const { createUsuarioSchema } = require('../schemas/usuario.schema');

const service = new UsuarioService();

const createUsuario = async (req, res, next) => {
  try {
    const body = req.body;
    const nuevoUsuario = await service.create(body);

    res.status(201).json({
      usuario: nuevoUsuario,
      mensaje: 'Usuario creado',
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getUsuario = (req, res, next) => {
  try {
    res.status(200).send('Usuario obtenido');
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUsuario = (req, res, next) => {
  try {
    res.status(200).send('Usuario actualizado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUsuario = (req, res, next) => {
  try {
    res.status(200).send('Usuario eliminado');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUsuario,
  getUsuario,
  updateUsuario,
  deleteUsuario,
};
