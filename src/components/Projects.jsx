import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import data from '../data/portfolio.json'

function ProjectCard({ project, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 20
    const y = (e.clientY - rect.top - rect.height / 2) / 20
    setMousePos({ x, y })
  }

  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }) }}
      onClick={() => onClick(project.id)}
      style={{
        transform: hovered
          ? `perspective(800px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) scale(1.02)`
          : 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)',
        transition: 'transform 0.25s ease-out',
      }}
      className="group relative glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 cursor-pointer glow-box"
    >
      {/* Hover spotlight */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${((mousePos.x * 20) + 50)}% ${((mousePos.y * 20) + 50)}%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Project visual */}
      <div className="relative h-52 overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent flex items-center justify-center">
            {/* Abstract geometric placeholder */}
            <div className="relative w-24 h-24">
              <motion.div
                animate={hovered ? { rotate: 90, scale: 1.1 } : { rotate: 12, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 border border-white/[0.1] rounded-2xl"
              />
              <motion.div
                animate={hovered ? { rotate: -45, scale: 0.9 } : { rotate: -6, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-3 border border-white/[0.06] rounded-xl"
              />
              <motion.div
                animate={hovered ? { rotate: 180, scale: 1.2 } : { rotate: 30, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-6 border border-white/[0.04] rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Number overlay */}
        <div className="absolute top-5 left-5 z-10">
          <span className="text-white/20 font-mono text-sm tracking-wider group-hover:text-white/40 transition-colors duration-500">{num}</span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

        {/* Click prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <motion.span
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="px-5 py-2.5 glass-strong rounded-full text-white text-xs font-medium tracking-wider border border-white/20"
          >
            View Details →
          </motion.span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 z-10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-white font-semibold text-lg group-hover:text-gradient-bright transition-all duration-300">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-silver-500 text-xs font-mono tracking-wider mt-1">{project.subtitle}</p>
            )}
          </div>
          {project.year && (
            <span className="text-silver-500 text-xs font-mono shrink-0">{project.year}</span>
          )}
        </div>
        <p className="text-silver-500 text-sm leading-relaxed mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-silver-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06] group-hover:border-white/[0.1] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ onProjectClick }) {
  const headerRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} id="projects" className="relative py-36 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-white/10" />

      {/* Background accent */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-1/3 left-0 w-[400px] h-[600px] bg-white/[0.006] rounded-full blur-[120px]"
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16"
        >
          <div>
            <p className="text-silver-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">Projects</p>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient-bright tracking-tight">
              Selected Work
            </h2>
          </div>
          <p className="text-silver-500 text-sm max-w-xs">Click any project to explore it in detail</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map((project, i) => (
            <ProjectCard
              key={project.id || project.title}
              project={project}
              index={i}
              onClick={onProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
