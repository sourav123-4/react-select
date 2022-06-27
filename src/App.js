import React from 'react'
import Reactselect from './React-select'

function App() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (
    <div>
      <Reactselect
        options={options}
        isSearchable
        isMulti
      />
    </div>
  )
}

export default App