import { motion } from 'framer-motion'

const GRID = [
  [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,5,1,1,1,1,1,1,1,1,1,1,5,0,0],
  [0,0,5,5,2,2,2,2,2,2,2,2,5,5,0,0],
  [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
  [0,0,0,2,6,3,2,2,2,3,6,2,2,0,0,0],
  [0,0,0,2,2,2,2,6,2,2,2,2,2,0,0,0],
  [0,0,0,0,2,2,6,2,6,2,2,0,0,0,0,0],
  [0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0],
  [0,0,0,0,0,2,7,7,7,2,0,0,0,0,0,0],
  [0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0],
  [0,0,4,4,4,4,4,4,4,4,4,4,4,4,0,0],
  [0,4,4,4,4,7,4,4,4,7,4,4,4,4,4,0],
  [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0],
  [0,4,4,6,4,4,4,4,4,4,4,6,4,4,4,0],
  [0,0,4,4,4,4,4,4,4,4,4,4,4,4,0,0],
  [0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0],
  [0,0,0,0,6,6,0,0,0,6,6,0,0,0,0,0],
  [0,0,0,0,6,6,0,0,0,6,6,0,0,0,0,0],
]

const COLORS = {
  0: 'transparent',
  1: '#1a1a2e',   
  2: '#c4a882',   
  3: '#a0ffee',   
  4: '#1c1c2e',   
  5: '#333355',  
  6: '#0f0f1a',   
  7: '#2a2a44',   
}

function buildAvatarSvgMarkup() {
  const cols = GRID[0].length
  const rows = GRID.length

  const rects = GRID.flatMap((row, ry) =>
    row
      .map((cell, cx) => {
        if (cell === 0) return ''
        const isEye = cell === 3
        const glow = isEye ? ' filter="url(#eyeGlow)"' : ''
        return `  <rect x="${cx}" y="${ry}" width="1" height="1" fill="${COLORS[cell]}"${glow} />`
      })
      .filter(Boolean)
  ).join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}" shape-rendering="crispEdges" style="image-rendering:pixelated">
  <defs>
    <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="0.6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <pattern id="scanlines" width="1" height="2" patternUnits="userSpaceOnUse">
      <rect width="1" height="1" fill="rgba(0,0,0,0)" />
      <rect y="1" width="1" height="1" fill="rgba(0,0,0,0.15)" />
    </pattern>
  </defs>
${rects}
  <rect width="${cols}" height="${rows}" fill="url(#scanlines)" opacity="0.5" />
</svg>`
}

export function downloadAvatarSvg(filename = 'ambi-avatar.svg') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const svg = buildAvatarSvgMarkup()
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)

  URL.revokeObjectURL(url)
}

export default function PixelAvatar({ size = 200, className = '', glowColor = 'rgba(160, 255, 238, 0.4)' }) {
  const cols = GRID[0].length
  const rows = GRID.length
  const pixelSize = size / cols
  const svgH = pixelSize * rows

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          background: glowColor,
          opacity: 0.15,
        }}
      />

      <svg
        width={size}
        height={svgH}
        viewBox={`0 0 ${cols} ${rows}`}
        className="relative z-10"
        style={{ imageRendering: 'pixelated' }}
      >
        <defs>
       
          <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
         
          <pattern id="scanlines" width="1" height="2" patternUnits="userSpaceOnUse">
            <rect width="1" height="1" fill="rgba(0,0,0,0)" />
            <rect y="1" width="1" height="1" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>

        {GRID.map((row, ry) =>
          row.map((cell, cx) => {
            if (cell === 0) return null
            const isEye = cell === 3
            return (
              <rect
                key={`${ry}-${cx}`}
                x={cx}
                y={ry}
                width={1}
                height={1}
                fill={COLORS[cell]}
                filter={isEye ? 'url(#eyeGlow)' : undefined}
                className={isEye ? 'animate-pulse' : ''}
              />
            )
          })
        )}

  
        <rect width={cols} height={rows} fill="url(#scanlines)" opacity="0.5" />
      </svg>

      
      <div
        className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23fff'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
          backgroundSize: `${pixelSize}px ${pixelSize}px`,
          imageRendering: 'pixelated',
        }}
      />
    </motion.div>
  )
}

// Smaller badge version for nav/footer
export function PixelAvatarMini({ size = 32 }) {
  const cols = GRID[0].length
  const rows = GRID.length
  return (
    <svg
      width={size}
      height={size * (rows / cols)}
      viewBox={`0 0 ${cols} ${rows}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {GRID.map((row, ry) =>
        row.map((cell, cx) => {
          if (cell === 0) return null
          return (
            <rect
              key={`${ry}-${cx}`}
              x={cx}
              y={ry}
              width={1}
              height={1}
              fill={COLORS[cell]}
            />
          )
        })
      )}
    </svg>
  )
}
