'use client'

import { useState } from 'react'
import { Canvas } from './canvas'
import { Toolbar, type DrawingTool } from './toolbar'

export function Whiteboard() {
  const [selectedTool, setSelectedTool] = useState<DrawingTool>('select')

  return (
    <div className="flex flex-col gap-4">
      <Toolbar selectedTool={selectedTool} onToolChange={setSelectedTool} />
      <div className="rounded-lg border border-border bg-background p-4">
        <Canvas />
      </div>
    </div>
  )
}
