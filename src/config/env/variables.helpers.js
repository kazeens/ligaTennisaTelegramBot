
module.exports.getEnvVariable = (varName, varType = 'string') => {
  let varValue = process.env[varName];
  let normalizedVarValue = varValue;

  if (varType === 'string') {
      if (varValue === '') {
          normalizedVarValue = undefined;
      }
  } else if (varType === 'boolean') {
      if (varValue === '') {
          normalizedVarValue = undefined;
      } else if (varValue === 'true') {
          normalizedVarValue = true;
      } else if (varValue === 'false') {
          normalizedVarValue = false;
      }
  } else if (varType === 'number') {
      if (!varValue) {
          normalizedVarValue = undefined;
      } else {
          normalizedVarValue = Number(varValue);
      }
  }

  return normalizedVarValue;
};
