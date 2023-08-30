import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canvas from './Canvas'
import Sidebar from './Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Canvas />
      <Sidebar />
    </>
  )
}

export default App
