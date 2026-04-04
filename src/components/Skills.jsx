import { useMemo, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import data from '../data/portfolio.json'

const iconMap = {
  layout: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25zm4.5.75v12m4.5-12v12m4.5-12v12" />
    </svg>
  ),
  server: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.75h13.5m-13.5 5.25h13.5m-13.5 5.25h13.5M7.5 6.75v10.5m9-10.5v10.5" />
    </svg>
  ),
  database: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.375C3.75 4.097 7.444 2.25 12 2.25s8.25 1.847 8.25 4.125S16.556 10.5 12 10.5 3.75 8.653 3.75 6.375zM3.75 12c0 2.278 3.694 4.125 8.25 4.125s8.25-1.847 8.25-4.125M3.75 17.625c0 2.278 3.694 4.125 8.25 4.125s8.25-1.847 8.25-4.125" />
    </svg>
  ),
  terminal: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25h15A2.25 2.25 0 0121.75 7.5v9A2.25 2.25 0 0119.5 18.75h-15A2.25 2.25 0 012.25 16.5v-9A2.25 2.25 0 014.5 5.25zm3 3l3 2.25-3 2.25m4.5 0h3.75" />
    </svg>
  ),
}

const accentPalette = [
  'rgba(160, 255, 238, 0.2)',
  'rgba(125, 190, 255, 0.2)',
  'rgba(255, 181, 125, 0.2)',
  'rgba(213, 164, 255, 0.2)',
  'rgba(174, 255, 169, 0.2)',
]

export default function Skills() {
  const headerRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const activeSkill = data.skills[activeIndex] || data.skills[0]
  const accent = accentPalette[activeIndex % accentPalette.length]
  const maxSkillCount = Math.max(...data.skills.map((s) => s.items.length), 1)

  const tickerItems = useMemo(() => {
    const merged = data.skills.flatMap((skill) => skill.items)
    const unique = [...new Set(merged)]
    return [...unique, ...unique]
  }, [])

  const signalBars = activeSkill.items.slice(0, 12).map((_, i) => 18 + ((i * 17 + activeSkill.items.length * 9) % 44))

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 md:py-36 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-white/10" />

      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-1/3 right-0 -translate-y-1/2 w-[420px] h-[500px] bg-white/[0.008] rounded-full blur-[120px]"
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 md:mb-14"
        >
          <p className="text-silver-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">Skills</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient-bright mb-3 tracking-tight">
            Build Matrix
          </h2>
          <p className="text-silver-500 text-sm sm:text-base max-w-2xl">
            Explore the stack as a live control room. Each lane reveals a different part of the way I architect, ship, and scale products.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] glass-strong border border-white/[0.1] p-6 sm:p-7">
              <motion.div
                key={activeSkill.category}
                initial={{ opacity: 0.25, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="pointer-events-none absolute -left-16 -top-20 w-72 h-72 rounded-full blur-[90px]"
                style={{ background: accent }}
              />

              <div className="relative z-10">
                <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-silver-500 mb-3">Active Track</p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.1] text-silver-200 flex items-center justify-center">
                    {iconMap[activeSkill.icon] || iconMap.terminal}
                  </div>
                  <div>
                    <h3 className="text-white text-lg sm:text-xl font-semibold">{activeSkill.category}</h3>
                    <p className="text-xs text-silver-500">{activeSkill.items.length} tools in this lane</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {activeSkill.items.slice(0, 8).map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="text-xs px-2.5 py-1.5 rounded-lg text-silver-300 border border-white/[0.08] bg-white/[0.04]"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-silver-500 mb-3">Execution Signal</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {signalBars.map((height, i) => (
                      <motion.span
                        key={i}
                        initial={{ height: 10, opacity: 0.5 }}
                        animate={{ height, opacity: 1 }}
                        transition={{ duration: 0.35, delay: i * 0.03 }}
                        className="flex-1 rounded-t bg-gradient-to-t from-white/[0.1] to-white/[0.45]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {data.skills.map((skill, i) => {
              const isActive = i === activeIndex
              return (
                <motion.button
                  key={skill.category}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.18 + i * 0.08 }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-400 ${
                    isActive
                      ? 'glass-strong border-white/[0.2] shadow-[0_0_40px_rgba(255,255,255,0.06)]'
                      : 'glass border-white/[0.08] hover:border-white/[0.16]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-white/[0.12] border-white/[0.2] text-white'
                          : 'bg-white/[0.04] border-white/[0.1] text-silver-400'
                      }`}>
                        {iconMap[skill.icon] || iconMap.terminal}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm sm:text-base">{skill.category}</h3>
                        <p className="text-[11px] sm:text-xs text-silver-500">{skill.items.length} technologies</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-silver-500">
                      Track {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {skill.items.slice(0, 6).map((item) => (
                      <span
                        key={item}
                        className="text-xs text-silver-300 px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.03]"
                      >
                        {item}
                      </span>
                    ))}
                    {skill.items.length > 6 && (
                      <span className="text-xs text-silver-500 px-2.5 py-1 rounded-md border border-white/[0.06]">
                        +{skill.items.length - 6}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${(skill.items.length / maxSkillCount) * 100}%` }}
                      transition={{ duration: 0.45 }}
                      className="h-full bg-gradient-to-r from-white/70 to-white/20"
                    />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="mt-9 rounded-xl border border-white/[0.08] glass overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
            className="flex w-max gap-2 py-3 px-2"
          >
            {tickerItems.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-silver-400 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
