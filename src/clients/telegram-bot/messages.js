
module.exports = {
  startMessage: `
Привет! Я бот Лиги Тенниса.
Я помогаю игрокам лиги организовывать свое участие в матчах и не только.

Чтобы узнать список актуальных турниров напиши /tournaments

Если хочешь принимать участие в турнирах сейчас и в дальнейшем -  представься пожалуйста, воспользовавшись командой /signup
  `,
  tournament: {
    pickQuestion: 'Выбери пожалуйста турнир, в котором ты хочешь принять участие',
    pickQuestionOptions: [
      'Challenger 2012',
      'Masters 2077',
    ],
    recommendationToParticipate: `
Если хочешь принять участие, зарегистрируйся сначала с помощью команды /signup.
После снова введи команду /tournaments`
  },
  signUpMessage: 'Введи пожалуйста свою Фамилию и Имя (через пробел)',
  signUpErrorMessage: 'Ты уже ввел свои имя и фамилию. Чтобы их изменить, воспользуйся командой /signupEdit',
  invalidCommandErrorMessage: `
Извини, но я не знаю такую команду.
Попробуй выбрать что-нибудь из списка предложенных в поле ввода или воспользуйся командой /help.
  `,
}