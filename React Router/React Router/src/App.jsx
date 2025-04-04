import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-green-600'></h1>
      <h2 className='text-red-500'>Hello jiii</h2>
    </>
  )
}

export default App
