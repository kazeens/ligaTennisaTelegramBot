
const schemas = require('src/clients/telegram-bot/validation/schemas')

module.exports = {
  signUp,
};

function signUp(text) {
  const [lastName, firstName] = text.split(' ');
  const data = {
    lastName, 
    firstName,
  };

  return schemas.signUp.validate(data);
}