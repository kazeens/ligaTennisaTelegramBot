
const joi = require('joi');

const signUpRegex = /[А-Я][а-я]/;

const signUp = joi.object().keys({
  firstName: joi.string().max(30),
  lastName: joi.string().max(30),
});

module.exports = {
  signUp,
};

