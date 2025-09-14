'use client'
import React, { useEffect, useRef, useState } from 'react'

type TiltProps = {
  children: React.ReactNode
  maxTiltDeg?: number
  scale?: number
  className?: string
}

export function Tilt({ children, maxTiltDeg = 4, scale = 1.0, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const tiltX = (py - 0.5) * -2 * maxTiltDeg
      const tiltY = (px - 0.5) * 2 * maxTiltDeg
      el.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${scale})`
    }

    function onLeave() {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [maxTiltDeg, scale, reduced])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', transformStyle: 'preserve-3d', transition: reduced ? undefined : 'transform 150ms ease-out' }}>
      {children}
    </div>
  )
}


