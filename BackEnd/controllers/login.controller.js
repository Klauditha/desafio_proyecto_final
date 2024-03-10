const jwt = require('jsonwebtoken');
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const token = await createPayload(username);
    console.log(token);
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

const createPayload = async(username) => {
  const payload = {
    username: username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
  return token;
};

module.exports = {
  loginUser,
};
