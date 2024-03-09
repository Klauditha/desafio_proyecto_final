const createUsuario = (req, res, next) => {
  try {
    res.status(200).send('Usuario creado');
  } catch (error) {
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
