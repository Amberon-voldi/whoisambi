import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 })
  const visible = useRef(false)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible.current) visible.current = true
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  // Only show on desktop
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
    </motion.div>
  )
}
