const startMessage = `
Привет! Я бот лиги тенниса.

Для того чтобы меня вызвать напиши /start

Чтобы узнать список актуальных турниров напиши /tournaments
`;

module.exports = {
  startMessage,
  tournament: {
    pickQuestion: 'Выбери пожалуйста турнир, в котором ты хочешь принять участие',
    pickQuestionOptions: [
      'Challenger 2012',
      'Masters 2077',
    ]
  }
}