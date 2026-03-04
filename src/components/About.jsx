import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import data from '../data/portfolio.json'
import PixelAvatar from './PixelAvatar'

function RevealText({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const alias = data.personal.alias || data.personal.name.split(' ')[0]

  return (
    <section id="about" className="relative py-24 md:py-36 px-4 sm:px-6 overflow-hidden">
      {/* Large background text */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <span className="text-[20vw] font-black text-white/[0.015] tracking-tighter leading-none">
          {alias}
        </span>
      </motion.div>

      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-white/10" />

      <div ref={sectionRef} className="relative max-w-5xl mx-auto">
        <RevealText>
          <p className="text-silver-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">About</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient-bright mb-12 md:mb-16 tracking-tight">
            Who is {alias}?
          </h2>
        </RevealText>

        <div className="grid md:grid-cols-5 gap-10 md:gap-20 items-start">
          {/* Left: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative group flex flex-col items-center gap-4">
              {/* Glow behind avatar */}
              <div className="absolute inset-0 bg-[rgba(160,255,238,0.02)] rounded-3xl blur-2xl scale-110 group-hover:bg-[rgba(160,255,238,0.05)] transition-colors duration-700" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-3xl glass border border-white/[0.08] flex items-center justify-center overflow-hidden shine group-hover:border-white/[0.15] transition-colors duration-500 p-3 sm:p-4">
                <PixelAvatar size={150} />
              </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-2 left-1/2 w-1.5 h-1.5 bg-white/20 rounded-full" />
              </div>
              <div className="absolute inset-0" style={{ animation: 'spin 25s linear infinite reverse' }}>
                <div className="absolute -bottom-1 left-1/3 w-1 h-1 bg-white/10 rounded-full" />
              </div>

              <Link
                to="/craft-avatar"
                className="relative z-10 px-4 py-2 text-xs sm:text-sm font-mono tracking-wide glass rounded-lg border border-white/[0.08] text-silver-300 hover:text-white hover:border-white/[0.18] transition-colors"
              >
                ✨ Craft Your Avatar
              </Link>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <div className="md:col-span-3 space-y-7 sm:space-y-8 text-center md:text-left">
            <RevealText delay={0.3}>
              <p className="text-silver-300 text-base sm:text-lg md:text-xl leading-relaxed">
                {data.personal.bio}
              </p>
            </RevealText>

            <RevealText delay={0.5}>
              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 glass rounded-full text-sm text-silver-300 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  📍 {data.personal.location}
                </span>
                <span className="px-4 py-2 glass rounded-full text-sm text-silver-300 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  💻 {data.personal.role}
                </span>
                <span className="px-4 py-2 glass rounded-full text-sm text-silver-300 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  👤 {data.personal.name}
                </span>
              </div>
            </RevealText>

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <RevealText delay={0.7}>
                <h3 className="text-white font-medium text-sm uppercase tracking-[0.15em] mb-5">Experience</h3>
                <div className="space-y-5">
                  {data.experience.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.15 }}
                      className="group relative pl-5 sm:pl-6 border-l border-white/[0.08] hover:border-white/[0.2] transition-colors duration-500 text-left"
                    >
                      <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-[4.5px] bg-white/15 rounded-full group-hover:bg-white/40 transition-colors duration-500" />
                      <p className="text-white font-medium text-sm">{exp.role}</p>
                      <p className="text-silver-500 text-sm">{exp.company} · {exp.period}</p>
                      {exp.description && (
                        <p className="text-silver-500 text-xs mt-1 leading-relaxed">{exp.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </RevealText>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
