import React from 'react' 
import LandingPage from './pages/Landingpage'
import SearchVisualizer from './pages/SearchVisualizer'
import Visualizer from './pages/visualizer'
import { Routes, Route } from 'react-router-dom'



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/SearchVisualizer" element={<SearchVisualizer />} />
      <Route path="/visualizer" element={<Visualizer />} />
    </Routes>
  )
}

export default App