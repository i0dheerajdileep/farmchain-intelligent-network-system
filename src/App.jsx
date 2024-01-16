import React from 'react'
import Dashboard from './pages/Dashboard'
import { Route,Routes } from 'react-router-dom'
import Landing from './pages/Landing'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App