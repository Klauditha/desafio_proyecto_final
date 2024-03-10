const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  let retorno = 'Se han producido los siguientes errores:\n';
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      retorno += '- ' + error.msg + '\n';
    });
    return res.status(500).json({
      message: retorno,
    });
  }
  next();
};

module.exports = {
  validarCampos,
};
