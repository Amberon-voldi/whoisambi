import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import data from '../data/portfolio.json'

const iconMap = {
  layout: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  ),
  server: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  ),
  database: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  terminal: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
}

function SkillCard({ category, icon, items, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 18
    const y = (e.clientY - rect.top - rect.height / 2) / 18
    setMousePos({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }) }}
      style={{
        transform: hovered
          ? `perspective(800px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
          : 'perspective(800px) rotateY(0deg) rotateX(0deg)',
        transition: 'transform 0.2s ease-out',
      }}
      className="group relative glass rounded-2xl p-5 sm:p-7 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 shine glow-box"
    >
      {/* Hover spotlight */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${((mousePos.x * 18) + 50)}% ${((mousePos.y * 18) + 50)}%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="w-9 h-9 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-silver-400 group-hover:text-white group-hover:border-white/[0.15] transition-all duration-500">
            {iconMap[icon] || iconMap.terminal}
          </div>
          <h3 className="text-white font-semibold text-base sm:text-lg">{category}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.12 + i * 0.04 + 0.3 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm text-silver-300 bg-white/[0.03] rounded-lg border border-white/[0.06] cursor-default transition-colors hover:text-white hover:border-white/[0.15]"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const headerRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 md:py-36 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-white/10" />

      {/* Background accent */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[500px] bg-white/[0.008] rounded-full blur-[100px]"
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-silver-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">Skills</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient-bright mb-12 md:mb-16 tracking-tight">
            What I Work With
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {data.skills.map((skill, i) => (
            <SkillCard
              key={skill.category}
              category={skill.category}
              icon={skill.icon}
              items={skill.items}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
