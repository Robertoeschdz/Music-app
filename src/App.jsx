import { useEffect, useState } from 'react'
import './App.css'
import Config from './components/Config'
import ConfigCards from './components/ConfigCards'
import { changeFirstcard, changeSecondCard, excludeInBothCards, excludeInFirstCard, excludeInSecondCard } from './components/cardsHandler'

export default function App () {
  const [bpm, setBpm] = useState('')
  const [bpc, setBpc] = useState('')
  const [timeOfAddBeat, setTimeOfAddBeat] = useState('')
  const [timeOfChange, setTimeOfChange] = useState(0)
  const [start, setStart] = useState(false)
  const [card, setCard] = useState([])
  const [mode, setMode] = useState('')
  const [changeOneCard, setChangeOneCard] = useState(false)
  const [cardToChangeId, setCardToChangeId] = useState('')
  const [firstCardToExclude, setFirstCardToExclude] = useState([])
  const [secondCardToExclude, setSecondCardToExclude] = useState([])
  const cards = [
    { id: '4quaver', url: '/4quaver.png' },
    { id: 'crotchet', url: '/crotchet.png' },
    { id: 'minim', url: '/minim.png' },
    { id: 'quaver', url: '/quaver.png' },
    { id: 'semibreve', url: '/semibreve.png' },
    { id: 'tuplet', url: '/tuplet.png' }
  ]

  useEffect(() => {
    const shuffledArray = cards.sort(() => Math.random() - 0.5)
    const cardsArray = shuffledArray.slice(0, 2)
    setCard(cardsArray)
  }, [])

  useEffect(() => {
    if (bpm && bpc) {
      if (changeOneCard) {
        if (cardToChangeId) {
          const time = 60 / bpm
          const roundedTime = Math.round(time * 1000)

          setTimeOfAddBeat(roundedTime)
          setStart(true)
        } else {
          setStart(false)
          setTimeOfAddBeat('')
          setTimeOfChange(0)
        }
      } else {
        const time = 60 / bpm
        const roundedTime = Math.round(time * 1000)

        setTimeOfAddBeat(roundedTime)
        setStart(true)
      }
    } else {
      setStart(false)
      setTimeOfAddBeat('')
      setTimeOfChange(0)
    }
  }, [bpm, bpc, changeOneCard, cardToChangeId])

  useEffect(() => {
    if (start === true) {
      const interval = setInterval(() => {
        setTimeOfChange(prevTime => prevTime + 1)
      }, timeOfAddBeat)
      return () => clearInterval(interval)
    }
  }, [timeOfAddBeat])

  useEffect(() => {
    const number = parseInt(bpc)
    if (timeOfChange >= number) {
      setTimeOfChange(0)
      changeCard()
    }
  }, [timeOfChange])

  const changeCard = (id) => {
    if (mode === 'manual') {
      if (changeOneCard) {
        const int = parseInt(id)
        if (int === 0) {
          if (firstCardToExclude.length !== 0) {
            excludeInFirstCard(card, cards, firstCardToExclude, setCard)
          } else {
            changeFirstcard(card, cards, setCard)
          }
        } else if (int === 1) {
          if (secondCardToExclude.length !== 0) {
            excludeInSecondCard(card, cards, secondCardToExclude, setCard)
          } else {
            changeSecondCard(card, cards, setCard)
          }
        }
      } else {
        if (firstCardToExclude.length !== 0 || secondCardToExclude.length !== 0) {
          excludeInBothCards(cards, firstCardToExclude, secondCardToExclude, setCard)
        } else {
          const shuffledArray = cards.sort(() => Math.random() - 0.5)
          const cardsArray = shuffledArray.slice(0, 2)
          setCard(cardsArray)
        }
      }
    } else if (mode === 'automatic') {
      if (changeOneCard) {
        const int = parseInt(cardToChangeId)
        if (int === 0) {
          if (firstCardToExclude.length !== 0) {
            excludeInFirstCard(card, cards, firstCardToExclude, setCard)
          } else {
            changeFirstcard(card, cards, setCard)
          }
        } else if (int === 1) {
          if (secondCardToExclude.length !== 0) {
            excludeInSecondCard(card, cards, secondCardToExclude, setCard)
          } else {
            changeSecondCard(card, cards, setCard)
          }
        }
      } else {
        if (firstCardToExclude.length !== 0 || secondCardToExclude.length !== 0) {
          excludeInBothCards(cards, firstCardToExclude, secondCardToExclude, setCard)
        } else {
          const shuffledArray = cards.sort(() => Math.random() - 0.5)
          const cardsArray = shuffledArray.slice(0, 2)
          setCard(cardsArray)
        }
      }
    }
  }

  const handleClick = (e) => {
    if (mode === 'automatic') {
      console.log('automatico')
    } else if (mode === 'manual') {
      changeCard(e.target.id)
    }
  }

  return (
    <div className='bg-dark text-white'>
      <div className='container'>
        <Config setBpm={setBpm} setBpc={setBpc} setChangeOneCard={setChangeOneCard} setCardToChangeId={setCardToChangeId} setMode={setMode} setTimeOfAddBeat={setTimeOfAddBeat} setTimeOfChange={setTimeOfChange} setStart={setStart} mode={mode} bpm={bpm} bpc={bpc} changeOneCard={changeOneCard} cardToChangeId={cardToChangeId} />
        <div>Time: {timeOfChange}</div>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-5 col-12'>
            <div className='m-4 colorb p-3 d-flex justify-content-center align-items-center' onClick={handleClick} id={0}>
              <img src={card[0]?.url} className='img-fluid image' alt={card[0]?.id} id={0} />
            </div>
            <div id={0}>
              <ConfigCards cards={cards} setFirstCardToExclude={setFirstCardToExclude} firstCardToExclude={firstCardToExclude} setSecondCardToExclude={setSecondCardToExclude} secondCardToExclude={secondCardToExclude} />
            </div>
          </div>
          <div className='col-md-5 col-12'>
            <div className='m-4 colorb bg-primary p-3 d-flex justify-content-center  align-items-center' onClick={handleClick} id={1}>
              <img src={card[1]?.url} className='img-fluid image' alt={card[1]?.id} id={1} />
            </div>
            <div id={1}>
              <ConfigCards cards={cards} setFirstCardToExclude={setFirstCardToExclude} firstCardToExclude={firstCardToExclude} setSecondCardToExclude={setSecondCardToExclude} secondCardToExclude={secondCardToExclude} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
