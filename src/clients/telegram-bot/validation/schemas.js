
const joi = require('joi');

const signUp = joi.object().keys({
  firstName: joi.string().max(30),
  lastName: joi.string().max(30),
});

module.exports = {
  signUp,
};

