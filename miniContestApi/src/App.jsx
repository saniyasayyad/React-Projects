
import './App.css'
import Profile from './components/Profile'; 
import Login from './components/Login'
import React, { useState } from 'react';
import UserContextProvider from './context/UserContextProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
     <h1>React with Chai awnt</h1>
     <Login/>
     <Profile/>
    </UserContextProvider>
  )
}

export default App
