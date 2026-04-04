import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import ProjectDetail from './components/ProjectDetail'
import SectionShuffleCard from './components/SectionShuffleCard'
import AvatarCrafter from './pages/AvatarCrafter'

const DECK_SECTION_META = [
  { id: 'home', tone: 'soft' },
  { id: 'about', tone: 'mint' },
  { id: 'skills', tone: 'sky' },
  { id: 'projects', tone: 'soft' },
  { id: 'contact', tone: 'amber' },
]

function Home() {
  const [activeProject, setActiveProject] = useState(null)
  const [deckMode, setDeckMode] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState(1)
  const activeCardRef = useRef(0)
  const lockRef = useRef(false)
  const lockTimerRef = useRef(null)
  const cardScrollRefs = useRef([])

  useEffect(() => {
    const handler = (e) => setActiveProject(e.detail)
    window.addEventListener('openProject', handler)
    return () => window.removeEventListener('openProject', handler)
  }, [])

  useEffect(() => {
    const desktopMq = window.matchMedia('(min-width: 1024px)')
    const reduceMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncDeckMode = () => {
      setDeckMode(desktopMq.matches && !reduceMotionMq.matches)
    }

    syncDeckMode()
    desktopMq.addEventListener('change', syncDeckMode)
    reduceMotionMq.addEventListener('change', syncDeckMode)

    return () => {
      desktopMq.removeEventListener('change', syncDeckMode)
      reduceMotionMq.removeEventListener('change', syncDeckMode)
    }
  }, [])

  useEffect(() => {
    activeCardRef.current = activeCard
    if (deckMode) {
      const currentId = DECK_SECTION_META[activeCard]?.id || 'home'
      window.dispatchEvent(new CustomEvent('deckSectionChange', { detail: currentId }))
    }
  }, [activeCard, deckMode])

  useEffect(() => {
    if (!deckMode) {
      document.body.style.removeProperty('overflow')
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [deckMode])

  useEffect(() => {
    if (!deckMode) {
      lockRef.current = false
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current)
        lockTimerRef.current = null
      }
      return
    }

    const maxIndex = DECK_SECTION_META.length - 1

    const isScrollable = (el, deltaY) => {
      if (!(el instanceof HTMLElement)) {
        return false
      }

      const maxScrollTop = el.scrollHeight - el.clientHeight
      if (maxScrollTop <= 1) {
        return false
      }

      if (deltaY > 0) {
        return el.scrollTop < maxScrollTop - 1
      }

      return el.scrollTop > 1
    }

    const clearLock = () => {
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current)
        lockTimerRef.current = null
      }
    }

    const goToCard = (nextIndex, direction) => {
      const clamped = Math.min(maxIndex, Math.max(0, nextIndex))
      if (clamped === activeCardRef.current) {
        return
      }

      clearLock()
      lockRef.current = true
      setTransitionDirection(direction)
      activeCardRef.current = clamped
      setActiveCard(clamped)
      window.dispatchEvent(new CustomEvent('deckSectionChange', { detail: DECK_SECTION_META[clamped].id }))

      const targetScroller = cardScrollRefs.current[clamped]
      if (targetScroller instanceof HTMLElement) {
        targetScroller.scrollTop = 0
      }

      lockTimerRef.current = window.setTimeout(() => {
        lockRef.current = false
        lockTimerRef.current = null
      }, 620)
    }

    const onWheel = (event) => {
      if (activeProject || Math.abs(event.deltaY) < 8) {
        return
      }

      const currentIndex = activeCardRef.current
      const activeScroller = cardScrollRefs.current[currentIndex]

      if (isScrollable(activeScroller, event.deltaY)) {
        event.preventDefault()
        activeScroller.scrollTop += event.deltaY
        return
      }

      if (lockRef.current) {
        event.preventDefault()
        return
      }

      event.preventDefault()
      const direction = event.deltaY > 0 ? 1 : -1
      goToCard(currentIndex + direction, direction)
    }

    const onKeyDown = (event) => {
      if (activeProject || lockRef.current) {
        return
      }

      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault()
        goToCard(activeCardRef.current + 1, 1)
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        goToCard(activeCardRef.current - 1, -1)
      }
    }

    const onDeckJump = (event) => {
      const targetId = event?.detail
      if (typeof targetId !== 'string') {
        return
      }

      const targetIndex = DECK_SECTION_META.findIndex((item) => item.id === targetId)
      if (targetIndex === -1 || targetIndex === activeCardRef.current) {
        return
      }

      const direction = targetIndex > activeCardRef.current ? 1 : -1
      goToCard(targetIndex, direction)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('deckJumpTo', onDeckJump)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('deckJumpTo', onDeckJump)
      clearLock()
      lockRef.current = false
    }
  }, [activeProject, deckMode])

  const deckSections = [
    { ...DECK_SECTION_META[0], content: <Hero /> },
    { ...DECK_SECTION_META[1], content: <About /> },
    { ...DECK_SECTION_META[2], content: <Skills /> },
    { ...DECK_SECTION_META[3], content: <Projects onProjectClick={setActiveProject} /> },
    { ...DECK_SECTION_META[4], content: <Contact /> },
  ]

  const getCardState = (index) => {
    const delta = index - activeCard
    const depth = Math.min(Math.abs(delta), 4)
    const directionFactor = transitionDirection > 0 ? 1 : -1

    if (delta === 0) {
      return {
        y: 0,
        scale: 1,
        opacity: 1,
        rotateX: 0,
        rotateZ: 0,
        filter: 'blur(0px)',
        zIndex: 90,
      }
    }

    if (delta > 0) {
      return {
        y: 118 + depth * 26,
        scale: Math.max(0.82, 0.94 - depth * 0.03),
        opacity: 0,
        rotateX: -2,
        rotateZ: directionFactor * 1.2,
        filter: 'blur(2.4px)',
        zIndex: 50 - depth,
      }
    }

    return {
      y: -168 - (depth - 1) * 26,
      scale: Math.max(0.8, 0.9 - (depth - 1) * 0.03),
      opacity: 0,
      rotateX: -8,
      rotateZ: -directionFactor * 1.4,
      filter: 'blur(2.4px)',
      zIndex: 20 - depth,
    }
  }

  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className={deckMode ? 'deck-main' : ''}>
        {deckMode ? (
          <div className="deck-stage">
            {deckSections.map((section, index) => {
              const cardState = getCardState(index)
              const isActive = index === activeCard

              return (
                <motion.div
                  key={section.id}
                  initial={false}
                  animate={cardState}
                  transition={{ duration: 0.65, ease: [0.22, 0.7, 0.2, 1] }}
                  style={{ zIndex: cardState.zIndex }}
                  className={`deck-card-layer ${isActive ? 'is-active' : ''}`}
                >
                  <SectionShuffleCard tone={section.tone}>
                    <div
                      ref={(el) => {
                        cardScrollRefs.current[index] = el
                      }}
                      className="deck-card-scroll"
                    >
                      {section.content}
                    </div>
                  </SectionShuffleCard>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects onProjectClick={setActiveProject} />
            <Contact />
          </>
        )}
      </main>
      {!deckMode && <Footer />}
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

