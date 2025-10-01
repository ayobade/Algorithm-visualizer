import React from 'react' 
import LandingPage from './pages/landingpage'
import SearchVisualizer from './pages/SearchVisualizer'
import { Routes, Route } from 'react-router-dom'



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/visualizer" element={<SearchVisualizer />} />
    </Routes>
  )
}

export default App