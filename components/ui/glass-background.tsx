'use client'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'

function Blob({
  size,
  colorFrom,
  colorTo,
  delay = 0,
  opacity = 0.5,
}: {
  size: number
  colorFrom: string
  colorTo: string
  delay?: number
  opacity?: number
}) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 blur-3xl"
      style={{
        width: size,
        height: size,
        borderRadius: size,
        background:
          `radial-gradient(circle at 30% 30%, ${colorFrom}, ${colorTo})`,
        opacity: opacity,
        mixBlendMode: 'screen',
      }}
      initial={{ x: -200, y: -150, scale: 1 }}
      animate={{
        x: [
          -300,
          240,
          0,
          -180,
          260,
          0, // converge to center occasionally
        ],
        y: [
          -200,
          -120,
          0,
          220,
          -160,
          0, // converge to center occasionally
        ],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 28,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
        delay,
      }}
    />
  )
}

export function GlassBackground() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const lightPalette: [string, string][] = [
    ['#60a5fa', 'transparent'],
    ['#f472b6', 'transparent'],
    ['#34d399', 'transparent'],
    ['#fbbf24', 'transparent'],
  ]

  const darkPalette: [string, string][] = [
    ['#22d3ee', 'transparent'],
    ['#a78bfa', 'transparent'],
    ['#fb7185', 'transparent'],
    ['#f59e0b', 'transparent'],
  ]

  const palette = isDark ? darkPalette : lightPalette
  const sizes = [320, 340, 360, 380]
  const baseOpacity = isDark ? 0.35 : 0.3

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xl dark:bg-black/50" />
      {palette.map(([from, to], idx) => (
        <Blob
          key={idx}
          size={sizes[idx]}
          colorFrom={from}
          colorTo={to}
          delay={idx * 4}
          opacity={baseOpacity}
        />
      ))}
    </div>
  )
}


