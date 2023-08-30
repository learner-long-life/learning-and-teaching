import { useState } from 'react'
import "./PaletteFactory.css"

function InputPortFactory() {
  const [count, setCount] = useState(0)

  return (
    <>
      <svg width="200" height="200">
        <path d="M 0 0 H 90 L 100 10 V 90 L 90 100 H 0 Z" fill="none" strokeWidth="2px" stroke="black" />
        <path d="M 100 45 H 150 V 55 H 100 Z" fill="none" strokeWidth="2px" stroke="black" />
        <circle cx="150" cy="50" r="10" fill="gray" strokeWidth="2px" stroke="black" />
      </svg>
    </>
  )
}

export default InputPortFactory
