'use client'

import { useRef, useEffect } from 'react'

interface CanvasProps {
  width?: number
  height?: number
}

export function Canvas({ width = 800, height = 600 }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Set initial canvas style
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className="border border-border bg-background"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  )
}