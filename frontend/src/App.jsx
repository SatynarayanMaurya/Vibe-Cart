import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <div >
      <Routes>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
    </div>
  )
}

export default App
