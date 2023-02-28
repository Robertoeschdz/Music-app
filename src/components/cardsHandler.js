export const changeFirstcard = (card, cards, setCard) => {
  const keepElement = card.slice(1, 2)
  const shuffledArray = cards.sort(() => Math.random() - 0.5)
  const newArray = [shuffledArray[1], keepElement[0]]
  setCard(newArray)
}

export const changeSecondCard = (card, cards, setCard) => {
  const keepElement = card.slice(0, 1)
  const shuffledArray = cards.sort(() => Math.random() - 0.5)
  const newArray = [keepElement[0], shuffledArray[1]]
  setCard(newArray)
}

export const excludeInFirstCard = (card, cards, firstCardToExclude, setCard) => {
  const keepElement = card.slice(1, 2)
  const includeCards = cards.filter(card => !firstCardToExclude.includes(card.id))
  const shuffledArray = includeCards.sort(() => Math.random() - 0.5)
  const newArray = [shuffledArray[0], keepElement[0]]
  setCard(newArray)
}

export const excludeInSecondCard = (card, cards, secondCardToExclude, setCard) => {
  const keepElement = card.slice(0, 1)
  const includeCards = cards.filter(card => !secondCardToExclude.includes(card.id))
  const shuffledArray = includeCards.sort(() => Math.random() - 0.5)
  const newArray = [keepElement[0], shuffledArray[0]]
  setCard(newArray)
}

export const excludeInBothCards = (cards, firstCardToExclude, secondCardToExclude, setCard) => {
  const firstCardItems = cards.filter(card => !firstCardToExclude.includes(card.id))
  const secondCardsItems = cards.filter(card => !secondCardToExclude.includes(card.id))
  const firstShuffledArray = firstCardItems.sort(() => Math.random() - 0.5)
  const secondShuffledArray = secondCardsItems.sort(() => Math.random() - 0.5)
  const cardsArray = [firstShuffledArray[0], secondShuffledArray[0]]
  setCard(cardsArray)
}
