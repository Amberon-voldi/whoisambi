const cardTones = {
  mint: 'radial-gradient(ellipse at center, rgba(160, 255, 238, 0.2) 0%, rgba(5, 5, 5, 0) 70%)',
  sky: 'radial-gradient(ellipse at center, rgba(125, 190, 255, 0.2) 0%, rgba(5, 5, 5, 0) 70%)',
  amber: 'radial-gradient(ellipse at center, rgba(255, 181, 125, 0.2) 0%, rgba(5, 5, 5, 0) 70%)',
  soft: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.14) 0%, rgba(5, 5, 5, 0) 70%)',
}

export default function SectionShuffleCard({ children, tone = 'soft' }) {
  const glow = cardTones[tone] || cardTones.soft

  return (
    <div className="shuffle-stack-shell relative h-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-[7%] top-[8%] h-16 sm:h-24 blur-3xl" style={{ background: glow }} />
        <div className="absolute inset-x-[8%] -bottom-4 h-8 blur-2xl bg-black/60" />
      </div>
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}
