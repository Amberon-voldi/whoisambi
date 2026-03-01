import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import data from '../data/portfolio.json'

export default function ProjectDetail({ projectId, onClose }) {
  const project = data.projects.find(p => p.id === projectId)
  const overlayRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  const projectIndex = data.projects.findIndex(p => p.id === projectId)

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto"
        onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark-900/95 backdrop-blur-xl"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full max-w-4xl mx-4 my-12 md:my-20"
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="fixed top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-silver-400 hover:text-white hover:border-white/20 transition-colors z-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Project number */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-silver-500 font-mono text-sm tracking-[0.3em]">
              PROJECT {String(projectIndex + 1).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-gradient mb-3"
          >
            {project.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-silver-400 text-lg md:text-xl mb-8"
          >
            {project.subtitle}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-12 origin-left"
          />

          {/* Two column layout */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Main description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="md:col-span-2"
            >
              <h3 className="text-white font-medium text-sm uppercase tracking-[0.15em] mb-4">Overview</h3>
              <p className="text-silver-300 text-base md:text-lg leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </motion.div>

            {/* Meta info sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* Year */}
              {project.year && (
                <div>
                  <h4 className="text-silver-500 font-mono text-xs uppercase tracking-[0.2em] mb-2">Year</h4>
                  <p className="text-white text-sm">{project.year}</p>
                </div>
              )}

              {/* Stack */}
              <div>
                <h4 className="text-silver-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs text-silver-300 bg-white/[0.04] rounded-lg border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-silver-400 hover:text-white transition-colors text-sm"
                  >
                    <span>Live Demo</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-silver-400 hover:text-white transition-colors text-sm"
                  >
                    <span>Source Code</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mb-16"
            >
              <h3 className="text-white font-medium text-sm uppercase tracking-[0.15em] mb-6">Key Features</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors shrink-0" />
                    <span className="text-silver-300 text-sm leading-relaxed">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project image area */}
          {project.image && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl overflow-hidden border border-white/[0.06] mb-16"
            >
              <img src={project.image} alt={project.title} className="w-full" />
            </motion.div>
          )}

          {/* Navigation between projects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-between pt-8 border-t border-white/[0.06]"
          >
            {projectIndex > 0 ? (
              <button
                onClick={() => {
                  const prev = data.projects[projectIndex - 1]
                  onClose()
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openProject', { detail: prev.id }))
                  }, 100)
                }}
                className="group flex items-center gap-3 text-silver-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M5 12l7 7M5 12l7-7" />
                </svg>
                <span className="text-sm">{data.projects[projectIndex - 1].title}</span>
              </button>
            ) : <div />}

            {projectIndex < data.projects.length - 1 ? (
              <button
                onClick={() => {
                  const next = data.projects[projectIndex + 1]
                  onClose()
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openProject', { detail: next.id }))
                  }, 100)
                }}
                className="group flex items-center gap-3 text-silver-500 hover:text-white transition-colors"
              >
                <span className="text-sm">{data.projects[projectIndex + 1].title}</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M19 12l-7-7M19 12l-7 7" />
                </svg>
              </button>
            ) : <div />}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
