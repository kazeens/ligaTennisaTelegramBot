
module.exports = {
  setIfExist,
}

function setIfExist(obj, property, value) {
  if (value !== undefined && property) {
      // eslint-disable-next-line no-param-reassign
      obj[property] = value;
  }
}
