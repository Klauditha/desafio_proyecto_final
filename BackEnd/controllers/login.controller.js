const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (
      ['claudia', 'esteban', 'orlando'].includes(username) &&
      password === 'password'
    ) {
      const token = await createPayload(username, '10m');
    
      res.status(200).json({
        status: true,
        message: 'User is logged in',
        data: { token: token },
      });
    }
    else{
      throw new boom.boomify(boom.unauthorized('Credentials are not valid'));
    }
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const createPayload = async (username, expiredIn) => {
  const payload = {
    username: username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiredIn,
  });
  return token;
};

module.exports = {
  loginUser,
};
