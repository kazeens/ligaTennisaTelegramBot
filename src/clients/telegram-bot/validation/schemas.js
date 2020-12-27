
const joi = require('joi');

const signUpRegex = /[А-Я][а-я]/;

const signUp = joi.object().keys({
  firstName: joi.string().max(30).required(),
  lastName: joi.string().max(30).required(),
});

module.exports = {
  signUp,
};

