'use client'

import { useRef, useEffect, useState } from 'react'

interface Point {
  x: number
  y: number
}

interface CanvasProps {
  width?: number
  height?: number
  strokeColor?: string
  strokeWidth?: number
}

export function Canvas({
  width = 800,
  height = 600,
  strokeColor = '#000000',
  strokeWidth = 2
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPoint, setLastPoint] = useState<Point | null>(null)

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

    // Set drawing style
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [width, height, strokeColor, strokeWidth])

  const getCoordinates = (event: MouseEvent | TouchEvent): Point | null => {
    if (!canvasRef.current) return null

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    if ('touches' in event) {
      // Touch event
      const touch = event.touches[0]
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }
    } else {
      // Mouse event
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }
  }

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    const point = getCoordinates(event.nativeEvent)
    if (!point) return

    setIsDrawing(true)
    setLastPoint(point)
  }

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPoint) return

    const newPoint = getCoordinates(event.nativeEvent)
    if (!newPoint) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(newPoint.x, newPoint.y)
    ctx.stroke()

    setLastPoint(newPoint)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setLastPoint(null)
  }

  return (
    <canvas
      ref={canvasRef}
      className="border border-border bg-background"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        touchAction: 'none' // Prevent scrolling on touch devices
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
  )
}