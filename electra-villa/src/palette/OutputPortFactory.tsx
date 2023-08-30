import { useState } from 'react'
import { Sidebar as SidebarStyle } from './Sidebar.css'
import InputPortFactory from './palette/InputPortFactory'
import OutputPortFactory from './palette/OutputPortFactory'

function Sidebar() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={SidebarStyle}>
        <InputPortFactory />
        <OutputPortFactory />
      </div>
    </>
  )
}

export default Sidebar
