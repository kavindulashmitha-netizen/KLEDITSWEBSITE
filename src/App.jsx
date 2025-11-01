import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CVDesign from './pages/CVDesign'
import PostDesign from './pages/PostDesign'
import CoverDesign from './pages/CoverDesign'
import Contact from './pages/Contact'
import FAB from './components/FAB'
import ScrollToTop from './components/ScrollToTop'


export default function App(){
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/cv-design" element={<CVDesign />} />
              <Route path="/post-design" element={<PostDesign />} />
              <Route path="/cover-design" element={<CoverDesign />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FAB />
    </div>
  )
}

