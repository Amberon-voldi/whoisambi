import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import data from '../data/portfolio.json'
import PixelAvatar from './PixelAvatar'

function useTypedText(texts, typingSpeed = 70, deletingSpeed = 35, pauseTime = 2200) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    let timeout
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      }, typingSpeed)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      }, deletingSpeed)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((textIndex + 1) % texts.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime])

  return displayed
}

function Particles() {
  const particles = useRef(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }))
  ).current

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/[0.07]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0, 0.8, 0.4, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function FloatingCode({ delay, x, y }) {
  const snippets = ['<div>', 'const', '() =>', '{...}', '</>', '[]', '===', 'async', 'npm', 'git']
  const snippet = snippets[Math.floor(Math.random() * snippets.length)]
  return (
    <motion.span
      className="absolute font-mono text-[10px] text-white/[0.06] select-none pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: [0, 0.5, 0], y: -40 }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: 'linear' }}
    >
      {snippet}
    </motion.span>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Multi-depth parallax layers
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.88])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Mouse-tracked 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 30 })
  // Deeper tilt for avatar
  const avatarRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 80, damping: 25 })
  const avatarRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 80, damping: 25 })
  // Subtle shift for background grid
  const gridShiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), { stiffness: 60, damping: 40 })
  const gridShiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 60, damping: 40 })

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  const typedText = useTypedText(data.personal.taglines)
  const alias = data.personal.alias || data.personal.name.split(' ')[0]

  // Floating code snippets positions
  const codePositions = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      delay: Math.random() * 6,
    }))
  ).current

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      {/* === BACKGROUND LAYER (slowest parallax) === */}
      <motion.div style={{ y: gridY, x: gridShiftX }} className="absolute inset-0">
        {/* Perspective grid floor */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-40%)',
            transformOrigin: 'center top',
          }}
        />
        {/* Standard grid overlay */}
        <motion.div
          style={{ y: gridShiftY }}
          className="absolute inset-0 opacity-[0.02]"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
            }}
          />
        </motion.div>
      </motion.div>

      {/* === MID LAYER (ambient glow + orbs) === */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_55%)]" />
        <div className="absolute top-1/4 left-1/5 w-[600px] h-[600px] bg-white/[0.012] rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-[rgba(160,255,238,0.008)] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </motion.div>

      <Particles />

      {/* Floating code snippets */}
      {codePositions.map(cp => (
        <FloatingCode key={cp.id} delay={cp.delay} x={cp.x} y={cp.y} />
      ))}

      {/* === ORBITAL RINGS (deep parallax) === */}
      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
        {[400, 550, 700, 850].map((size, i) => (
          <motion.div
            key={size}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.3 + i * 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: size, height: size }}
          >
            <div
              className="w-full h-full rounded-full border border-white/[0.025]"
              style={{
                animation: `spin ${25 + i * 12}s linear infinite${i % 2 ? ' reverse' : ''}`,
                opacity: 0.5 - i * 0.1,
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/20 rounded-full" />
              {i < 2 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-white/10 rounded-full" />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* === MAIN 3D CONTENT (mouse-tracked tilt) === */}
      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 w-full max-w-6xl px-6"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Text content */}
          <div className="text-center lg:text-left flex-1 order-2 lg:order-1" style={{ transformStyle: 'preserve-3d' }}>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transform: 'translateZ(30px)' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/[0.08] mb-8"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-silver-400 text-xs font-mono tracking-wider">Available for work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transform: 'translateZ(50px)' }}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter mb-4 leading-[0.85] glow-text"
            >
              <span className="text-gradient-bright">{alias}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ transform: 'translateZ(20px)' }}
              className="h-8 mb-8"
            >
              <span className="text-lg md:text-xl text-silver-400 font-light tracking-wide">
                {typedText}
                <span className="inline-block w-[2px] h-5 bg-white/40 ml-1 animate-pulse" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              style={{ transform: 'translateZ(10px)' }}
              className="text-silver-500 text-base md:text-lg max-w-lg mb-12 leading-relaxed lg:mx-0 mx-auto"
            >
              {data.personal.role} based in {data.personal.location}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{ transform: 'translateZ(25px)' }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-3.5 bg-white text-dark-900 rounded-full font-semibold text-sm tracking-wide overflow-hidden"
              >
                <span className="relative z-10">View Work</span>
                <motion.div
                  className="absolute inset-0 bg-silver-200"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 text-silver-300 border border-white/[0.12] rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:text-white hover:border-white/30 hover:bg-white/[0.04]"
              >
                Let&apos;s Talk
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              style={{ transform: 'translateZ(15px)' }}
              className="flex gap-5 mt-12 justify-center lg:justify-start"
            >
              {data.social.github && (
                <motion.a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-full glass border border-white/[0.08] flex items-center justify-center text-silver-500 hover:text-white hover:border-white/20 transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </motion.a>
              )}
              {data.social.linkedin && (
                <motion.a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-full glass border border-white/[0.08] flex items-center justify-center text-silver-500 hover:text-white hover:border-white/20 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </motion.a>
              )}
              {data.social.instagram && (
                <motion.a
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-full glass border border-white/[0.08] flex items-center justify-center text-silver-500 hover:text-white hover:border-white/20 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Right: Pixel Avatar with 3D depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              y: avatarY,
              rotateX: avatarRotateX,
              rotateY: avatarRotateY,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(60px)',
            }}
            className="relative order-1 lg:order-2 flex-shrink-0"
          >
            {/* Platform / ground shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-4 bg-white/[0.03] rounded-full blur-xl" />

            {/* Glowing ring behind avatar */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border border-white/[0.04]"
              style={{ transform: 'translateZ(-20px)' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[390px] md:h-[390px] rounded-full border border-white/[0.02]"
              style={{ transform: 'translateZ(-40px)' }}
            />

            {/* The pixel avatar */}
            <div className="relative z-10">
              <PixelAvatar size={240} className="md:w-auto w-full" />
            </div>

            {/* Floating tech badges around avatar */}
            {['JS', 'TS', 'PY', '< />'].map((label, i) => (
              <motion.div
                key={label}
                animate={{
                  y: [0, -8, 0, 8, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4 + i,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute glass border border-white/[0.08] px-2 py-1 rounded-lg text-[10px] font-mono text-silver-400"
                style={{
                  top: `${[10, 80, 50, 20][i]}%`,
                  [i % 2 === 0 ? 'left' : 'right']: i < 2 ? '-20px' : '-30px',
                  transform: `translateZ(${30 + i * 10}px)`,
                }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-silver-500 font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
