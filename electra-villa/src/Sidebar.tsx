import { useState } from 'react'
import './Sidebar.css'
import InputPortFactory from './palette/InputPortFactory'

function Sidebar() {
  const [components, setComponents] = useState([])

  return (
    <>
      <div className="Sidebar">
        <InputPortFactory />
      </div>
    </>
  )
}

export default Sidebar
