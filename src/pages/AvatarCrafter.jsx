import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ROWS, COLS,
  SKIN_TONES, HAIR_COLORS, EYE_COLORS, CLOTHING_COLORS,
  ACCESSORY_COLORS, BG_COLORS,
  HAIR_STYLES, EYE_STYLES, MOUTH_STYLES, CLOTHING_STYLES, ACCESSORIES,
  compositeAvatar, getColorMap, buildSvgMarkup,
  DEFAULT_CONFIG, randomConfig,
} from '../data/avatarParts'

// ─── TABS ────────────────────────────────────────────────────────────

const TABS = [
  { id: 'skin',    label: 'Skin',    icon: '🎨' },
  { id: 'hair',    label: 'Hair',    icon: '💇' },
  { id: 'eyes',    label: 'Eyes',    icon: '👁️' },
  { id: 'mouth',   label: 'Mouth',   icon: '👄' },
  { id: 'outfit',  label: 'Outfit',  icon: '👕' },
  { id: 'extras',  label: 'Extras',  icon: '✨' },
  { id: 'bg',      label: 'BG',      icon: '🖼️' },
]

// ─── MAIN COMPONENT ─────────────────────────────────────────────────

export default function AvatarCrafter() {
  const [config, setConfig] = useState({ ...DEFAULT_CONFIG })
  const [activeTab, setActiveTab] = useState('skin')
  const [showGrid, setShowGrid] = useState(false)
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const update = useCallback((key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }))
  }, [])

  const grid = useMemo(() => compositeAvatar(config), [config])
  const colorMap = useMemo(() => getColorMap(config), [config])
  const bgColor = useMemo(() => {
    const bg = BG_COLORS.find(b => b.id === config.bg)
    return bg?.color || null
  }, [config.bg])

  // ─── DOWNLOADS ───────────────────────────────────────────────────

  const downloadSvg = useCallback(() => {
    const svg = buildSvgMarkup(grid, colorMap, bgColor)
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pixel-avatar.svg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowDownloadMenu(false)
  }, [grid, colorMap, bgColor])

  const downloadPng = useCallback((size) => {
    const canvas = document.createElement('canvas')
    const px = size / COLS
    canvas.width = size
    canvas.height = Math.round(px * ROWS)
    const ctx = canvas.getContext('2d')

    // Disable smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false

    if (bgColor) {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const token = grid[r][c]
        if (token === 0) continue
        const color = colorMap[token]
        if (!color) continue
        ctx.fillStyle = color
        ctx.fillRect(c * px, r * px, px, px)
      }
    }

    canvas.toBlob(blob => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pixel-avatar-${size}px.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
    setShowDownloadMenu(false)
  }, [grid, colorMap, bgColor])

  const handleRandomize = useCallback(() => {
    setConfig(randomConfig())
  }, [])

  // Close download menu on outside click
  useEffect(() => {
    if (!showDownloadMenu) return
    const close = (e) => {
      if (!e.target.closest('[data-download-menu]')) {
        setShowDownloadMenu(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [showDownloadMenu])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // ─── RENDER ──────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-dark-900 text-silver-200 font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 text-silver-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xs sm:text-sm font-medium">Back</span>
          </Link>
          <h1 className="text-sm sm:text-lg font-bold whitespace-nowrap">
            <span className="text-gradient-bright">Craft</span>
            <span className="text-silver-500 hidden sm:inline"> Your Avatar</span>
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRandomize}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs sm:text-sm text-silver-300 hover:text-white hover:bg-white/[0.1] transition-all"
          >
            <span className="text-base">🎲</span>
            <span className="hidden sm:inline">Random</span>
          </motion.button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="pt-16 sm:pt-20 pb-8 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8">

            {/* LEFT: PREVIEW */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className={isMobile ? 'w-full' : 'sticky top-24'}>
                {/* Preview Card */}
                <motion.div
                  className="relative glass rounded-2xl p-4 sm:p-6 md:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Ambient glow */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                    style={{ background: colorMap[5] || '#a0ffee' }}
                  />

                  {/* SVG Preview */}
                  <div className="relative">
                    <svg
                      width={isMobile ? 260 : 320}
                      height={(isMobile ? 260 : 320) * (ROWS / COLS)}
                      viewBox={`0 0 ${COLS} ${ROWS}`}
                      className="relative z-10 mx-auto block"
                      style={{ imageRendering: 'pixelated' }}
                    >
                      <defs>
                        <filter id="eyeGlowPreview" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="0.6" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Background */}
                      {bgColor && (
                        <rect width={COLS} height={ROWS} fill={bgColor} />
                      )}

                      {/* Pixels */}
                      {grid.map((row, ry) =>
                        row.map((cell, cx) => {
                          if (cell === 0) return null
                          const color = colorMap[cell]
                          if (!color) return null
                          return (
                            <motion.rect
                              key={`${ry}-${cx}`}
                              x={cx}
                              y={ry}
                              width={1}
                              height={1}
                              fill={color}
                              filter={cell === 5 ? 'url(#eyeGlowPreview)' : undefined}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.2,
                                delay: (ry * COLS + cx) * 0.001,
                              }}
                            />
                          )
                        })
                      )}

                      {/* Grid overlay */}
                      {showGrid && (
                        <>
                          {Array.from({ length: COLS + 1 }).map((_, i) => (
                            <line
                              key={`v${i}`}
                              x1={i} y1={0} x2={i} y2={ROWS}
                              stroke="rgba(255,255,255,0.15)"
                              strokeWidth={0.05}
                            />
                          ))}
                          {Array.from({ length: ROWS + 1 }).map((_, i) => (
                            <line
                              key={`h${i}`}
                              x1={0} y1={i} x2={COLS} y2={i}
                              stroke="rgba(255,255,255,0.15)"
                              strokeWidth={0.05}
                            />
                          ))}
                        </>
                      )}
                    </svg>
                  </div>

                  {/* Preview controls */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button
                      onClick={() => setShowGrid(g => !g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                        showGrid
                          ? 'bg-white/[0.1] border-white/[0.15] text-white'
                          : 'bg-transparent border-white/[0.06] text-silver-500 hover:text-silver-300'
                      }`}
                    >
                      Grid {showGrid ? 'On' : 'Off'}
                    </button>
                  </div>
                </motion.div>

                {/* Download section */}
                <div className="mt-4 flex gap-2 justify-center" data-download-menu>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowDownloadMenu(m => !m)}
                    className="relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.1] text-sm font-medium text-white hover:bg-white/[0.12] transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                    <svg className={`w-3 h-3 transition-transform ${showDownloadMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>

                    <AnimatePresence>
                      {showDownloadMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass-strong rounded-xl p-2 min-w-[200px] z-[60]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="text-xs text-silver-500 px-3 py-1 uppercase tracking-wider">PNG</p>
                          {[160, 320, 640, 1024].map(size => (
                            <button
                              key={size}
                              onClick={(e) => { e.stopPropagation(); downloadPng(size); }}
                              className="w-full text-left px-3 py-2 text-sm text-silver-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                            >
                              {size} × {Math.round(size * ROWS / COLS)}px
                            </button>
                          ))}
                          <div className="border-t border-white/[0.06] my-1" />
                          <p className="text-xs text-silver-500 px-3 py-1 uppercase tracking-wider">SVG</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); downloadSvg(); }}
                            className="w-full text-left px-3 py-2 text-sm text-silver-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                          >
                            Vector (scalable)
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* RIGHT: CUSTOMIZATION */}
            <div className="flex-1 min-w-0">
              <motion.div
                className="glass rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Tab bar */}
                <div className="flex overflow-x-auto border-b border-white/[0.06] scrollbar-hide">
                  {TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-1.5 px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-white'
                          : 'text-silver-500 hover:text-silver-300'
                      }`}
                    >
                      <span className="text-base">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTabCrafter"
                          className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/40 rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'skin' && (
                        <SkinPanel config={config} update={update} />
                      )}
                      {activeTab === 'hair' && (
                        <HairPanel config={config} update={update} />
                      )}
                      {activeTab === 'eyes' && (
                        <EyesPanel config={config} update={update} />
                      )}
                      {activeTab === 'mouth' && (
                        <MouthPanel config={config} update={update} />
                      )}
                      {activeTab === 'outfit' && (
                        <OutfitPanel config={config} update={update} />
                      )}
                      {activeTab === 'extras' && (
                        <ExtrasPanel config={config} update={update} />
                      )}
                      {activeTab === 'bg' && (
                        <BgPanel config={config} update={update} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── PANEL COMPONENTS ────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wider text-silver-500 mb-3">
      {children}
    </h3>
  )
}

function ColorSwatch({ color, selected, onClick, label, size = 'md' }) {
  const sizeClass = size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`${sizeClass} rounded-full border-2 transition-all relative group ${
        selected
          ? 'border-white shadow-[0_0_12px_rgba(255,255,255,0.3)]'
          : 'border-white/[0.1] hover:border-white/[0.3]'
      }`}
      style={{ background: color }}
      title={label}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </motion.div>
      )}
      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-dark-600 text-[10px] text-silver-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </motion.button>
  )
}

function StyleButton({ selected, onClick, label, icon }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border transition-all min-w-[72px] ${
        selected
          ? 'bg-white/[0.1] border-white/[0.2] text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]'
          : 'bg-white/[0.02] border-white/[0.06] text-silver-400 hover:bg-white/[0.05] hover:text-silver-200'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[11px] font-medium">{label}</span>
    </motion.button>
  )
}

function MiniPreview({ grid, colorMap, size = 48 }) {
  const px = size / COLS
  return (
    <svg
      width={size}
      height={size * (ROWS / COLS)}
      viewBox={`0 0 ${COLS} ${ROWS}`}
      style={{ imageRendering: 'pixelated' }}
      className="rounded"
    >
      {grid.map((row, ry) =>
        row.map((cell, cx) => {
          if (cell === 0) return null
          const color = colorMap[cell]
          if (!color) return null
          return (
            <rect
              key={`${ry}-${cx}`}
              x={cx} y={ry}
              width={1} height={1}
              fill={color}
            />
          )
        })
      )}
    </svg>
  )
}

// ─── SKIN PANEL ──────────────────────────────────────────────────────

function SkinPanel({ config, update }) {
  return (
    <div>
      <SectionLabel>Skin Tone</SectionLabel>
      <div className="flex flex-wrap gap-3">
        {SKIN_TONES.map(tone => (
          <ColorSwatch
            key={tone.id}
            color={tone.main}
            selected={config.skin === tone.id}
            onClick={() => update('skin', tone.id)}
            label={tone.label}
            size="lg"
          />
        ))}
      </div>
    </div>
  )
}

// ─── HAIR PANEL ──────────────────────────────────────────────────────

function HairPanel({ config, update }) {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Style</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {HAIR_STYLES.map(style => (
            <StyleButton
              key={style.id}
              selected={config.hairStyle === style.id}
              onClick={() => update('hairStyle', style.id)}
              label={style.label}
              icon={style.icon}
            />
          ))}
        </div>
      </div>
      <div>
        <SectionLabel>Color</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {HAIR_COLORS.map(color => (
            <ColorSwatch
              key={color.id}
              color={color.main}
              selected={config.hairColor === color.id}
              onClick={() => update('hairColor', color.id)}
              label={color.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── EYES PANEL ──────────────────────────────────────────────────────

function EyesPanel({ config, update }) {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Style</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {EYE_STYLES.map(style => (
            <StyleButton
              key={style.id}
              selected={config.eyeStyle === style.id}
              onClick={() => update('eyeStyle', style.id)}
              label={style.label}
              icon={style.icon}
            />
          ))}
        </div>
      </div>
      <div>
        <SectionLabel>Color</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {EYE_COLORS.map(color => (
            <ColorSwatch
              key={color.id}
              color={color.main}
              selected={config.eyeColor === color.id}
              onClick={() => update('eyeColor', color.id)}
              label={color.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── MOUTH PANEL ─────────────────────────────────────────────────────

function MouthPanel({ config, update }) {
  return (
    <div>
      <SectionLabel>Expression</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {MOUTH_STYLES.map(style => (
          <StyleButton
            key={style.id}
            selected={config.mouthStyle === style.id}
            onClick={() => update('mouthStyle', style.id)}
            label={style.label}
            icon={style.icon}
          />
        ))}
      </div>
    </div>
  )
}

// ─── OUTFIT PANEL ────────────────────────────────────────────────────

function OutfitPanel({ config, update }) {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Clothing</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {CLOTHING_STYLES.map(style => (
            <StyleButton
              key={style.id}
              selected={config.clothingStyle === style.id}
              onClick={() => update('clothingStyle', style.id)}
              label={style.label}
              icon={style.icon}
            />
          ))}
        </div>
      </div>
      <div>
        <SectionLabel>Color</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {CLOTHING_COLORS.map(color => (
            <ColorSwatch
              key={color.id}
              color={color.main}
              selected={config.clothingColor === color.id}
              onClick={() => update('clothingColor', color.id)}
              label={color.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── EXTRAS PANEL ────────────────────────────────────────────────────

function ExtrasPanel({ config, update }) {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Accessory</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {ACCESSORIES.map(acc => (
            <StyleButton
              key={acc.id}
              selected={config.accessory === acc.id}
              onClick={() => update('accessory', acc.id)}
              label={acc.label}
              icon={acc.icon}
            />
          ))}
        </div>
      </div>
      <div>
        <SectionLabel>Accessory Color</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {ACCESSORY_COLORS.map(color => (
            <ColorSwatch
              key={color.id}
              color={color.main}
              selected={config.accessoryColor === color.id}
              onClick={() => update('accessoryColor', color.id)}
              label={color.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── BACKGROUND PANEL ────────────────────────────────────────────────

function BgPanel({ config, update }) {
  return (
    <div>
      <SectionLabel>Background</SectionLabel>
      <div className="flex flex-wrap gap-3">
        {BG_COLORS.map(bg => (
          <motion.button
            key={bg.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => update('bg', bg.id)}
            className={`w-10 h-10 rounded-lg border-2 transition-all relative ${
              config.bg === bg.id
                ? 'border-white shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                : 'border-white/[0.1] hover:border-white/[0.3]'
            }`}
            style={{
              background: bg.color || 'repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 50% / 10px 10px',
            }}
            title={bg.label}
          >
            {bg.id === 'none' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-[1.5px] bg-red-400/60 rotate-45 rounded-full" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
