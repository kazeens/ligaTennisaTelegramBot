
function getTournamentNameAndNumber(text) {
  const words = text.trim().split(' ');
  const indexOfLastSymbol = words.length - 1;
  const number = words[indexOfLastSymbol];
  const name = words.slice(0, indexOfLastSymbol).join(' ');
  
  return { name, number };
}

module.exports = {
  getTournamentNameAndNumber,
}