export default function ConfigCards ({ cards, setFirstCardToExclude, setSecondCardToExclude, firstCardToExclude, secondCardToExclude }) {
  const handleChange = (e) => {
    if (e.target.checked) {
      const parent = e.target.parentNode
      const grandParent = parent.parentNode
      const grandGrandParentId = parseInt(grandParent.parentNode.id)
      const id = e.target.id
      if (grandGrandParentId === 0) {
        setFirstCardToExclude(firstCardToExclude.concat(id))
      } else if (grandGrandParentId === 1) {
        setSecondCardToExclude(secondCardToExclude.concat(id))
      }
    } else {
      const parent = e.target.parentNode
      const grandParent = parent.parentNode
      const grandGrandParentId = parseInt(grandParent.parentNode.id)
      const id = e.target.id
      if (grandGrandParentId === 0) {
        const newArray = firstCardToExclude.filter((item) => item !== id)
        setFirstCardToExclude(newArray)
      } else if (grandGrandParentId === 1) {
        const newArray = secondCardToExclude.filter((item) => item !== id)
        setSecondCardToExclude(newArray)
      }
    }
  }

  return (
    <div className='row'>
      <p className='h5'>Symbol that you want to exclude:</p>
      {cards.map(card => (
        <div className='col-md-6 col-lg-4 col-5 d-flex justify-content-center' key={card.id}>
          <input type='checkbox' className='form-check-input me-2' id={card.id} onChange={handleChange} />
          <label className='form-check-label'>{card.id}</label>
        </div>
      ))}
    </div>
  )
}
