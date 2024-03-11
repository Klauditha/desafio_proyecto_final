const jwt = require('jsonwebtoken');
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await createPayload(username, '10m');
    res.status(200).json({
      status: true,
      message: 'User logged in',
      data: { token: token },
    });
  } catch (error) {
    res.status(500).json({
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
