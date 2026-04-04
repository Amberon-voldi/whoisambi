import { useMemo, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import data from '../data/portfolio.json'

const cardThemes = [
  {
    glow: 'radial-gradient(circle at 18% 18%, rgba(124,255,204,0.26), transparent 62%)',
    border: 'hover:border-emerald-300/40',
    accent: 'text-emerald-200',
    cta: 'group-hover:text-emerald-200',
    minHeight: 'min-h-[320px]',
  },
  {
    glow: 'radial-gradient(circle at 82% 16%, rgba(112,208,255,0.26), transparent 62%)',
    border: 'hover:border-sky-300/40',
    accent: 'text-sky-200',
    cta: 'group-hover:text-sky-200',
    minHeight: 'min-h-[340px]',
  },
  {
    glow: 'radial-gradient(circle at 18% 82%, rgba(255,203,133,0.24), transparent 62%)',
    border: 'hover:border-amber-300/40',
    accent: 'text-amber-200',
    cta: 'group-hover:text-amber-200',
    minHeight: 'min-h-[300px]',
  },
  {
    glow: 'radial-gradient(circle at 74% 74%, rgba(199,162,255,0.24), transparent 62%)',
    border: 'hover:border-violet-300/40',
    accent: 'text-violet-200',
    cta: 'group-hover:text-violet-200',
    minHeight: 'min-h-[330px]',
  },
]

function ProjectCard({ project, index, isActive, onActivate, onOpen }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-90px' })
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const theme = cardThemes[index % cardThemes.length]
  const num = String(index + 1).padStart(2, '0')

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => onOpen(project.id)}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onMouseMove={handleMouseMove}
      className={`group mb-5 break-inside-avoid relative w-full text-left rounded-[1.4rem] overflow-hidden border border-white/[0.08] ${theme.border} ${theme.minHeight} transition-all duration-500`}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: theme.glow }} />

      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.16), transparent 65%)`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-35 [background-image:linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_50%,transparent_100%)] bg-[length:240%_100%] group-hover:animate-pulse" />

      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-42 transition-opacity duration-500"
        />
      ) : (
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 24 + index * 2, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 border border-white/[0.14] rounded-3xl"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 18 + index * 2, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 border border-white/[0.1] rounded-xl"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/45 via-dark-900/68 to-dark-900/92" />

      <div className="relative z-10 p-5 sm:p-6 flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] ${theme.accent}`}>
            Case {num}
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-silver-500">
            {project.year || 'Live'}
          </span>
        </div>

        <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-2">
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="text-silver-400 text-sm sm:text-base mb-3">
            {project.subtitle}
          </p>
        )}

        <p className="text-silver-400 text-xs sm:text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-2 mb-4">
            {project.highlights.slice(0, 2).map((highlight, i) => (
              <div key={`${project.id}-${i}`} className="flex items-start gap-2.5">
                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                <p className="text-[11px] sm:text-xs text-silver-300 leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 6).map((tag) => (
              <span
                key={`${project.id}-${tag}`}
                className="text-[10px] sm:text-xs text-silver-300 bg-white/[0.06] px-2.5 py-1 rounded-md border border-white/[0.1]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white transition-colors ${theme.cta}`}>
            Open Case Study
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {isActive && (
        <motion.div
          layoutId="projectActiveGlow"
          className="absolute inset-0 pointer-events-none border border-white/20 rounded-[1.4rem]"
        />
      )}
    </motion.button>
  )
}

export default function Projects({ onProjectClick }) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const parallaxLeft = useTransform(scrollYProgress, [0, 1], [70, -70])
  const parallaxRight = useTransform(scrollYProgress, [0, 1], [0, -35])
  const projects = data.projects || []
  const activeProject = projects[activeIndex] || projects[0]

  const signalTape = useMemo(() => {
    const words = projects.flatMap((project) => [project.title, ...project.tags.slice(0, 2)])
    return [...words, ...words]
  }, [projects])

  if (!projects.length) return null

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 md:py-36 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-white/10" />

      <motion.div
        style={{ y: parallaxLeft }}
        className="absolute -left-24 top-1/4 w-[540px] h-[540px] rounded-full bg-[rgba(120,220,255,0.08)] blur-[155px]"
      />
      <motion.div
        style={{ y: parallaxRight }}
        className="absolute -right-20 bottom-0 w-[440px] h-[440px] rounded-full bg-[rgba(255,190,120,0.08)] blur-[140px]"
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 sm:mb-10"
        >
          <p className="text-silver-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">Projects</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient-bright tracking-tight mb-3">
            Signal Gallery
          </h2>
          <p className="text-silver-500 text-sm sm:text-base max-w-2xl">
            Explore a cinematic mosaic of product worlds. Hover to spotlight, click to enter the full case study.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 rounded-full border border-white/[0.08] glass overflow-hidden"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="flex w-max gap-2 py-2 px-2"
          >
            {signalTape.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-silver-400 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mb-6 rounded-2xl glass-strong border border-white/[0.1] p-4 sm:p-5"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-silver-500 mb-1">Now Spotlighted</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-white font-semibold text-lg sm:text-xl">{activeProject.title}</p>
              <p className="text-silver-500 text-sm">{activeProject.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => onProjectClick && onProjectClick(activeProject.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.14] text-sm text-white hover:border-white/[0.3] transition-colors"
            >
              Open Spotlight
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        <div className="columns-1 md:columns-2 xl:columns-3 gap-5 [column-fill:_balance]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || project.title}
              project={project}
              index={index}
              isActive={index === activeIndex}
              onActivate={setActiveIndex}
              onOpen={(id) => onProjectClick && onProjectClick(id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
