import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home    from './pages/Home'
import Predict from './pages/Predict'
import About   from './pages/About'

/**
 * App — BrowserRouter is provided by main.jsx, so useLocation() is valid here.
 */
export default function App() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<Home />}    />
          <Route path="/predict" element={<Predict />} />
          <Route path="/about"   element={<About />}   />
          <Route path="*"        element={<Home />}    />
        </Routes>
      </AnimatePresence>
    </>
  )
}
