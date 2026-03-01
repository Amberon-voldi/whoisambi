import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import ProjectDetail from './components/ProjectDetail'
import AvatarCrafter from './pages/AvatarCrafter'

function Home() {
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const handler = (e) => setActiveProject(e.detail)
    window.addEventListener('openProject', handler)
    return () => window.removeEventListener('openProject', handler)
  }, [])

  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onProjectClick={setActiveProject} />
        <Contact />
      </main>
      <Footer />
      {activeProject && (
        <ProjectDetail
          projectId={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}

function App() {
  return (
    <div className="font-sans antialiased text-silver-200 bg-dark-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/craft-avatar" element={<AvatarCrafter />} />
      </Routes>
    </div>
  )
}

export default App

