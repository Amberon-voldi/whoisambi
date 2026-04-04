import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import data from '../data/portfolio.json'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [hidden, setHidden] = useState(false)
  const [deckMode, setDeckMode] = useState(false)
  const lastScrollRef = useRef(0)
  const rafRef = useRef(null)

  const handleSectionClick = (event, href, closeMobile = false) => {
    if (closeMobile) {
      setMobileOpen(false)
    }

    if (!deckMode) {
      return
    }

    event.preventDefault()
    const sectionId = href.slice(1)
    setActiveSection(sectionId)
    setHidden(false)
    setScrolled(true)
    window.dispatchEvent(new CustomEvent('deckJumpTo', { detail: sectionId }))
  }

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
    const onDeckSectionChange = (event) => {
      if (typeof event?.detail === 'string') {
        setActiveSection(event.detail)
        setHidden(false)
        setScrolled(true)
      }
    }

    window.addEventListener('deckSectionChange', onDeckSectionChange)
    return () => window.removeEventListener('deckSectionChange', onDeckSectionChange)
  }, [])

  useEffect(() => {
    const sectionIds = data.navLinks.map((l) => l.href.slice(1))

    const updateNavState = () => {
      if (deckMode) {
        setHidden(false)
        setScrolled(true)
        rafRef.current = null
        return
      }

      const current = window.scrollY
      const delta = Math.abs(current - lastScrollRef.current)
      const isScrollingDown = current > lastScrollRef.current

      setScrolled(current > 50)

      // Keep navbar visible near the top and only hide on meaningful downward scroll.
      if (current < 120) {
        setHidden(false)
      } else if (delta > 8) {
        setHidden(isScrollingDown && current > 260)
      }

      const markerTop = window.innerHeight * 0.28
      const markerBottom = window.innerHeight * 0.18
      let nextActive = sectionIds[0] || 'home'

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue

        const rect = el.getBoundingClientRect()

        if (rect.top <= markerTop && rect.bottom >= markerBottom) {
          nextActive = id
          break
        }

        if (rect.top <= markerTop) {
          nextActive = id
        }
      }

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive))
      lastScrollRef.current = current
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current !== null) {
        return
      }

      rafRef.current = window.requestAnimationFrame(updateNavState)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateNavState()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [deckMode])

  useEffect(() => {
    if (mobileOpen) {
      setHidden(false)
    }
  }, [mobileOpen])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-2 sm:py-3' : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          onClick={(event) => handleSectionClick(event, '#home')}
          className="text-lg sm:text-xl font-bold tracking-tight text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-gradient-bright">{data.personal.alias || data.personal.name.split(' ')[0]}</span>
          <span className="text-silver-500">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {data.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleSectionClick(event, link.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                activeSection === link.href.slice(1)
                  ? 'text-white'
                  : 'text-silver-500 hover:text-silver-200'
              }`}
            >
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/[0.06] rounded-full border border-white/[0.1]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
          <Link
            to="/craft-avatar"
            className="ml-2 px-4 py-2 text-sm font-medium rounded-full bg-white/[0.08] border border-white/[0.1] text-silver-300 hover:text-white hover:bg-white/[0.12] transition-all"
          >
            ✨ Craft Avatar
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02]"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-silver-300 origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-4 h-[1.5px] bg-silver-300"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-silver-300 origin-center"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mt-2 mx-3 sm:mx-4 rounded-2xl overflow-hidden"
          >
            <div className="py-3 px-4 sm:px-6 flex flex-col gap-1">
              {data.navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleSectionClick(event, link.href, true)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-white bg-white/[0.06]'
                      : 'text-silver-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: data.navLinks.length * 0.06 }}
              >
                <Link
                  to="/craft-avatar"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 rounded-xl text-sm font-medium text-silver-300 hover:text-white bg-white/[0.04] border border-white/[0.06] mt-2"
                >
                  ✨ Craft Avatar
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
