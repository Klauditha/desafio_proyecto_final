const boom = require('@hapi/boom');

const addRating = (req, res, next) => {
  try {
    const newRating = null;
    res.status(201).json({
      status: true,
      message: 'New book created',
      data: {
        rating: newRating,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  addRating,
};
