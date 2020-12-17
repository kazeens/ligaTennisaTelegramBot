
module.exports = {
  revertId,
};

function revertId(ret) {
  /* eslint-disable no-param-reassign */
  ret.id = ret._id;
  delete ret._id;
  /* eslint-enable no-param-reassign */

  return ret;
}

