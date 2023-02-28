export default function Config ({
  setBpm, setBpc, setChangeOneCard, setCardToChangeId,
  setMode, setTimeOfAddBeat, setTimeOfChange, setStart, mode, bpm, bpc,
  changeOneCard, cardToChangeId
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    if (e.target.id === 'bpm') {
      setBpm(e.target.value)
    } else if (e.target.id === 'bpc') {
      setBpc(e.target.value)
    } else if (e.target.id === 'changeType') {
      setChangeOneCard(e.target.checked)
    } else if (e.target.id === 'ctc') {
      setCardToChangeId(e.target.value)
    }
  }

  const handleMode = (e) => {
    const btn = e.target
    if (btn.textContent === 'Manual') {
      setMode('manual')
      setBpm('')
      setBpc('')
      setTimeOfAddBeat('')
      setTimeOfChange(0)
      setStart(false)
    } else if (btn.textContent === 'Automatic') {
      setMode('automatic')
    }
  }

  return (
    <div>
      {mode
        ? mode === 'automatic'
          ? <form onSubmit={handleSubmit} className='w-75'>
            <div className='mb-3 d-flex'>
              <div className='mt-3'>
                <label htmlFor='bpm' className='form-label'>Bpm</label>
                <input onChange={handleChange} value={bpm} type='number' className='form-control' id='bpm' placeholder='Bpm' />
              </div>
              <div className='ms-4 mt-3'>
                <label htmlFor='bpc' className='form-label'>Bpc</label>
                <input onChange={handleChange} value={bpc} type='number' className='form-control' id='bpc' placeholder='Beats for change' />
              </div>
              {changeOneCard
                ? <div className='ms-4 mt-3'>
                  <label htmlFor='ctc' className='form-label'>Card to change</label>
                  <input onChange={handleChange} value={cardToChangeId} type='number' className='form-control' id='ctc' placeholder='Number of card' />
                </div>
                : ''}
            </div>
          </form>
          : ''
        : ''}
      <div>
        <button className='btn btn-danger me-5 mt-4' onClick={handleMode}>Manual</button>
        <button className='btn btn-success mt-4' onClick={handleMode}>Automatic</button>
        <div className='mt-3'>
          <label className='form-check-label me-2' htmlFor='changeType'>Change only one card:</label>
          <input type='checkbox' className='form-check-input' onClick={handleChange} id='changeType' value={changeOneCard} />
        </div>
      </div>
    </div>
  )
}
